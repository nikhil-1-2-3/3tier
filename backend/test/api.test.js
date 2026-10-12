import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import prisma from '../src/utils/prisma.js';

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}/api`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await prisma.$disconnect();
});

describe('1. Health Check Endpoint', () => {
  test('GET /api/health returns 200 and CONNECTED database', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'UP');
    assert.equal(data.database, 'CONNECTED');
  });
});

describe('2. Services Endpoints', () => {
  test('GET /api/services returns list of active services', async () => {
    const res = await fetch(`${baseUrl}/services`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);
  });
});

describe('3. Authentication Flow', () => {
  const testEmail = `test_${Date.now()}@logicwind.com`;
  const testPassword = 'Password123!';

  test('POST /api/auth/signup registers a new user', async () => {
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Automation User',
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      }),
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.user.email, testEmail);
    assert.equal(data.user.passwordHash, undefined); // Never expose hash
  });

  test('POST /api/auth/signup rejects duplicate email registration', async () => {
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Duplicate User',
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      }),
    });

    assert.equal(res.status, 409);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test('POST /api/auth/login succeeds with valid credentials', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.token);
  });

  test('POST /api/auth/login rejects invalid password', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'WrongPassword999',
      }),
    });

    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
  });
});

describe('4. Booking Validation & Persistence', () => {
  let serviceId;

  before(async () => {
    const s = await prisma.service.findFirst();
    serviceId = s.id;
  });

  test('POST /api/bookings rejects past booking dates', async () => {
    const res = await fetch(`${baseUrl}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Past Date Tester',
        customerEmail: 'past@test.com',
        phone: '1234567890',
        serviceId: serviceId,
        requestedDate: '2020-01-01',
        timeSlot: '10:00 AM - 11:00 AM',
        description: 'Trying a past date.',
      }),
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.message, /cannot be in the past/i);
  });

  test('POST /api/bookings creates valid booking and generates reference', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const dateStr = tomorrow.toISOString().split('T')[0];

    const res = await fetch(`${baseUrl}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Valid Client',
        customerEmail: 'valid@client.com',
        phone: '+1 555-019-9988',
        serviceId: serviceId,
        requestedDate: dateStr,
        timeSlot: '10:00 AM - 11:00 AM',
        description: 'Architectural evaluation for cloud modernization.',
      }),
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.match(data.data.bookingReference, /^LW-BK-\d+$/);
    assert.equal(data.data.status, 'REQUESTED');
  });

  test('GET /api/bookings/mine denies access without authentication token', async () => {
    const res = await fetch(`${baseUrl}/bookings/mine`);
    assert.equal(res.status, 401);
  });
});

describe('5. Support Enquiry Form', () => {
  test('POST /api/support validates message length and persists to database', async () => {
    const res = await fetch(`${baseUrl}/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Support User',
        email: 'support@example.com',
        category: 'Technical Scoping',
        message: 'This is a detailed enquiry message exceeding the minimum requirement.',
      }),
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data.id);
  });
});

describe('6. Administrative Operations & Governance', () => {
  let adminToken;

  test('GET /api/admin/stats rejects unauthenticated access with 401', async () => {
    const res = await fetch(`${baseUrl}/admin/stats`);
    assert.equal(res.status, 401);
  });

  test('Admin login succeeds with role ADMIN and token', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@logicwind.com',
        password: 'AdminPass123!',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.user.role, 'ADMIN');
    adminToken = data.token;
    assert.ok(adminToken);
  });

  test('GET /api/admin/stats returns metrics for authenticated admin', async () => {
    const res = await fetch(`${baseUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data.totalBookings >= 1);
    assert.ok(data.data.statusCounts);
  });

  test('PATCH /api/admin/bookings/:id/status updates booking to CONFIRMED', async () => {
    const booking = await prisma.booking.findFirst();
    assert.ok(booking);

    const res = await fetch(`${baseUrl}/admin/bookings/${booking.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ status: 'CONFIRMED' }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.status, 'CONFIRMED');
  });
});
