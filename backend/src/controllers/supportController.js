import prisma from '../utils/prisma.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitSupportEnquiry(req, res) {
  try {
    const { name, email, category, message } = req.body;

    if (!name || !email || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (Name, Email, Category/Subject, and Message) are required.',
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message should be at least 10 characters long.',
      });
    }

    const enquiry = await prisma.supportEnquiry.create({
      data: {
        name: name.trim(),
        email: trimmedEmail,
        category: category.trim(),
        message: message.trim(),
        status: 'PENDING',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your support enquiry has been received. Our team will review it and get in touch with you shortly.',
      data: {
        id: enquiry.id,
        category: enquiry.category,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting support enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit support enquiry. Please try again.',
    });
  }
}
