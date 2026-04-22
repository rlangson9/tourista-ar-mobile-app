import { useState } from 'react';
import { ArrowLeft, Shield, Smartphone, Mail, Key, Check, AlertCircle, Copy, RefreshCw } from 'lucide-react';

interface TwoFactorAuthProps {
  onBack: () => void;
}

export function TwoFactorAuth({ onBack }: TwoFactorAuthProps) {
  const [step, setStep] = useState<'setup' | 'verify' | 'recovery'>('setup');
  const [method, setMethod] = useState<'sms' | 'email' | 'authenticator'>('sms');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('john.doe@email.com');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

  const handleSetup = () => {
    setStep('verify');
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSetupComplete(true);
      generateRecoveryCodes();
    }, 1500);
  };

  const generateRecoveryCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setRecoveryCodes(codes);
  };

  const copyRecoveryCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join('\n'));
  };

  const handleDisable = () => {
    setIsSetupComplete(false);
    setStep('setup');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
            <p className="text-blue-100 text-sm">Enhanced security for your account</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Setup Step */}
        {step === 'setup' && !isSetupComplete && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold">Set up 2FA</h2>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Choose verification method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-4 border ${method === 'sms' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg cursor-pointer`}>
                    <input
                      type="radio"
                      name="method"
                      value="sms"
                      checked={method === 'sms'}
                      onChange={() => setMethod('sms')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">SMS</p>
                        <p className="text-xs text-gray-500">Send code to {phone}</p>
                      </div>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-4 border ${method === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg cursor-pointer`}>
                    <input
                      type="radio"
                      name="method"
                      value="email"
                      checked={method === 'email'}
                      onChange={() => setMethod('email')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-xs text-gray-500">Send code to {email}</p>
                      </div>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-4 border ${method === 'authenticator' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg cursor-pointer`}>
                    <input
                      type="radio"
                      name="method"
                      value="authenticator"
                      checked={method === 'authenticator'}
                      onChange={() => setMethod('authenticator')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Authenticator App</p>
                        <p className="text-xs text-gray-500">Use Google Authenticator or similar</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSetup}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Verify Step */}
        {step === 'verify' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold">Verify Your Identity</h2>
                <p className="text-sm text-gray-600">Enter the code sent to your {method === 'sms' ? 'phone' : method === 'email' ? 'email' : 'authenticator app'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl font-mono"
                />
              </div>

              <div className="flex items-center justify-between">
                <button className="text-sm text-blue-600 hover:text-blue-700 transition flex items-center gap-1">
                  <RefreshCw className="w-4 h-4" />
                  Resend Code
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-700 transition">
                  Use a different method
                </button>
              </div>

              <button
                onClick={handleVerify}
                disabled={isVerifying || verificationCode.length !== 6}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {/* Setup Complete */}
        {isSetupComplete && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">2FA is Enabled</h2>
                  <p className="text-sm text-gray-600">Your account is now more secure</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Recovery Codes</p>
                      <p className="text-sm text-blue-700">Save these codes in a safe place. They can be used to access your account if you lose your device.</p>
                    </div>
                  </div>
                </div>

                {!showRecoveryCodes ? (
                  <button
                    onClick={() => setShowRecoveryCodes(true)}
                    className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Show Recovery Codes
                  </button>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Recovery Codes</h3>
                      <button
                        onClick={copyRecoveryCodes}
                        className="text-sm text-blue-600 hover:text-blue-700 transition flex items-center gap-1"
                      >
                        <Copy className="w-4 h-4" />
                        Copy All
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {recoveryCodes.map((code, index) => (
                        <div key={index} className="bg-white p-2 rounded border border-gray-200 text-center font-mono text-sm">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDisable}
                  className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Disable 2FA
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">How 2FA works</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• When you log in, you'll be asked for your password</li>
                <li>• Then you'll need to enter a verification code</li>
                <li>• The code will be sent to your chosen method</li>
                <li>• This adds an extra layer of security to your account</li>
              </ul>
            </div>
          </div>
        )}

        {/* Recovery Step */}
        {step === 'recovery' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-amber-600" />
              <div>
                <h2 className="text-lg font-bold">Account Recovery</h2>
                <p className="text-sm text-gray-600">Use a recovery code to access your account</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Code</label>
                <input
                  type="text"
                  placeholder="Enter your recovery code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Verify Recovery Code
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Don't have a recovery code?</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 transition">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
