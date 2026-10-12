import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial Logicwind data...');

  // 1. Seed Services
  const services = [
    {
      name: 'Custom Web & Cloud App Development',
      description: 'End-to-end modern web applications built using scalable microservices, responsive frontends, and robust cloud-native architectures.',
      category: 'Engineering',
      icon: 'Code2',
      active: true,
    },
    {
      name: 'Mobile Application Development',
      description: 'High-performance cross-platform mobile apps for iOS and Android delivering fluid user experiences and offline capabilities.',
      category: 'Mobile',
      icon: 'Smartphone',
      active: true,
    },
    {
      name: 'UI/UX Design & Product Strategy',
      description: 'Human-centered UI/UX design, interactive prototypes, design systems, and product roadmaps tailored to maximize user engagement.',
      category: 'Design',
      icon: 'Palette',
      active: true,
    },
    {
      name: 'Cloud Infrastructure & DevOps',
      description: 'Automated CI/CD pipelines, container orchestration (Docker/K8s), infrastructure-as-code, and 24/7 cloud reliability engineering.',
      category: 'DevOps',
      icon: 'Cloud',
      active: true,
    },
    {
      name: 'AI & Intelligent Automation',
      description: 'Custom AI model integrations, generative workflow automation, data pipelines, and intelligent search capabilities for business processes.',
      category: 'AI & Data',
      icon: 'Cpu',
      active: true,
    },
    {
      name: 'QA & Security Performance Auditing',
      description: 'Comprehensive automated test suites, accessibility compliance, performance stress testing, and vulnerability auditing.',
      category: 'Quality',
      icon: 'ShieldCheck',
      active: true,
    },
  ];

  for (const s of services) {
    const existing = await prisma.service.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.service.create({ data: s });
      console.log(`Created service: ${s.name}`);
    }
  }

  // 2. Seed a Demo Test User for verification
  const demoEmail = 'demo@logicwind.com';
  const existingUser = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash('DemoPass123!', 10);
    const user = await prisma.user.create({
      data: {
        fullName: 'Jane Doe',
        email: demoEmail,
        passwordHash,
      },
    });
    console.log(`Created demo user: ${user.email} (Password: DemoPass123!)`);

    // Sample booking for the demo user
    const firstService = await prisma.service.findFirst();
    if (firstService) {
      await prisma.booking.create({
        data: {
          bookingReference: 'LW-BK-10001',
          userId: user.id,
          customerName: user.fullName,
          customerEmail: user.email,
          phone: '+1 (555) 019-2834',
          serviceId: firstService.id,
          requestedDate: '2026-10-25',
          timeSlot: '10:00 AM - 11:00 AM',
          description: 'Consultation for enterprise web application modernization and cloud migration.',
          notes: 'Prefer initial discussion over video call.',
          status: 'CONFIRMED',
        },
      });
      console.log('Created sample booking: LW-BK-10001');
    }
  }

  // 3. Seed an Admin User
  const adminEmail = 'admin@logicwind.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('AdminPass123!', 10);
    const adminUser = await prisma.user.create({
      data: {
        fullName: 'Admin Director',
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
      },
    });
    console.log(`Created admin user: ${adminUser.email} (Password: AdminPass123!)`);
  } else {
    // Ensure role is ADMIN
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'ADMIN' },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
