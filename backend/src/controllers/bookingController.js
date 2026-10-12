import prisma from '../utils/prisma.js';
import { generateBookingReference } from '../utils/referenceGenerator.js';

const ALLOWED_TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createBooking(req, res) {
  try {
    const {
      customerName,
      customerEmail,
      phone,
      serviceId,
      requestedDate,
      timeSlot,
      description,
      notes,
    } = req.body;

    // 1. Validate required fields
    if (!customerName || !customerEmail || !phone || !serviceId || !requestedDate || !timeSlot || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Name, Email, Phone, Service, Date, Time Slot, and Description).',
      });
    }

    const trimmedEmail = customerEmail.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 2. Validate date is not in the past
    const today = new Date().toISOString().split('T')[0];
    if (requestedDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Booking date cannot be in the past.',
      });
    }

    // 3. Validate time slot
    if (!ALLOWED_TIME_SLOTS.includes(timeSlot)) {
      return res.status(400).json({
        success: false,
        message: `Invalid time slot selected. Available slots: ${ALLOWED_TIME_SLOTS.join(', ')}`,
      });
    }

    // 4. Validate service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Selected service does not exist or is inactive.',
      });
    }

    // 5. Generate unique reference
    let bookingReference = generateBookingReference();
    // Ensure collision avoidance
    let attempts = 0;
    while (attempts < 5) {
      const existing = await prisma.booking.findUnique({ where: { bookingReference } });
      if (!existing) break;
      bookingReference = generateBookingReference();
      attempts++;
    }

    // 6. Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        userId: req.user ? req.user.id : null,
        customerName: customerName.trim(),
        customerEmail: trimmedEmail,
        phone: phone.trim(),
        serviceId: service.id,
        requestedDate,
        timeSlot,
        description: description.trim(),
        notes: notes ? notes.trim() : null,
        status: 'REQUESTED',
      },
      include: {
        service: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully! A confirmation reference has been generated.',
      data: booking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process booking request.',
    });
  }
}

export async function getMyBookings(req, res) {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    // Retrieve bookings associated with this userId or user's email
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { userId: userId },
          { customerEmail: userEmail },
        ],
      },
      include: {
        service: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking history.',
    });
  }
}

export async function getBookingById(req, res) {
  try {
    const { id } = req.params;

    // Search by ID or by unique bookingReference
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: id },
          { bookingReference: id },
        ],
      },
      include: {
        service: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking record not found.',
      });
    }

    // If request has authenticated user, ensure privacy ownership
    if (req.user && booking.userId && booking.userId !== req.user.id && booking.customerEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. You do not have permission to view this booking.',
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking information.',
    });
  }
}

export async function cancelBooking(req, res) {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking record not found.',
      });
    }

    // Verify ownership
    if (booking.userId !== req.user.id && booking.customerEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to cancel this booking.',
      });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'This booking has already been cancelled.',
      });
    }

    if (booking.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Completed bookings cannot be cancelled.',
      });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { service: true },
    });

    return res.status(200).json({
      success: true,
      message: 'Booking request cancelled successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel booking request.',
    });
  }
}
