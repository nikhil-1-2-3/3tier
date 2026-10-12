import prisma from '../utils/prisma.js';

export async function getAllServices(req, res) {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve service listings.',
    });
  }
}

export async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve service details.',
    });
  }
}
