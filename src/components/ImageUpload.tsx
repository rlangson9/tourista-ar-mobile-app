import { useState, useRef } from 'react';
import { Upload, X, Check, Scissors, Maximize2, RotateCw, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AspectRatio {
  name: string;
  ratio: number;
  width: number;
  height: number;
}

const aspectRatios: AspectRatio[] = [
  { name: '4:5 (Product)', ratio: 4/5, width: 4, height: 5 },
  { name: '1:1 (Square)', ratio: 1, width: 1, height: 1 },
  { name: '16:9 (Wide)', ratio: 16/9, width: 16, height: 9 },
  { name: '3:2 (Photo)', ratio: 3/2, width: 3, height: 2 },
];

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  aspectRatio?: string; // "4:5" etc.
  maxImages?: number;
  label?: string;
  hint?: string;
  required?: boolean;
}

export function ImageUpload({
  images,
  onImagesChange,
  aspectRatio = "4:5",
  maxImages = 5,
  label = "Upload Images",
  hint = "PNG, JPG up to 10MB",
  required = false,
}: ImageUploadProps) {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(
    aspectRatios.find(r => r.name === aspectRatio) || aspectRatios[0]
  );
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;
        if (images.length < maxImages) {
          setImageToCrop(imgUrl);
          setCropPosition({ x: 0, y: 0 });
          setZoomLevel(1);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const applyCrop = () => {
    if (!imageToCrop) return;
    
    // Create a canvas to crop the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate crop dimensions
      const maxDim = Math.max(img.width, img.height);
      const cropWidth = Math.min(img.width, img.height * selectedRatio.ratio);
      const cropHeight = Math.min(img.height, img.width / selectedRatio.ratio);
      
      // Apply zoom and position
      const zoomedWidth = cropWidth * zoomLevel;
      const zoomedHeight = cropHeight * zoomLevel;
      
      const offsetX = (img.width - zoomedWidth) / 2 + cropPosition.x;
      const offsetY = (img.height - zoomedHeight) / 2 + cropPosition.y;
      
      canvas.width = 400;
      canvas.height = 400 / selectedRatio.ratio;
      
      if (ctx) {
        ctx.drawImage(
          img,
          Math.max(0, offsetX),
          Math.max(0, offsetY),
          zoomedWidth,
          zoomedHeight,
          0, 0,
          canvas.width,
          canvas.height
        );
        
        onImagesChange([...images, canvas.toDataURL('image/jpeg', 0.9)]);
        setImageToCrop(null);
      }
    };
    img.src = imageToCrop;
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropPosition.x, y: e.clientY - cropPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCropPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - cropPosition.x, y: touch.clientY - cropPosition.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setCropPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* Aspect Ratio Guidance */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Recommended Aspect Ratio</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.name}
                onClick={() => setSelectedRatio(ratio)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedRatio.name === ratio.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
              >
                {ratio.name}
              </button>
            ))}
          </div>

          <p className="text-sm text-blue-700 mt-3">
            {selectedRatio.name === "4:5 (Product)" && "Perfect for product images on product cards and listings"}
            {selectedRatio.name === "1:1 (Square)" && "Great for thumbnails and profile pictures"}
            {selectedRatio.name === "16:9 (Wide)" && "Ideal for banner ads and wide-format photos"}
            {selectedRatio.name === "3:2 (Photo)" && "Standard photo aspect ratio for natural-looking images"}
          </p>
        </div>

        {/* Upload Area */}
        {images.length < maxImages && (
          <label
            className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-600 transition cursor-pointer group"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="group-hover:scale-105 transition-transform">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-600" />
              <p className="text-sm text-gray-600 group-hover:text-blue-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {hint}
              </p>
            </div>
          </label>
        )}

        {/* Uploaded Images Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative rounded-xl overflow-hidden bg-gray-100"
                style={{ aspectRatio: `${selectedRatio.width}/${selectedRatio.height}` }}
              >
                <img src={img} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-sm"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="absolute bottom-1 left-1 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                  {selectedRatio.name}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Crop Modal */}
      <AnimatePresence>
        {imageToCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-black/50 backdrop-blur-sm text-white p-4">
              <div className="max-w-md mx-auto flex items-center justify-between">
                <button
                  onClick={() => setImageToCrop(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold">Adjust & Crop</h2>
                <button
                  onClick={applyCrop}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Done
                </button>
              </div>
            </div>

            {/* Crop Area */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              <div
                ref={cropContainerRef}
                className="relative"
                style={{
                  width: '100%',
                  maxWidth: 300,
                  aspectRatio: `${selectedRatio.width}/${selectedRatio.height}`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 overflow-hidden cursor-move"
                >
                  <img
                    src={imageToCrop}
                    alt="Crop preview"
                    className="w-full h-full object-contain"
                    style={{
                      transform: `translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${zoomLevel})`,
                    }}
                  />
                </div>

                {/* Crop Frame Overlay */}
                <div className="absolute inset-0 border-4 border-white rounded-lg shadow-2xl pointer-events-none">
                  <div className="absolute -inset-20 bg-black/60 pointer-events-none" />
                </div>

                {/* Grid Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-black/50 backdrop-blur-sm text-white p-4">
              <div className="max-w-md mx-auto space-y-4">
                {/* Zoom Control */}
                <div className="flex items-center gap-4">
                  <Maximize2 className="w-5 h-5" />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={zoomLevel}
                      onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm w-12 text-right">{zoomLevel.toFixed(1)}x</span>
                </div>

                {/* Aspect Ratio Quick Change */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.name}
                      onClick={() => setSelectedRatio(ratio)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                        selectedRatio.name === ratio.name
                          ? 'bg-blue-600'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {ratio.name}
                    </button>
                  ))}
                </div>

                {/* Instructions */}
                <p className="text-sm text-gray-300 text-center">
                  <Move className="w-4 h-4 inline mr-1" /> Drag to reposition, use slider to zoom
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageUpload;
