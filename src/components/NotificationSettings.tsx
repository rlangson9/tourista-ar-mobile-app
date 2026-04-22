import { ArrowLeft, Bell, Mail, MessageSquare, Phone, Volume2, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NotificationSettingsProps {
  onBack: () => void;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [notifications, setNotifications] = useState({
    push: {
      enabled: true,
      bookings: true,
      promotions: false,
      messages: true,
      updates: true,
    },
    email: {
      enabled: true,
      bookings: true,
      promotions: true,
      newsletters: false,
      updates: true,
    },
    sms: {
      enabled: false,
      bookings: true,
      alerts: false,
      updates: false,
    },
  });

  const updateNotification = (category: keyof typeof notifications, type: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value,
      },
    }));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-bold">Notification Preferences</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Push Notifications */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold">Push Notifications</h3>
                <p className="text-sm text-gray-500">Get instant alerts on your device</p>
              </div>
            </div>
            <button
              onClick={() => updateNotification('push', 'enabled', !notifications.push.enabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.push.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                notifications.push.enabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {notifications.push.enabled && (
            <div className="space-y-3 mt-4">
              <NotificationToggle
                label="Booking Confirmations"
                description="When your tours are confirmed"
                checked={notifications.push.bookings}
                onChange={(value) => updateNotification('push', 'bookings', value)}
              />
              <NotificationToggle
                label="Messages"
                description="New messages from partners"
                checked={notifications.push.messages}
                onChange={(value) => updateNotification('push', 'messages', value)}
              />
              <NotificationToggle
                label="App Updates"
                description="New features and improvements"
                checked={notifications.push.updates}
                onChange={(value) => updateNotification('push', 'updates', value)}
              />
              <NotificationToggle
                label="Promotions"
                description="Special offers and deals"
                checked={notifications.push.promotions}
                onChange={(value) => updateNotification('push', 'promotions', value)}
              />
            </div>
          )}
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold">Email Notifications</h3>
                <p className="text-sm text-gray-500">Updates sent to your email</p>
              </div>
            </div>
            <button
              onClick={() => updateNotification('email', 'enabled', !notifications.email.enabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.email.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                notifications.email.enabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {notifications.email.enabled && (
            <div className="space-y-3 mt-4">
              <NotificationToggle
                label="Booking Confirmations"
                description="Receipts and itineraries"
                checked={notifications.email.bookings}
                onChange={(value) => updateNotification('email', 'bookings', value)}
              />
              <NotificationToggle
                label="App Updates"
                description="Product news and updates"
                checked={notifications.email.updates}
                onChange={(value) => updateNotification('email', 'updates', value)}
              />
              <NotificationToggle
                label="Promotions"
                description="Exclusive deals and offers"
                checked={notifications.email.promotions}
                onChange={(value) => updateNotification('email', 'promotions', value)}
              />
              <NotificationToggle
                label="Newsletter"
                description="Weekly travel inspiration"
                checked={notifications.email.newsletters}
                onChange={(value) => updateNotification('email', 'newsletters', value)}
              />
            </div>
          )}
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold">SMS Notifications</h3>
                <p className="text-sm text-gray-500">Important updates via text</p>
              </div>
            </div>
            <button
              onClick={() => updateNotification('sms', 'enabled', !notifications.sms.enabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.sms.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                notifications.sms.enabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {notifications.sms.enabled && (
            <div className="space-y-3 mt-4">
              <NotificationToggle
                label="Booking Alerts"
                description="Time-sensitive updates"
                checked={notifications.sms.bookings}
                onChange={(value) => updateNotification('sms', 'bookings', value)}
              />
              <NotificationToggle
                label="Critical Alerts"
                description="Emergency notifications only"
                checked={notifications.sms.alerts}
                onChange={(value) => updateNotification('sms', 'alerts', value)}
              />
              <NotificationToggle
                label="Service Updates"
                description="Changes to your bookings"
                checked={notifications.sms.updates}
                onChange={(value) => updateNotification('sms', 'updates', value)}
              />
            </div>
          )}
        </div>

        {/* Sound Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Sound Settings</h3>
              <p className="text-sm text-gray-500">Control notification sounds</p>
            </div>
          </div>
          <div className="space-y-3">
            <NotificationToggle
              label="Notification Sounds"
              description="Play sound for new notifications"
              checked={true}
              onChange={() => {}}
            />
            <NotificationToggle
              label="Vibration"
              description="Vibrate for notifications"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Quiet Hours</h3>
              <p className="text-sm text-gray-500">Limit notifications during specific times</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable Quiet Hours</span>
              <button className="w-12 h-6 bg-gray-300 rounded-full">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm translate-x-0.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">From</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                  defaultValue="22:00"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">To</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                  defaultValue="08:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description?: string; 
  checked: boolean; 
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium text-sm">{label}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
}
