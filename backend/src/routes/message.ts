import express from 'express';
import { protect } from '../middleware/auth.js';
import Message from '../models/Message.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// @route   GET /api/messages/conversations
// @desc    Get user's conversations
// @access  Private
router.get('/conversations', protect, async (req, res) => {
  try {
    // Get all unique conversation IDs for the user
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id },
        { receiverId: req.user.id }
      ]
    }).sort({ createdAt: -1 });

    // Group messages by conversation ID
    const conversations: any = {};
    
    for (const message of messages) {
      if (!conversations[message.conversationId]) {
        conversations[message.conversationId] = {
          conversationId: message.conversationId,
          lastMessage: message,
          unreadCount: 0
        };
      }
      
      // Count unread messages
      if (message.receiverId.toString() === req.user.id.toString() && !message.isRead) {
        conversations[message.conversationId].unreadCount += 1;
      }
    }

    // Convert to array and sort by last message date
    const conversationList = Object.values(conversations).sort((a: any, b: any) => 
      new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );

    res.status(200).json({
      success: true,
      message: 'Conversations retrieved successfully',
      data: {
        conversations: conversationList
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   GET /api/messages/:conversationId
// @desc    Get messages in a conversation
// @access  Private
router.get('/:conversationId', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ createdAt: 1 }).populate('senderId receiverId');

    // Mark messages as read
    await Message.updateMany(
      {
        conversationId: req.params.conversationId,
        receiverId: req.user.id,
        isRead: false
      },
      {
        isRead: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Messages retrieved successfully',
      data: {
        messages
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   POST /api/messages
// @desc    Send a message
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { receiverId, content, type, attachments } = req.body;

    // Generate conversation ID if it doesn't exist
    const conversationId = uuidv4();

    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      conversationId,
      content,
      type: type || 'text',
      attachments: attachments || []
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        message
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

export default router;
