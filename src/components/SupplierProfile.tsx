import { ArrowLeft, Star, Shield, Truck, Clock, Package, Building2, MapPin, Phone, Mail, Globe, Calendar, Users, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Screen } from '../App';
import { mockProducts } from '../data/mockData';
import { BottomNav } from './BottomNav';

interface SupplierProfileProps {
  onNavigate: (screen: Screen) => void;
  supplierName: string;
}

export function SupplierProfile({ onNavigate, supplierName }: SupplierProfileProps) {
  // Get supplier info from mock data
  const supplierInfo = mockProducts.find(p => p.supplier === supplierName);
  const supplierProducts = mockProducts.filter(p => p.supplier === supplierName);

  // Mock company details (in a real app, this would come from an API)
  const companyDetails = {
    establishedYear: '2015',
    companySize: '50-100 employees',
    industry: 'Electronics Manufacturing',
    address: '123 Industrial Park, Shenzhen, Guangdong, China',
    phone: '+86 755 1234 5678',
    email: 'info@shenzhenledsolutions.com',
    website: 'www.shenzhenledsolutions.com',
    description: 'Shenzhen LED Solutions is a leading manufacturer of high-quality LED lighting products with over 10 years of industry experience. We specialize in LED street lighting, commercial lighting, and smart lighting solutions. Our products are exported to over 50 countries worldwide, and we are committed to providing energy-efficient and environmentally friendly lighting solutions to our customers.',
    certifications: ['ISO 9001', 'CE', 'RoHS', 'FCC', 'LM-80'],
    productionCapacity: '50,000 units/month',
    qualityControl: '100% inspection before shipment',
    paymentTerms: 'T/T, L/C, PayPal',
    shippingMethods: 'Sea freight, Air freight, Express courier'
  };

  if (!supplierInfo) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Supplier not found</h2>
        <button
          onClick={() => onNavigate('home')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold flex-1">Company Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Supplier Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {supplierName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-xl mb-2">{supplierName}</h2>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{supplierInfo.supplierRating}</span>
                <span className="text-gray-500 text-sm">({supplierProducts.length} products)</span>
                {supplierInfo.verified && (
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-xs text-green-700">
                    <Shield className="w-3 h-3" />
                    Verified
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span>Shipping: {supplierInfo.shippingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Response: 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span>MOQ: {supplierInfo.moq}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{supplierInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-4"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            About {supplierName}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {companyDetails.description}
          </p>
        </motion.div>

        {/* Company Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-4"
        >
          <h3 className="font-semibold text-lg mb-4">Company Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Established Year</p>
                <p className="font-medium">{companyDetails.establishedYear}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Company Size</p>
                <p className="font-medium">{companyDetails.companySize}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium">{companyDetails.industry}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{companyDetails.address}</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-4"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Certifications & Capabilities
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {companyDetails.certifications.map((cert, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Production Capacity</p>
                <p className="font-medium">{companyDetails.productionCapacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Quality Control</p>
                <p className="font-medium">{companyDetails.qualityControl}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Terms</p>
                <p className="font-medium">{companyDetails.paymentTerms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Shipping Methods</p>
                <p className="font-medium">{companyDetails.shippingMethods}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-4"
        >
          <h3 className="font-semibold text-lg mb-4">Featured Products</h3>
          {supplierProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-3 border-b border-gray-100 last:border-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.supplierRating}</span>
                </div>
                <p className="font-bold text-blue-600 text-sm">{product.priceRange.split(' - ')[0]}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAQs */}
        {supplierProducts.some(product => product.faqs && product.faqs.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm mb-4"
          >
            <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {supplierProducts
                .filter(product => product.faqs && product.faqs.length > 0)
                .flatMap(product => product.faqs!)
                .slice(0, 5)
                .map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}


      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
}
