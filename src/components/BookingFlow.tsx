import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, Plus, Minus, Check, CreditCard, Shield, AlertCircle, X, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { mockTours } from '../data/mockData';

interface BookingFlowProps {
  tourId: string | null;
  onNavigate: (screen: Screen) => void;
}

export function BookingFlow({ tourId, onNavigate }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [addOns, setAddOns] = useState({
    airportPickup: false,
    translator: false,
    insurance: false,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentOption, setPaymentOption] = useState<'full' | 'partial'>('full');
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineBooking, setIsOfflineBooking] = useState(false);

  const tour = mockTours.find((t) => t.id === tourId);

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Sync offline bookings when online
    const syncOfflineBookings = () => {
      if (isOnline) {
        const offlineBookings = localStorage.getItem('offline_bookings');
        if (offlineBookings) {
          // In a real app, this would send the bookings to the server
          console.log('Syncing offline bookings:', JSON.parse(offlineBookings));
          // Clear offline bookings after sync
          localStorage.removeItem('offline_bookings');
        }
      }
    };

    // Check for offline bookings on load if online
    if (isOnline) {
      syncOfflineBookings();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  if (!tour) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Tour not found</p>
      </div>
    );
  }

  const addOnPrices = {
    airportPickup: 50,
    translator: 120,
    insurance: 80,
  };

  const subtotal = tour.price * travelers;
  const addOnsTotal =
    (addOns.airportPickup ? addOnPrices.airportPickup : 0) +
    (addOns.translator ? addOnPrices.translator : 0) +
    (addOns.insurance ? addOnPrices.insurance : 0);
  const serviceFee = subtotal * 0.05;
  const fullTotal = subtotal + addOnsTotal + serviceFee;
  const total = paymentOption === 'partial' ? fullTotal * 0.5 : fullTotal;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete booking
      if (!isOnline) {
        // Store booking offline
        const offlineBooking = {
          tourId: tour.id,
          tourTitle: tour.title,
          date: selectedDate,
          travelers,
          addOns,
          paymentOption,
          isWaitlist,
          timestamp: new Date().toISOString(),
          status: 'pending_sync'
        };
        
        // Get existing offline bookings
        const existingBookings = localStorage.getItem('offline_bookings') || '[]';
        const bookings = JSON.parse(existingBookings);
        bookings.push(offlineBooking);
        
        // Save back to localStorage
        localStorage.setItem('offline_bookings', JSON.stringify(bookings));
        
        setIsOfflineBooking(true);
      }
      setStep(5);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => step === 1 ? onNavigate('tour-details') : setStep(step - 1)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">
                {step === 5 ? 'Booking Confirmed!' : 'Complete Booking'}
              </h1>
              <p className="text-sm text-gray-500">{tour.title}</p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isOnline ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              <Wifi className="w-3 h-3" />
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
          
          {/* Progress Steps */}
          {step < 5 && (
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 rounded-full transition ${
                    s <= step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{tour.soldOut ? 'Join Waitlist' : 'Select Date'}</h2>
                    <p className="text-sm text-gray-500">
                      {tour.soldOut ? 'Choose a date to join the waitlist' : 'Choose your departure date'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {tour.soldOut ? (
                    // All dates are waitlist only
                    ['2026-03-15', '2026-03-22', '2026-04-05', '2026-04-12'].map((date) => (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setIsWaitlist(true);
                        }}
                        className={`w-full p-4 rounded-xl border-2 transition ${
                          selectedDate === date && isWaitlist
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold">
                              {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="text-sm text-amber-600">Join Waitlist</p>
                          </div>
                          {selectedDate === date && isWaitlist && (
                            <Check className="w-6 h-6 text-amber-600" />
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    // Mixed available and fully booked dates
                    <>
                      {/* Available dates */}
                      {['2026-03-15', '2026-03-22', '2026-04-12'].map((date) => (
                        <button
                          key={date}
                          onClick={() => {
                            setSelectedDate(date);
                            setIsWaitlist(false);
                          }}
                          className={`w-full p-4 rounded-xl border-2 transition ${
                            selectedDate === date && !isWaitlist
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <p className="font-semibold">
                                {new Date(date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                              <p className="text-sm text-green-600">Available</p>
                            </div>
                            {selectedDate === date && !isWaitlist && (
                              <Check className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                        </button>
                      ))}
                      
                      {/* Fully booked date with waitlist option */}
                      <button
                        key="2026-04-05"
                        onClick={() => {
                          setSelectedDate('2026-04-05');
                          setIsWaitlist(true);
                        }}
                        className={`w-full p-4 rounded-xl border-2 transition ${
                          selectedDate === '2026-04-05' && isWaitlist
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold">
                              {new Date('2026-04-05').toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="text-sm text-amber-600">Fully Booked - Join Waitlist</p>
                          </div>
                          {selectedDate === '2026-04-05' && isWaitlist && (
                            <Check className="w-6 h-6 text-amber-600" />
                          )}
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Number of Travelers */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Number of Travelers</h2>
                    <p className="text-sm text-gray-500">Max {tour.maxGroupSize} per group</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 py-8">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={travelers <= 1}
                  >
                    <Minus className="w-6 h-6 text-blue-600" />
                  </button>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-blue-600">{travelers}</p>
                    <p className="text-gray-500 mt-2">travelers</p>
                  </div>
                  <button
                    onClick={() => setTravelers(Math.min(tour.maxGroupSize, travelers + 1))}
                    className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={travelers >= tour.maxGroupSize}
                  >
                    <Plus className="w-6 h-6 text-blue-600" />
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">${tour.price}</span> per person × {travelers} travelers
                  </p>
                  <p className="text-xl font-bold text-blue-600 mt-2">${tour.price * travelers}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Add-ons */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Enhance Your Experience</h2>
                <p className="text-sm text-gray-500 mb-6">Optional add-ons</p>

                <div className="space-y-3">
                  <AddOnOption
                    title="Airport Pickup"
                    description="Private transfer from airport to hotel"
                    price={addOnPrices.airportPickup}
                    isSelected={addOns.airportPickup}
                    onToggle={() => setAddOns({ ...addOns, airportPickup: !addOns.airportPickup })}
                  />
                  <AddOnOption
                    title="Professional Translator"
                    description="Personal translator for the entire trip"
                    price={addOnPrices.translator}
                    isSelected={addOns.translator}
                    onToggle={() => setAddOns({ ...addOns, translator: !addOns.translator })}
                  />
                  <AddOnOption
                    title="Travel Insurance"
                    description="Comprehensive coverage for your trip"
                    price={addOnPrices.insurance}
                    isSelected={addOns.insurance}
                    onToggle={() => setAddOns({ ...addOns, insurance: !addOns.insurance })}
                    recommended
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment or Waitlist Confirmation */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                {isWaitlist ? (
                  <>
                    <h2 className="text-xl font-bold mb-6">Waitlist Confirmation</h2>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-amber-900 text-sm mb-1">Waitlist Information</p>
                          <p className="text-xs text-amber-800">
                            You're joining the waitlist for this tour. We'll notify you via email if a spot becomes available.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold">Waitlist Details</h3>
                        <p className="text-sm text-gray-600">Tour: {tour.title}</p>
                        <p className="text-sm text-gray-600">Date: {selectedDate}</p>
                        <p className="text-sm text-gray-600">Travelers: {travelers}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Notification Preferences</h3>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={true}
                            disabled
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="text-sm text-gray-600">Email notifications</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={true}
                            disabled
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="text-sm text-gray-600">SMS notifications</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-6">Payment Details</h2>

                    {/* Payment Option: Full or Partial */}
                    <div className="space-y-3 mb-6">
                      <h3 className="font-semibold">Payment Option</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setPaymentOption('full')}
                          className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                            paymentOption === 'full'
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">100%</span>
                          </div>
                          <span className="font-semibold">Full Payment</span>
                          <span className="text-xs text-gray-600">Pay in full now</span>
                          {paymentOption === 'full' && <Check className="w-5 h-5 text-blue-600 mt-1" />}
                        </button>
                        <button
                          onClick={() => setPaymentOption('partial')}
                          className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                            paymentOption === 'partial'
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">50%</span>
                          </div>
                          <span className="font-semibold">Partial Payment</span>
                          <span className="text-xs text-gray-600">50% deposit now</span>
                          {paymentOption === 'partial' && <Check className="w-5 h-5 text-blue-600 mt-1" />}
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3 mb-6">
                      <h3 className="font-semibold">Payment Method</h3>
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-4 rounded-xl border-2 transition flex items-center gap-3 ${
                          paymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <CreditCard className="w-6 h-6 text-gray-600" />
                        <span className="font-semibold flex-1 text-left">Credit / Debit Card</span>
                        {paymentMethod === 'card' && <Check className="w-5 h-5 text-blue-600" />}
                      </button>
                      <button
                        onClick={() => setPaymentMethod('wechat')}
                        className={`w-full p-4 rounded-xl border-2 transition flex items-center gap-3 ${
                          paymentMethod === 'wechat'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-lg" />
                        <span className="font-semibold flex-1 text-left">WeChat Pay</span>
                        {paymentMethod === 'wechat' && <Check className="w-5 h-5 text-blue-600" />}
                      </button>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3 mb-6">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Terms & Conditions */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm mb-1">Important Notice</p>
                      <p className="text-xs text-amber-800">
                        By proceeding, you agree to the cancellation policy and terms of service. Customer liability applies for damages and violations.
                      </p>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <button className="text-blue-600 underline">Terms & Conditions</button>,{' '}
                    <button 
                      className="text-blue-600 underline" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCancellationPolicy(true);
                      }}
                    >
                      Cancellation Policy
                    </button>, and{' '}
                    <button className="text-blue-600 underline">Digital Waiver</button>
                  </span>
                </label>
              </div>
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`w-20 h-20 ${isOfflineBooking ? 'bg-amber-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <Check className={`w-10 h-10 ${isOfflineBooking ? 'text-amber-600' : 'text-green-600'}`} />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">{isOfflineBooking ? 'Booking Saved Offline' : 'Booking Confirmed!'}</h2>
                <p className="text-gray-600 mb-6">
                  Your booking reference: <span className="font-mono font-bold">TR{Date.now().toString().slice(-6)}</span>
                </p>
                {isOfflineBooking && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-900 text-sm">Offline Booking</p>
                        <p className="text-xs text-amber-800">
                          Your booking has been saved offline and will be synced when you're back online.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                  <h3 className="font-bold mb-2">Trip Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Tour:</span> {tour.title}</p>
                    <p><span className="text-gray-600">Date:</span> {selectedDate}</p>
                    <p><span className="text-gray-600">Travelers:</span> {travelers}</p>
                    {isWaitlist && (
                      <p className="text-amber-600"><span className="font-semibold">Status:</span> Waitlist - You'll be notified if a spot becomes available</p>
                    )}
                    {isOfflineBooking && (
                      <p className="text-amber-600"><span className="font-semibold">Booking Status:</span> Pending sync</p>
                    )}
                    {!isOfflineBooking && paymentOption === 'partial' && (
                      <>
                        <p><span className="text-gray-600">Payment Type:</span> Partial (50% deposit)</p>
                        <p><span className="text-gray-600">Deposit Paid:</span> ${total.toFixed(2)}</p>
                        <p><span className="text-gray-600">Balance Due:</span> ${(fullTotal - total).toFixed(2)}</p>
                      </>
                    )}
                    {!isOfflineBooking && paymentOption === 'full' && (
                      <p><span className="text-gray-600">Total Paid:</span> ${total.toFixed(2)}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  {isOfflineBooking ? 'A confirmation email will be sent when your booking is synced.' : 'A confirmation email has been sent to your email address.'}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('bookings')}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    View My Bookings
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Breakdown or Waitlist Info - Only show in steps 1-4 */}
        {step < 5 && (
          <div className="bg-white rounded-2xl p-6 mt-4">
            {isWaitlist ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold mb-2">Waitlist Information</h3>
                <p className="text-sm text-gray-600 mb-4">
                  No payment is required to join the waitlist. You'll be notified if a spot becomes available.
                </p>
                <p className="text-xs text-gray-500">
                  If a spot opens up, you'll have 24 hours to confirm your booking before it's offered to the next person on the waitlist.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bold mb-4">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${tour.price} × {travelers} travelers
                    </span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>
                  {addOns.airportPickup && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Airport Pickup</span>
                      <span className="font-semibold">${addOnPrices.airportPickup}</span>
                    </div>
                  )}
                  {addOns.translator && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Translator</span>
                      <span className="font-semibold">${addOnPrices.translator}</span>
                    </div>
                  )}
                  {addOns.insurance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Insurance</span>
                      <span className="font-semibold">${addOnPrices.insurance}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee (5%)</span>
                    <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                  </div>
                  {paymentOption === 'partial' && (
                    <>
                      <div className="pt-3 border-t border-gray-200 flex justify-between">
                        <span className="font-bold">Full Total</span>
                        <span className="text-lg font-bold">${fullTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-blue-600">50% Deposit</span>
                        <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  {paymentOption === 'full' && (
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-24" />
      </div>

      {/* Cancellation Policy Modal */}
      <AnimatePresence>
        {showCancellationPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">Cancellation Policy</h2>
                <button
                  onClick={() => setShowCancellationPolicy(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Cancellation Periods and Refunds</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li><span className="font-semibold">30+ days before departure:</span> Full refund minus 10% service fee</li>
                    <li><span className="font-semibold">15-29 days before departure:</span> 75% refund</li>
                    <li><span className="font-semibold">7-14 days before departure:</span> 50% refund</li>
                    <li><span className="font-semibold">3-6 days before departure:</span> 25% refund</li>
                    <li><span className="font-semibold">Less than 3 days before departure:</span> No refund</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Special Cases</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li><span className="font-semibold">Force majeure:</span> Full refund if the tour is cancelled due to unforeseen circumstances (natural disasters, political unrest, etc.)</li>
                    <li><span className="font-semibold">Medical emergencies:</span> Refund possible with medical documentation, subject to review</li>
                    <li><span className="font-semibold">Waitlist cancellations:</span> Full refund if not confirmed within 48 hours</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Partial Payments</h3>
                  <p className="text-sm text-gray-700">
                    If you've made a partial payment (50% deposit), the following cancellation policy applies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li><span className="font-semibold">30+ days before departure:</span> Full deposit refund minus 10% service fee</li>
                    <li><span className="font-semibold">15-29 days before departure:</span> 50% deposit refund</li>
                    <li><span className="font-semibold">Less than 15 days before departure:</span> No deposit refund</li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm mb-1">Important Notice</p>
                      <p className="text-xs text-amber-800">
                        Cancellations must be made in writing via email or through the app. Refunds will be processed within 7-10 business days to the original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCancellationPolicy(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Button - Only show in steps 1-4 */}
      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !selectedDate) ||
              (step === 4 && !agreedToTerms)
            }
            className={`w-full py-4 rounded-full font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${
              isWaitlist ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {step === 4 ? (isWaitlist ? 'Join Waitlist' : `Pay $${total.toFixed(2)}`) : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}

function AddOnOption({
  title,
  description,
  price,
  isSelected,
  onToggle,
  recommended,
}: {
  title: string;
  description: string;
  price: number;
  isSelected: boolean;
  onToggle: () => void;
  recommended?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full p-4 rounded-xl border-2 transition text-left ${
        isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{title}</h3>
            {recommended && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                Recommended
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="font-bold text-blue-600">+${price}</p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
            isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </button>
  );
}
