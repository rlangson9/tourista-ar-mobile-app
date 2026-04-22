import { useState } from 'react';
import { Brain, Send, FileText, Copy, Check, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RFQ {
  id: string;
  productDescription: string;
  category: string;
  quantity: string;
  budgetMin: string;
  budgetMax: string;
  destination: string;
  deliveryTimeline: string;
  status: string;
  classification?: string;
  priority?: string;
}

interface AIResponseGeneratorProps {
  rfq: RFQ;
  onResponseGenerated: (response: string) => void;
}

export function AIResponseGenerator({ rfq, onResponseGenerated }: AIResponseGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateResponse = () => {
    setIsGenerating(true);
    setResponse('');

    // Simulate AI processing time
    setTimeout(() => {
      const generatedResponse = generateAIResponse(rfq);
      setResponse(generatedResponse);
      onResponseGenerated(generatedResponse);
      setIsGenerating(false);
    }, 2000);
  };

  const generateAIResponse = (rfq: RFQ): string => {
    // Determine response tone based on priority
    const tone = rfq.priority === 'high' ? 'urgent and professional' : 'professional and helpful';
    
    // Determine delivery timeline description
    let timelineDescription = '';
    switch (rfq.deliveryTimeline) {
      case 'urgent':
        timelineDescription = 'within 30 days';
        break;
      case 'standard':
        timelineDescription = 'within 30-60 days';
        break;
      case 'flexible':
        timelineDescription = 'within 60+ days';
        break;
      default:
        timelineDescription = 'within a reasonable timeframe';
    }

    // Generate response based on RFQ details
    return `Dear Valued Customer,

Thank you for your sourcing request (${rfq.id}) for ${rfq.productDescription}. We appreciate your interest in our services.

Based on your requirements, we can offer:

• Product: ${rfq.productDescription}
• Category: ${rfq.category}
• Quantity: ${rfq.quantity}
• Budget Range: $${rfq.budgetMin} - $${rfq.budgetMax}
• Destination: ${rfq.destination}
• Delivery Timeline: ${timelineDescription}

Our team of experts has reviewed your request and we are confident we can meet your requirements. We have the necessary expertise and resources to deliver high-quality products that meet your specifications.

Would you like us to provide a detailed quotation with pricing breakdown and delivery options? Please let us know if you have any additional requirements or questions.

We look forward to the opportunity to serve you.

Best regards,
[Your Company Name]
[Contact Information]`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          AI Response Generator
        </h2>
        <button
          onClick={generateResponse}
          disabled={isGenerating}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Clock className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Generate Response
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            RFQ Summary
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Product</p>
              <p className="font-medium">{rfq.productDescription}</p>
            </div>
            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-medium">{rfq.category}</p>
            </div>
            <div>
              <p className="text-gray-500">Quantity</p>
              <p className="font-medium">{rfq.quantity}</p>
            </div>
            <div>
              <p className="text-gray-500">Budget</p>
              <p className="font-medium">${rfq.budgetMin} - ${rfq.budgetMax}</p>
            </div>
            <div>
              <p className="text-gray-500">Destination</p>
              <p className="font-medium">{rfq.destination}</p>
            </div>
            <div>
              <p className="text-gray-500">Timeline</p>
              <p className="font-medium">{rfq.deliveryTimeline}</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-200 rounded-xl"
            >
              <div className="bg-gray-50 border-b border-gray-200 rounded-t-xl p-4 flex items-center justify-between">
                <h3 className="font-semibold">Generated Response</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1 text-sm"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 bg-white rounded-b-xl">
                <pre className="whitespace-pre-wrap text-sm font-sans">{response}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && (
          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600 animate-spin" />
            <div>
              <p className="text-sm font-medium text-blue-900">AI is analyzing the RFQ and generating a response...</p>
              <p className="text-xs text-blue-700 mt-1">This should take just a few seconds</p>
            </div>
          </div>
        )}

        <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">Note</p>
            <p className="text-xs text-amber-700 mt-1">
              The generated response is a starting point. Please review and customize it to ensure it accurately reflects your company's capabilities and offerings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
