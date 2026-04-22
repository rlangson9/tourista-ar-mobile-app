import mongoose from 'mongoose';

interface MessageDocument extends mongoose.Document {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  conversationId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  attachments: string[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<MessageDocument>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  conversationId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide message content'],
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text',
  },
  attachments: {
    type: [String],
    default: [],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;
