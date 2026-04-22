import React, { useState, useEffect } from 'react';
import { TradeProduct, mockProducts } from '../data/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Star, Search, ChevronRight, ShoppingCart, Send, Filter, Zap, BarChart3, Package } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock past sourcing requests for AI recommendations
const mockPastRequests = [
  { id: 'r1', category: 'machinery', product: 'CNC Milling Machine', date: '2026-02-15' },
  { id: 'r2', category: 'electronics', product: 'LED Lighting', date: '2026-02-10' },
  { id: 'r3', category: 'technology', product: 'Solar Panels', date: '2026-02-05' },
];

// Mock AI recommendation engine
const getAIRecommendations = (pastRequests: any[]): TradeProduct[] => {
  // Simple algorithm: recommend products from categories in past requests
  const categories = pastRequests.map(req => req.category);
  return mockProducts.filter(product => categories.includes(product.category)).slice(0, 6);
};

const ProductDiscovery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState<TradeProduct[]>([]);
  const [comparisonProducts, setComparisonProducts] = useState<TradeProduct[]>([]);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [sampleRequest, setSampleRequest] = useState({
    productId: '',
    quantity: '1',
    message: ''
  });
  const [sampleRequestSent, setSampleRequestSent] = useState(false);

  useEffect(() => {
    // Get AI recommendations based on past requests
    const recommendations = getAIRecommendations(mockPastRequests);
    setRecommendedProducts(recommendations);
  }, []);

  const handleAddToComparison = (product: TradeProduct) => {
    if (comparisonProducts.length < 3) {
      setComparisonProducts(prev => [...prev, product]);
    }
  };

  const handleRemoveFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSampleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleRequestSent(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSampleRequestSent(false);
      setSampleRequest({ productId: '', quantity: '1', message: '' });
    }, 3000);
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Product Discovery
        </motion.h1>
        <p className="text-gray-600 mb-6">
          Discover products based on your past sourcing requests and compare options
        </p>
        
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Zap size={16} />
            AI Recommendations
          </TabsTrigger>
          <TabsTrigger value="all-products" className="flex items-center gap-2">
            <BarChart3 size={16} />
            All Products
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <BarChart3 size={16} />
            Compare Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Based on your past sourcing requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-500">AI Recommended</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(product.supplierRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm text-gray-600">({product.supplierRating})</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                      <p className="font-semibold">{product.priceRange}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleAddToComparison(product)}
                      >
                        Compare
                      </Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all-products" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.verified && (
                      <Badge className="absolute top-2 left-2 bg-green-500">Verified</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(product.supplierRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-sm text-gray-600">({product.supplierRating})</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                    <p className="font-semibold">{product.priceRange}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleAddToComparison(product)}
                    >
                      Compare
                    </Button>
                    <Button size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Compare Products</h3>
            {comparisonProducts.length === 0 ? (
              <p className="text-gray-500">Add products to comparison from the other tabs</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      {comparisonProducts.map((product) => (
                        <TableHead key={product.id} className="relative">
                          <div className="flex items-center justify-between">
                            <span className="max-w-xs truncate">{product.name}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => handleRemoveFromComparison(product.id)}
                            >
                              ×
                            </Button>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Supplier</TableCell>
                      {comparisonProducts.map((product) => (
                        <TableCell key={product.id}>{product.supplier}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Price Range</TableCell>
                      {comparisonProducts.map((product) => (
                        <TableCell key={product.id}>{product.priceRange}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">MOQ</TableCell>
                      {comparisonProducts.map((product) => (
                        <TableCell key={product.id}>{product.moq}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shipping Time</TableCell>
                      {comparisonProducts.map((product) => (
                        <TableCell key={product.id}>{product.shippingTime}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Location</TableCell>
                      {comparisonProducts.map((product) => (
                        <TableCell key={product.id}>{product.location}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Certifications</TableCell>
                      {comparisonProducts.map((product) => (
                        <TableCell key={product.id}>
                          <div className="flex flex-wrap gap-1">
                            {product.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">{cert}</Badge>
                            ))}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Request a Sample</h3>
            <div className="bg-white p-6 rounded-lg border">
              {sampleRequestSent ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Sample Request Sent!</h4>
                  <p className="text-gray-600">We'll contact you shortly with more information.</p>
                </div>
              ) : (
                <form onSubmit={handleSampleRequestSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product</label>
                      <select
                        value={sampleRequest.productId}
                        onChange={(e) => setSampleRequest(prev => ({ ...prev, productId: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select a product</option>
                        {mockProducts.map(product => (
                          <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantity</label>
                      <Input
                        type="number"
                        value={sampleRequest.quantity}
                        onChange={(e) => setSampleRequest(prev => ({ ...prev, quantity: e.target.value }))}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      value={sampleRequest.message}
                      onChange={(e) => setSampleRequest(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Add any additional information..."
                      className="w-full p-2 border rounded-md h-24"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Package className="mr-2" size={16} />
                    Request Sample
                  </Button>
                </form>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDiscovery;