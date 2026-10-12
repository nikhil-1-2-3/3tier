import prisma from '../utils/prisma.js';

export async function getAdminStats(req, res) {
  try {
    const [totalBookings, totalUsers, totalServices, totalEnquiries] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count(),
      prisma.service.count(),
      prisma.supportEnquiry.count(),
    ]);

    // Breakdown of bookings by status
    const bookingsByStatus = await prisma.booking.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    const statusCounts = {
      REQUESTED: 0,
      CONFIRMED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };

    bookingsByStatus.forEach((item) => {
      statusCounts[item.status] = item._count.id;
    });

    // Recent 5 bookings
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { service: true },
    });

    // Recent 5 enquiries
    const recentEnquiries = await prisma.supportEnquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: {
        totalBookings,
        totalUsers,
        totalServices,
        totalEnquiries,
        statusCounts,
        recentBookings,
        recentEnquiries,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve administrative analytics.',
    });
  }
}

export async function getAllBookings(req, res) {
  try {
    const { status, search } = req.query;

    const where = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
        { bookingReference: { contains: search, mode: 'insensitive' } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        service: true,
        user: {
          select: { id: true, fullName: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings catalog.',
    });
  }
}

export async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { service: true },
    });

    return res.status(200).json({
      success: true,
      message: `Booking ${updated.bookingReference} status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update booking status.',
    });
  }
}

export async function getAllEnquiries(req, res) {
  try {
    const { status } = req.query;
    const where = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const enquiries = await prisma.supportEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching admin enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve support enquiries.',
    });
  }
}

export async function updateEnquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'RESOLVED', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await prisma.supportEnquiry.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status.',
    });
  }
}

export async function createService(req, res) {
  try {
    const { name, description, category, icon, active } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Service name and description are required.',
      });
    }

    const service = await prisma.service.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        category: category ? category.trim() : 'Engineering',
        icon: icon || 'Code2',
        active: active !== undefined ? active : true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'New service created successfully.',
      data: service,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create service.',
    });
  }
}

export async function updateService(req, res) {
  try {
    const { id } = req.params;
    const { name, description, category, icon, active } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(description && { description: description.trim() }),
        ...(category && { category: category.trim() }),
        ...(icon && { icon }),
        ...(active !== undefined && { active }),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update service.',
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user accounts.',
    });
  }
}
