import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  Factory,
  DollarSign,
  TrendingUp,
  Settings,
  AlertCircle,
  BarChart3,
  Shield,
  Crown,
  Plus,
  Edit,
  Ban,
  Trash2,
  Check,
  X,
  Eye,
  FileText,
  Search,
  Filter,
  Download,
  Star,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Calendar,
  Globe,
  Phone,
  Activity,
  PieChart,
  LineChart,
  TrendingDown,
  UserCheck,
  ShoppingCart,
  CreditCard,
  Package,
  MapPin,
  UserPlus,
  Bell,
  Map,
  Archive,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';


interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
  onLogout?: () => void;
  isSuperAdmin?: boolean;
}

type AdminRole = 'super_admin' | 'admin' | 'moderator';
type ModuleAccess = {
  userManagement: boolean;
  partnerManagement: boolean;
  supplierManagement: boolean;
  commissionSettings: boolean;
  sponsoredAds: boolean;
  aiConfiguration: boolean;
  disputeManagement: boolean;
  reportsAnalytics: boolean;
};

interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'active' | 'suspended';
  modules: ModuleAccess;
  createdAt: string;
}

export function AdminDashboard({ onNavigate, onLogout, isSuperAdmin = true }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'admins' | 'users' | 'partners' | 'suppliers' | 'commission' | 'sponsored' | 'monetization' | 'ai' | 'disputes' | 'reports' | 'group-bookings'>('overview');
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        {/* Logo & Super Admin Badge */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              AR
            </div>
            <div>
              <h1 className="text-xl font-bold">Tourista AR</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
          {isSuperAdmin && (
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5" />
                <span className="font-bold">Super Admin</span>
              </div>
              <p className="text-xs text-amber-100">Full System Control</p>
            </div>
          )}
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <p className="text-xs text-gray-500 mb-1">Logged in as</p>
            <p className="font-bold text-sm">System Administrator</p>
            <p className="text-xs text-gray-500">admin@tourista-ar.com</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition bg-red-50 text-red-600 hover:bg-red-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="flex-1 text-left font-medium text-sm">Logout</span>
          </button>
        </div>

        <nav className="space-y-1">
          <NavItem
            icon={LayoutDashboard}
            label="Overview"
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          {isSuperAdmin && (
            <NavItem
              icon={Shield}
              label="Admin Management"
              isActive={activeTab === 'admins'}
              onClick={() => setActiveTab('admins')}
              badge="3"
            />
          )}
          <NavItem
            icon={Users}
            label="User Management"
            isActive={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          />
          <NavItem
            icon={Building2}
            label="Partner Management"
            isActive={activeTab === 'partners'}
            onClick={() => setActiveTab('partners')}
          />
          <NavItem
            icon={Factory}
            label="Supplier Management"
            isActive={activeTab === 'suppliers'}
            onClick={() => setActiveTab('suppliers')}
          />
          <NavItem
            icon={DollarSign}
            label="Commission Settings"
            isActive={activeTab === 'commission'}
            onClick={() => setActiveTab('commission')}
          />
          <NavItem
            icon={TrendingUp}
            label="Sponsored Ads"
            isActive={activeTab === 'sponsored'}
            onClick={() => setActiveTab('sponsored')}
          />
          <NavItem
            icon={Crown}
            label="Monetization"
            isActive={activeTab === 'monetization'}
            onClick={() => setActiveTab('monetization')}
          />
          <NavItem
            icon={Settings}
            label="AI Configuration"
            isActive={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
          />
          <NavItem
            icon={AlertCircle}
            label="Dispute Management"
            isActive={activeTab === 'disputes'}
            onClick={() => setActiveTab('disputes')}
            badge="5"
          />
          <NavItem
            icon={Map}
            label="Reports & Analytics"
            isActive={activeTab === 'reports'}
            onClick={() => setActiveTab('reports')}
          />
          <NavItem
            icon={Users}
            label="Group Bookings"
            isActive={activeTab === 'group-bookings'}
            onClick={() => setActiveTab('group-bookings')}
            badge="2"
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'admins' && isSuperAdmin && (
          <AdminManagementTab onShowAddModal={() => setShowAddAdminModal(true)} />
        )}
        {activeTab === 'users' && <UserManagementTab />}
        {activeTab === 'partners' && <PartnerManagementTab />}
        {activeTab === 'suppliers' && <SupplierManagementTab />}
        {activeTab === 'commission' && <CommissionSettingsTab />}
        {activeTab === 'sponsored' && <SponsoredAdsTab />}
        {activeTab === 'monetization' && <SubscriptionPlansTab />}
        {activeTab === 'ai' && <AIConfigurationTab />}
        {activeTab === 'disputes' && <DisputeManagementTab />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'group-bookings' && <GroupBookingsTab />}
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {showAddAdminModal && (
          <AddAdminModal onClose={() => setShowAddAdminModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  badge,
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left font-medium text-sm">{label}</span>
      {badge && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
          isActive ? 'bg-white/20' : 'bg-red-100 text-red-600'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function OverviewTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h1>
        <p className="text-gray-500">Monitor platform performance and activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KPICard title="Total Users" value="12,487" change="+324" icon={Users} color="blue" />
        <KPICard title="Active Partners" value="156" change="+12" icon={Building2} color="green" />
        <KPICard title="Active Suppliers" value="342" change="+28" icon={Factory} color="purple" />
        <KPICard title="Platform Revenue" value="$458,920" change="+18.5%" icon={DollarSign} color="amber" />
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { type: 'user', action: 'New user registration', time: '2 mins ago', icon: Users },
              { type: 'partner', action: 'Partner verification approved', time: '15 mins ago', icon: Building2 },
              { type: 'supplier', action: 'New supplier application', time: '1 hour ago', icon: Factory },
              { type: 'dispute', action: 'Dispute resolved', time: '2 hours ago', icon: AlertCircle },
            ].map((activity, i) => {
              const Icon = activity.icon;
              
              const handleClick = () => {
                // In a real app, this would open the respective information
                console.log(`Opening ${activity.type} activity: ${activity.action}`);
                // For example, navigate to user management, partner management, etc.
              };
              
              return (
                <div 
                  key={i} 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                  onClick={handleClick}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Platform Health</h3>
          <div className="space-y-4">
            <HealthMetric label="System Status" value="Operational" status="good" />
            <HealthMetric label="API Response Time" value="145ms" status="good" />
            <HealthMetric label="Active Sessions" value="3,247" status="good" />
            <HealthMetric label="Pending Approvals" value="23" status="warning" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Transaction Overview</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-600 mt-1">Tour Bookings</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">856</p>
            <p className="text-sm text-gray-600 mt-1">Trade Orders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">$45,892</p>
            <p className="text-sm text-gray-600 mt-1">Commission Earned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">34</p>
            <p className="text-sm text-gray-600 mt-1">Active Subscriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminManagementTab({ onShowAddModal }: { onShowAddModal: () => void }) {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      name: 'System Administrator',
      email: 'admin@tourista-ar.com',
      role: 'super_admin',
      status: 'active',
      modules: {
        userManagement: true,
        partnerManagement: true,
        supplierManagement: true,
        commissionSettings: true,
        sponsoredAds: true,
        aiConfiguration: true,
        disputeManagement: true,
        reportsAnalytics: true,
      },
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@tourista-ar.com',
      role: 'admin',
      status: 'active',
      modules: {
        userManagement: true,
        partnerManagement: true,
        supplierManagement: false,
        commissionSettings: false,
        sponsoredAds: true,
        aiConfiguration: false,
        disputeManagement: true,
        reportsAnalytics: false,
      },
      createdAt: '2024-01-15',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@tourista-ar.com',
      role: 'admin',
      status: 'inactive',
      modules: {
        userManagement: false,
        partnerManagement: true,
        supplierManagement: true,
        commissionSettings: true,
        sponsoredAds: false,
        aiConfiguration: false,
        disputeManagement: false,
        reportsAnalytics: true,
      },
      createdAt: '2024-02-01',
    },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Management</h1>
          <p className="text-gray-500">Appoint and manage system administrators</p>
        </div>
        <button
          onClick={onShowAddModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Appoint Admin
        </button>
      </div>

      {/* Super Admin Notice */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <Crown className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Super Admin Authority</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Super Admin cannot be removed or replaced</li>
              <li>• Only Super Admin can appoint, suspend, or remove other admins</li>
              <li>• Super Admin has full access to all system modules</li>
              <li>• All admin actions are logged for security audit</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Admins List */}
      <div className="space-y-4">
        {admins.map((admin) => (
          <div key={admin.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  admin.role === 'super_admin' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                  admin.role === 'admin' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  'bg-gradient-to-br from-gray-500 to-gray-600'
                }`}>
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{admin.name}</h3>
                    {admin.role === 'super_admin' && (
                      <Crown className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      admin.role === 'super_admin' ? 'bg-amber-100 text-amber-700' :
                      admin.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 
                       admin.role === 'admin' ? 'Admin' : 'Moderator'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {admin.status === 'active' ? 'Active' : 'Suspended'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Appointed: {new Date(admin.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {admin.role !== 'super_admin' && (
                <div className="flex gap-2">
                  <button 
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowEditModal(true);
                    }}
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    className="p-2 border border-amber-300 rounded-lg hover:bg-amber-50 transition"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowBanModal(true);
                    }}
                  >
                    <Ban className="w-5 h-5 text-amber-600" />
                  </button>
                  <button 
                    className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Module Access */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-sm mb-3">Module Access</h4>
              <div className="grid grid-cols-4 gap-3">
                <ModuleBadge label="User Mgmt" hasAccess={admin.modules.userManagement} />
                <ModuleBadge label="Partner Mgmt" hasAccess={admin.modules.partnerManagement} />
                <ModuleBadge label="Supplier Mgmt" hasAccess={admin.modules.supplierManagement} />
                <ModuleBadge label="Commission" hasAccess={admin.modules.commissionSettings} />
                <ModuleBadge label="Sponsored Ads" hasAccess={admin.modules.sponsoredAds} />
                <ModuleBadge label="AI Config" hasAccess={admin.modules.aiConfiguration} />
                <ModuleBadge label="Disputes" hasAccess={admin.modules.disputeManagement} />
                <ModuleBadge label="Reports" hasAccess={admin.modules.reportsAnalytics} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Admin Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Admin</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedAdmin.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedAdmin.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedAdmin.role}
                >
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedAdmin.status}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, you would update the admin data
                  setShowEditModal(false);
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ban Admin Modal */}
      {showBanModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedAdmin.status === 'active' ? 'Ban Admin' : 'Unban Admin'}</h2>
              <button 
                onClick={() => setShowBanModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {selectedAdmin.status === 'active' 
                ? `Are you sure you want to ban ${selectedAdmin.name}? They will no longer be able to access the admin panel.`
                : `Are you sure you want to unban ${selectedAdmin.name}? They will regain access to the admin panel.`
              }
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowBanModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, you would update the admin's status
                  setShowBanModal(false);
                }}
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition"
              >
                {selectedAdmin.status === 'active' ? 'Ban' : 'Unban'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Admin Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Delete Admin</h2>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedAdmin.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, you would delete the admin
                  setShowDeleteModal(false);
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleBadge({ label, hasAccess }: { label: string; hasAccess: boolean }) {
  return (
    <div className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 ${
      hasAccess ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
    }`}>
      {hasAccess ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {label}
    </div>
  );
}

function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const modules = [
    { id: 'userManagement', label: 'User Management' },
    { id: 'partnerManagement', label: 'Partner Management' },
    { id: 'supplierManagement', label: 'Supplier Management' },
    { id: 'commissionSettings', label: 'Commission Settings' },
    { id: 'sponsoredAds', label: 'Sponsored Ads Management' },
    { id: 'aiConfiguration', label: 'AI Configuration' },
    { id: 'disputeManagement', label: 'Dispute Management' },
    { id: 'reportsAnalytics', label: 'Reports & Analytics' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6">Appoint New Admin</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter admin name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="admin@tourista-ar.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Role *
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Assign Modules *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {modules.map((module) => (
                <label
                  key={module.id}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedModules([...selectedModules, module.id]);
                      } else {
                        setSelectedModules(selectedModules.filter(m => m !== module.id));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">{module.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Appoint Admin
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Fully implemented admin modules
function UserManagementTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const users = [
    { id: '1', name: 'John Smith', email: 'john@example.com', country: 'South Africa', status: 'active', verified: true, joinDate: '2024-01-15', bookings: 12, tradeOrders: 5 },
    { id: '2', name: 'Wei Chen', email: 'wei.chen@example.com', country: 'China', status: 'active', verified: true, joinDate: '2024-02-01', bookings: 8, tradeOrders: 15 },
    { id: '3', name: 'Sarah Johnson', email: 'sarah.j@example.com', country: 'Nigeria', status: 'suspended', verified: false, joinDate: '2024-03-10', bookings: 2, tradeOrders: 0 },
    { id: '4', name: 'Ahmed Hassan', email: 'ahmed@example.com', country: 'Egypt', status: 'active', verified: true, joinDate: '2024-01-20', bookings: 15, tradeOrders: 8 },
  ];

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const handleBanUser = (userId: string) => {
    if (window.confirm('Are you sure you want to ban this user?')) {
      // In a real app, this would call an API to ban the user
      console.log('Banning user:', userId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-500">Monitor and manage platform users</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          Export Data
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">12,487</p>
          <p className="text-sm text-green-600 mt-1">+324 this month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Active Users</p>
          <p className="text-3xl font-bold text-green-600">11,892</p>
          <p className="text-sm text-gray-500 mt-1">95.2% active</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Verified Users</p>
          <p className="text-3xl font-bold text-blue-600">8,456</p>
          <p className="text-sm text-gray-500 mt-1">67.7% verified</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Suspended</p>
          <p className="text-3xl font-bold text-red-600">125</p>
          <p className="text-sm text-gray-500 mt-1">1.0% of total</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or ID..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">User</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">Country</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">Status</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">Activity</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">Join Date</th>
              <th className="text-right px-6 py-4 text-sm font-bold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{user.country}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                    {user.verified && (
                      <Shield className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900">{user.bookings} bookings</p>
                    <p className="text-gray-500">{user.tradeOrders} trades</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{new Date(user.joinDate).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      onClick={() => handleViewUser(user)}
                      title="View user details"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      onClick={() => handleEditUser(user)}
                      title="Edit user"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      className="p-2 hover:bg-red-50 rounded-lg transition"
                      onClick={() => handleBanUser(user.id)}
                      title="Ban user"
                    >
                      <Ban className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">User Details</h3>
              <button 
                onClick={() => setShowUserDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedUser.name}</h4>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Country</span>
                  <span className="font-medium">{selectedUser.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Verified</span>
                  <span>{selectedUser.verified ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Join Date</span>
                  <span>{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bookings</span>
                  <span>{selectedUser.bookings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trade Orders</span>
                  <span>{selectedUser.tradeOrders}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Edit User</h3>
              <button 
                onClick={() => setShowEditUser(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedUser.name}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue={selectedUser.email}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <input 
                  type="text" 
                  defaultValue={selectedUser.country}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select 
                  defaultValue={selectedUser.status}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={selectedUser.verified}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm font-semibold text-gray-700">Verified</label>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setShowEditUser(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PartnerManagementTab() {
  const [partners, setPartners] = useState([
    {
      id: 'PART001',
      companyName: 'Adventure Tours Ltd',
      contactPerson: 'Michael Roberts',
      email: 'michael@adventuretours.com',
      phone: '+1-555-0101',
      category: 'Adventure Tourism',
      registrationDate: '2024-01-10',
      verificationStatus: 'verified',
      accountStatus: 'active',
      tours: 28,
      totalBookings: 1456,
      revenue: '$89,234',
      rating: 4.9,
      lastActive: '2024-03-12',
      documents: ['business_license', 'tourism_permit', 'insurance', 'safety_certification'],
      violations: 0,
      subscriptionTier: 'premium',
      featuredTours: 12,
      averageGroupSize: 15
    },
    {
      id: 'PART002',
      companyName: 'Luxury Travel Agency',
      contactPerson: 'Sophia Martinez',
      email: 'sophia@luxurytravel.com',
      phone: '+1-555-0102',
      category: 'Luxury Tourism',
      registrationDate: '2024-02-15',
      verificationStatus: 'pending',
      accountStatus: 'inactive',
      tours: 15,
      totalBookings: 234,
      revenue: '$45,678',
      rating: 4.6,
      lastActive: '2024-03-01',
      documents: ['business_license', 'tourism_permit'],
      violations: 1,
      subscriptionTier: 'basic',
      featuredTours: 5,
      averageGroupSize: 8
    },
    {
      id: 'PART003',
      companyName: 'Eco Wildlife Tours',
      contactPerson: 'David Chen',
      email: 'david@ecowildlife.com',
      phone: '+1-555-0103',
      category: 'Wildlife Tourism',
      registrationDate: '2024-01-05',
      verificationStatus: 'verified',
      accountStatus: 'active',
      tours: 42,
      totalBookings: 2890,
      revenue: '$156,789',
      rating: 4.8,
      lastActive: '2024-03-11',
      documents: ['business_license', 'tourism_permit', 'insurance', 'environmental_certification', 'wildlife_permits'],
      violations: 0,
      subscriptionTier: 'enterprise',
      featuredTours: 18,
      averageGroupSize: 12
    },
    {
      id: 'PART004',
      companyName: 'Cultural Heritage Tours',
      contactPerson: 'Maria Garcia',
      email: 'maria@culturalheritage.com',
      phone: '+52-55-1234-0104',
      category: 'Cultural Tourism',
      registrationDate: '2024-03-01',
      verificationStatus: 'rejected',
      accountStatus: 'suspended',
      tours: 8,
      totalBookings: 45,
      revenue: '$8,901',
      rating: 3.2,
      lastActive: '2024-03-05',
      documents: ['business_license'],
      violations: 4,
      subscriptionTier: 'basic',
      featuredTours: 2,
      averageGroupSize: 20
    },
    {
      id: 'PART005',
      companyName: 'Beach Paradise Resorts',
      contactPerson: 'James Wilson',
      email: 'james@beachparadise.com',
      phone: '+1-555-0105',
      category: 'Beach Tourism',
      registrationDate: '2024-01-20',
      verificationStatus: 'verified',
      accountStatus: 'active',
      tours: 35,
      totalBookings: 1876,
      revenue: '$123,456',
      rating: 4.7,
      lastActive: '2024-03-10',
      documents: ['business_license', 'tourism_permit', 'insurance', 'safety_certification', 'beach_access_permit'],
      violations: 0,
      subscriptionTier: 'premium',
      featuredTours: 15,
      averageGroupSize: 25
    }
  ]);

  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVerification, setFilterVerification] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerify = (partnerId: string, status: 'verified' | 'rejected') => {
    setPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, verificationStatus: status, accountStatus: status === 'verified' ? 'active' : 'suspended' }
          : partner
      )
    );
    setShowVerificationModal(false);
  };

  const handleSuspend = (partnerId: string) => {
    setPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, accountStatus: 'suspended' }
          : partner
      )
    );
  };

  const handleActivate = (partnerId: string) => {
    setPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, accountStatus: 'active' }
          : partner
      )
    );
  };

  const handleDelete = (partnerId: string) => {
    setPartners(prev => prev.filter(partner => partner.id !== partnerId));
    setShowDetails(false);
    setSelectedPartner(null);
  };

  const handleFeature = (partnerId: string) => {
    setPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, featuredTours: partner.featuredTours + 1 }
          : partner
      )
    );
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-red-100 text-red-700',
  };

  const verificationColors = {
    verified: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const filteredPartners = partners.filter(partner => {
    const statusMatch = filterStatus === 'all' || partner.accountStatus === filterStatus;
    const verificationMatch = filterVerification === 'all' || partner.verificationStatus === filterVerification;
    const searchMatch = searchTerm === '' || 
      partner.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && verificationMatch && searchMatch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Management</h1>
          <p className="text-gray-500">Manage tour operators, travel agencies, and tourism service providers</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Partner
          </button>
        </div>
      </div>

      {/* Partner Statistics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100 text-sm mb-2">Total Partners</p>
          <p className="text-3xl font-bold">{partners.length}</p>
          <p className="text-sm text-blue-100 mt-1">Registered</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-green-100 text-sm mb-2">Verified Partners</p>
          <p className="text-3xl font-bold">{partners.filter(p => p.verificationStatus === 'verified').length}</p>
          <p className="text-sm text-green-100 mt-1">Active operators</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-yellow-100 text-sm mb-2">Pending Verification</p>
          <p className="text-3xl font-bold">{partners.filter(p => p.verificationStatus === 'pending').length}</p>
          <p className="text-sm text-yellow-100 mt-1">Need review</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Total Bookings</p>
          <p className="text-3xl font-bold">{partners.reduce((sum, p) => sum + p.totalBookings, 0).toLocaleString()}</p>
          <p className="text-sm text-purple-100 mt-1">All time</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Partner Filters</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-lg">Registered Partners</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{partner.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{partner.companyName}</div>
                      <div className="text-sm text-gray-500">{partner.subscriptionTier}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{partner.contactPerson}</div>
                      <div className="text-sm text-gray-500">{partner.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verificationColors[partner.verificationStatus]}`}>
                      {partner.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[partner.accountStatus]}`}>
                      {partner.accountStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium text-gray-900">{partner.tours}</div>
                        <div className="text-xs">Tours</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{partner.rating}</div>
                        <div className="text-xs">Rating</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{partner.revenue}</div>
                        <div className="text-xs">Revenue</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {partner.verificationStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedPartner(partner);
                              setShowVerificationModal(true);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleVerify(partner.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedPartner(partner);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleFeature(partner.id)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Feature Tour"
                      >
                        <Star className="w-5 h-5" />
                      </button>
                      {partner.accountStatus === 'active' ? (
                        <button
                          onClick={() => handleSuspend(partner.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(partner.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <UserCheck className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Details Modal */}
      {showDetails && selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Partner Details</h2>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedPartner(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Company Name:</span>
                      <p className="font-medium">{selectedPartner.companyName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Contact Person:</span>
                      <p className="font-medium">{selectedPartner.contactPerson}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{selectedPartner.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="font-medium">{selectedPartner.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Category:</span>
                      <p className="font-medium">{selectedPartner.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Registration Date:</span>
                      <p className="font-medium">{selectedPartner.registrationDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Verification Status:</span>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verificationColors[selectedPartner.verificationStatus]}`}>
                          {selectedPartner.verificationStatus}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Account Status:</span>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[selectedPartner.accountStatus]}`}>
                          {selectedPartner.accountStatus}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Subscription Tier:</span>
                      <p className="font-medium capitalize">{selectedPartner.subscriptionTier}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Last Active:</span>
                      <p className="font-medium">{selectedPartner.lastActive}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Violations:</span>
                      <p className="font-medium">{selectedPartner.violations}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Tours</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPartner.tours}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPartner.totalBookings}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPartner.revenue}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPartner.rating}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Featured Tours</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPartner.featuredTours}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Average Group Size</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPartner.averageGroupSize}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.documents.map((doc: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {doc.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {selectedPartner.verificationStatus === 'pending' && (
                  <>
                    <button
                      onClick={() => handleVerify(selectedPartner.id, 'verified')}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                    >
                      Verify Partner
                    </button>
                    <button
                      onClick={() => handleVerify(selectedPartner.id, 'rejected')}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
                    >
                      Reject Application
                    </button>
                  </>
                )}
                {selectedPartner.accountStatus === 'active' ? (
                  <button
                    onClick={() => handleSuspend(selectedPartner.id)}
                    className="flex-1 px-6 py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition"
                  >
                    Suspend Account
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(selectedPartner.id)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                  >
                    Activate Account
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedPartner(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Verify Partner</h3>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedPartner.companyName}</h4>
                <p className="text-sm text-gray-600">Contact: {selectedPartner.contactPerson}</p>
                <p className="text-sm text-gray-600">Email: {selectedPartner.email}</p>
                <p className="text-sm text-gray-600">Category: {selectedPartner.category}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Submitted Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.documents.map((doc: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {doc.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  Please review all submitted documents before verification. Once verified, the partner will be able to list tours and accept bookings.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleVerify(selectedPartner.id, 'verified')}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Approve Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SupplierManagementTab() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 'SUP001',
      companyName: 'Global Manufacturing Co',
      contactPerson: 'John Smith',
      email: 'john@globalmfg.com',
      phone: '+1-555-0123',
      category: 'Electronics',
      registrationDate: '2024-01-15',
      verificationStatus: 'verified',
      accountStatus: 'active',
      products: 145,
      totalOrders: 1234,
      revenue: '$45,678',
      rating: 4.8,
      lastActive: '2024-03-10',
      documents: ['business_license', 'tax_certificate', 'insurance'],
      violations: 0,
      subscriptionTier: 'premium'
    },
    {
      id: 'SUP002',
      companyName: 'Asian Textiles Ltd',
      contactPerson: 'Mei Chen',
      email: 'mei@asiantextiles.com',
      phone: '+86-138-0000-1234',
      category: 'Textiles',
      registrationDate: '2024-02-20',
      verificationStatus: 'pending',
      accountStatus: 'inactive',
      products: 89,
      totalOrders: 567,
      revenue: '$12,345',
      rating: 4.2,
      lastActive: '2024-02-28',
      documents: ['business_license'],
      violations: 1,
      subscriptionTier: 'basic'
    },
    {
      id: 'SUP003',
      companyName: 'Tech Components Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@techcomp.com',
      phone: '+1-555-0456',
      category: 'Technology',
      registrationDate: '2024-01-08',
      verificationStatus: 'verified',
      accountStatus: 'active',
      products: 234,
      totalOrders: 2890,
      revenue: '$78,901',
      rating: 4.9,
      lastActive: '2024-03-12',
      documents: ['business_license', 'tax_certificate', 'insurance', 'quality_certification'],
      violations: 0,
      subscriptionTier: 'enterprise'
    },
    {
      id: 'SUP004',
      companyName: 'Food Imports LLC',
      contactPerson: 'Carlos Rodriguez',
      email: 'carlos@foodimports.com',
      phone: '+52-55-1234-5678',
      category: 'Food & Beverage',
      registrationDate: '2024-03-01',
      verificationStatus: 'rejected',
      accountStatus: 'suspended',
      products: 45,
      totalOrders: 123,
      revenue: '$3,456',
      rating: 3.1,
      lastActive: '2024-03-05',
      documents: ['business_license'],
      violations: 3,
      subscriptionTier: 'basic'
    }
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVerification, setFilterVerification] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerify = (supplierId: string, status: 'verified' | 'rejected') => {
    setSuppliers(prev => 
      prev.map(supplier => 
        supplier.id === supplierId 
          ? { ...supplier, verificationStatus: status, accountStatus: status === 'verified' ? 'active' : 'suspended' }
          : supplier
      )
    );
    setShowVerificationModal(false);
  };

  const handleSuspend = (supplierId: string) => {
    setSuppliers(prev => 
      prev.map(supplier => 
        supplier.id === supplierId 
          ? { ...supplier, accountStatus: 'suspended' }
          : supplier
      )
    );
  };

  const handleActivate = (supplierId: string) => {
    setSuppliers(prev => 
      prev.map(supplier => 
        supplier.id === supplierId 
          ? { ...supplier, accountStatus: 'active' }
          : supplier
      )
    );
  };

  const handleDelete = (supplierId: string) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== supplierId));
    setShowDetails(false);
    setSelectedSupplier(null);
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-red-100 text-red-700',
  };

  const verificationColors = {
    verified: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const statusMatch = filterStatus === 'all' || supplier.accountStatus === filterStatus;
    const verificationMatch = filterVerification === 'all' || supplier.verificationStatus === filterVerification;
    const searchMatch = searchTerm === '' || 
      supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && verificationMatch && searchMatch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Management</h1>
          <p className="text-gray-500">Manage trade vendors, manufacturers, and service providers</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Supplier Statistics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100 text-sm mb-2">Total Suppliers</p>
          <p className="text-3xl font-bold">{suppliers.length}</p>
          <p className="text-sm text-blue-100 mt-1">Registered</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-green-100 text-sm mb-2">Verified Suppliers</p>
          <p className="text-3xl font-bold">{suppliers.filter(s => s.verificationStatus === 'verified').length}</p>
          <p className="text-sm text-green-100 mt-1">Active partners</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-yellow-100 text-sm mb-2">Pending Verification</p>
          <p className="text-3xl font-bold">{suppliers.filter(s => s.verificationStatus === 'pending').length}</p>
          <p className="text-sm text-yellow-100 mt-1">Need review</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold">$136.8K</p>
          <p className="text-sm text-purple-100 mt-1">This month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Supplier Filters</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-lg">Registered Suppliers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{supplier.companyName}</div>
                      <div className="text-sm text-gray-500">{supplier.subscriptionTier}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                      <div className="text-sm text-gray-500">{supplier.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verificationColors[supplier.verificationStatus]}`}>
                      {supplier.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[supplier.accountStatus]}`}>
                      {supplier.accountStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium text-gray-900">{supplier.products}</div>
                        <div className="text-xs">Products</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{supplier.rating}</div>
                        <div className="text-xs">Rating</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{supplier.revenue}</div>
                        <div className="text-xs">Revenue</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {supplier.verificationStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedSupplier(supplier);
                              setShowVerificationModal(true);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleVerify(supplier.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {supplier.accountStatus === 'active' ? (
                        <button
                          onClick={() => handleSuspend(supplier.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(supplier.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <UserCheck className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Details Modal */}
      {showDetails && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Supplier Details</h2>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedSupplier(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Company Name:</span>
                      <p className="font-medium">{selectedSupplier.companyName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Contact Person:</span>
                      <p className="font-medium">{selectedSupplier.contactPerson}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{selectedSupplier.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="font-medium">{selectedSupplier.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Category:</span>
                      <p className="font-medium">{selectedSupplier.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Registration Date:</span>
                      <p className="font-medium">{selectedSupplier.registrationDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Verification Status:</span>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verificationColors[selectedSupplier.verificationStatus]}`}>
                          {selectedSupplier.verificationStatus}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Account Status:</span>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[selectedSupplier.accountStatus]}`}>
                          {selectedSupplier.accountStatus}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Subscription Tier:</span>
                      <p className="font-medium capitalize">{selectedSupplier.subscriptionTier}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Last Active:</span>
                      <p className="font-medium">{selectedSupplier.lastActive}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Violations:</span>
                      <p className="font-medium">{selectedSupplier.violations}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Products</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedSupplier.products}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedSupplier.totalOrders}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedSupplier.revenue}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedSupplier.rating}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.documents.map((doc: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {doc.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {selectedSupplier.verificationStatus === 'pending' && (
                  <>
                    <button
                      onClick={() => handleVerify(selectedSupplier.id, 'verified')}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                    >
                      Verify Supplier
                    </button>
                    <button
                      onClick={() => handleVerify(selectedSupplier.id, 'rejected')}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
                    >
                      Reject Application
                    </button>
                  </>
                )}
                {selectedSupplier.accountStatus === 'active' ? (
                  <button
                    onClick={() => handleSuspend(selectedSupplier.id)}
                    className="flex-1 px-6 py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition"
                  >
                    Suspend Account
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(selectedSupplier.id)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                  >
                    Activate Account
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedSupplier(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Verify Supplier</h3>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedSupplier.companyName}</h4>
                <p className="text-sm text-gray-600">Contact: {selectedSupplier.contactPerson}</p>
                <p className="text-sm text-gray-600">Email: {selectedSupplier.email}</p>
                <p className="text-sm text-gray-600">Category: {selectedSupplier.category}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Submitted Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.documents.map((doc: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {doc.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  Please review all submitted documents before verification. Once verified, the supplier will be able to list products and receive orders.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleVerify(selectedSupplier.id, 'verified')}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Approve Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CommissionSettingsTab() {
  const [tourismCommission, setTourismCommission] = useState(10);
  const [tradeCommission, setTradeCommission] = useState(10);
  const [activeSection, setActiveSection] = useState<'rates' | 'tracking'>('rates');
  const [filterType, setFilterType] = useState<'all' | 'tourism' | 'trade'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'refunded'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    { id: 'TXN001', type: 'tourism', partner: 'Adventure Tours Ltd', item: 'Safari Experience', amount: '$2,450', commission: 10, commissionAmount: '$245', status: 'paid', date: '2024-03-15', user: 'John Smith' },
    { id: 'TXN002', type: 'tourism', partner: 'Luxury Travel Agency', item: 'Beach Resort Package', amount: '$1,800', commission: 10, commissionAmount: '$180', status: 'pending', date: '2024-03-14', user: 'Sarah Johnson' },
    { id: 'TXN003', type: 'trade', supplier: 'Global Manufacturing Co', item: 'Electronics Bundle', amount: '$5,600', commission: 10, commissionAmount: '$560', status: 'paid', date: '2024-03-13', user: 'Mike Chen' },
    { id: 'TXN004', type: 'tourism', partner: 'Eco Wildlife Tours', item: 'Wildlife Safari', amount: '$3,200', commission: 10, commissionAmount: '$320', status: 'refunded', date: '2024-03-12', user: 'Emily Davis' },
    { id: 'TXN005', type: 'trade', supplier: 'Tech Components Inc', item: 'Tech Parts Shipment', amount: '$8,900', commission: 10, commissionAmount: '$890', status: 'pending', date: '2024-03-11', user: 'David Wilson' },
  ];

  const filteredTransactions = transactions.filter(txn => {
    const typeMatch = filterType === 'all' || txn.type === filterType;
    const statusMatch = filterStatus === 'all' || txn.status === filterStatus;
    const searchMatch = searchQuery === '' || 
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (txn.partner && txn.partner.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (txn.supplier && txn.supplier.toLowerCase().includes(searchQuery.toLowerCase())) ||
      txn.item.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && statusMatch && searchMatch;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    refunded: 'bg-red-100 text-red-700',
  };

  const typeColors = {
    tourism: 'bg-blue-100 text-blue-700',
    trade: 'bg-purple-100 text-purple-700',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commission Management</h1>
        <p className="text-gray-500">Configure rates and track commission transactions</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100 text-sm mb-2">Tourism Commission</p>
          <p className="text-4xl font-bold mb-1">$45,892</p>
          <p className="text-sm text-blue-100">From 1,247 bookings</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-green-100 text-sm mb-2">Trade Commission</p>
          <p className="text-4xl font-bold mb-1">$89,240</p>
          <p className="text-sm text-green-100">From 856 orders</p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-amber-100 text-sm mb-2">Pending Payouts</p>
          <p className="text-4xl font-bold mb-1">$12,450</p>
          <p className="text-sm text-amber-100">28 transactions</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Total Revenue</p>
          <p className="text-4xl font-bold mb-1">$135,132</p>
          <p className="text-sm text-purple-100">+18% vs last month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveSection('rates')}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeSection === 'rates'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Commission Rates
        </button>
        <button
          onClick={() => setActiveSection('tracking')}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeSection === 'tracking'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Transaction Tracking
        </button>
      </div>

      {activeSection === 'rates' && (
        <div>
          {/* Tourism Rate */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-6">Tourism Commission Rate</h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-700">Commission Percentage</label>
                <span className="text-3xl font-bold text-blue-600">{tourismCommission}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={tourismCommission}
                onChange={(e) => setTourismCommission(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                Current rate: <strong>{tourismCommission}%</strong> from confirmed bookings
              </p>
            </div>
          </div>

          {/* Trade Rate */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-6">Trade Commission Rate</h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-700">Commission Percentage</label>
                <span className="text-3xl font-bold text-green-600">{tradeCommission}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={tradeCommission}
                onChange={(e) => setTradeCommission(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                Current rate: <strong>{tradeCommission}%</strong> of consignment value
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeSection === 'tracking' && (
        <div>
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by transaction ID, partner, supplier, or item..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Types</option>
                <option value="tourism">Tourism</option>
                <option value="trade">Trade</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-bold text-lg">Commission Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner/Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[txn.type]}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.partner || txn.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.item}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{txn.commissionAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[txn.status as keyof typeof statusColors]}`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PartnerSettingsTab() {
  const [partnerSettings, setPartnerSettings] = useState({
    // Registration Settings
    autoApprovePartners: false,
    requireBusinessLicense: true,
    requireTourismPermit: true,
    requireInsurance: false,
    requireSafetyCert: false,
    minRatingThreshold: 3.5,
    
    // Commission Settings
    commissionRate: 12,
    featuredTourFee: 25,
    premiumListingFee: 50,
    
    // Tour Settings
    maxToursPerPartner: 50,
    requireTourApproval: true,
    allowInstantBooking: false,
    maxGroupSize: 30,
    minGroupSize: 2,
    
    // Payment Settings
    paymentSchedule: 'monthly',
    holdPaymentDays: 7,
    autoPayoutEnabled: false,
    minPayoutAmount: 100,
    
    // Communication Settings
    enablePartnerNotifications: true,
    enableBookingAlerts: true,
    enableReviewNotifications: true,
    enablePaymentAlerts: true,
    
    // Verification Settings
    documentExpiryDays: 365,
    autoRenewalReminders: true,
    verificationReminderDays: 30,
    
    // Display Settings
    showPartnerContactInfo: true,
    showPartnerStats: true,
    enablePartnerRatings: true,
    allowPartnerResponses: true
  });

  const [activeSection, setActiveSection] = useState('registration');

  const sections = [
    { id: 'registration', label: 'Registration', icon: Plus },
    { id: 'commission', label: 'Commission', icon: DollarSign },
    { id: 'tours', label: 'Tour Management', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'communication', label: 'Communication', icon: Activity },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'display', label: 'Display', icon: Eye }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setPartnerSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Settings</h1>
        <p className="text-gray-500">Configure partner account management and platform policies</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-2xl shadow-sm p-4">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <section.icon className="w-5 h-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === 'registration' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Registration Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto-approve Partners</label>
                    <p className="text-sm text-gray-500">Automatically approve new partner registrations</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoApprovePartners', !partnerSettings.autoApprovePartners)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.autoApprovePartners ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.autoApprovePartners ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Business License</label>
                    <p className="text-sm text-gray-500">Business license mandatory for registration</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireBusinessLicense', !partnerSettings.requireBusinessLicense)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.requireBusinessLicense ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.requireBusinessLicense ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Tourism Permit</label>
                    <p className="text-sm text-gray-500">Tourism permit required for operation</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireTourismPermit', !partnerSettings.requireTourismPermit)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.requireTourismPermit ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.requireTourismPermit ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Minimum Rating Threshold</label>
                  <p className="text-sm text-gray-500 mb-3">Minimum rating required for featured tours</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={partnerSettings.minRatingThreshold}
                      onChange={(e) => handleSettingChange('minRatingThreshold', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{partnerSettings.minRatingThreshold}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'commission' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Commission Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Commission Rate</label>
                  <p className="text-sm text-gray-500 mb-3">Percentage charged on each booking</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="25"
                      value={partnerSettings.commissionRate}
                      onChange={(e) => handleSettingChange('commissionRate', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{partnerSettings.commissionRate}%</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Featured Tour Fee</label>
                  <p className="text-sm text-gray-500 mb-3">Monthly fee for featured tour placement</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={partnerSettings.featuredTourFee}
                      onChange={(e) => handleSettingChange('featuredTourFee', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">${partnerSettings.featuredTourFee}</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Premium Listing Fee</label>
                  <p className="text-sm text-gray-500 mb-3">Monthly fee for premium listing placement</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="25"
                      max="200"
                      step="10"
                      value={partnerSettings.premiumListingFee}
                      onChange={(e) => handleSettingChange('premiumListingFee', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">${partnerSettings.premiumListingFee}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'tours' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Tour Management Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Maximum Tours per Partner</label>
                  <p className="text-sm text-gray-500 mb-3">Maximum number of tours a partner can list</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={partnerSettings.maxToursPerPartner}
                      onChange={(e) => handleSettingChange('maxToursPerPartner', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{partnerSettings.maxToursPerPartner}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Tour Approval</label>
                    <p className="text-sm text-gray-500">All tours must be approved before publishing</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireTourApproval', !partnerSettings.requireTourApproval)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.requireTourApproval ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.requireTourApproval ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Allow Instant Booking</label>
                    <p className="text-sm text-gray-500">Customers can book tours instantly without approval</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('allowInstantBooking', !partnerSettings.allowInstantBooking)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.allowInstantBooking ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.allowInstantBooking ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="font-medium text-gray-900">Maximum Group Size</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={partnerSettings.maxGroupSize}
                      onChange={(e) => handleSettingChange('maxGroupSize', parseInt(e.target.value))}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-900">Minimum Group Size</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={partnerSettings.minGroupSize}
                      onChange={(e) => handleSettingChange('minGroupSize', parseInt(e.target.value))}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Payment Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Payment Schedule</label>
                  <p className="text-sm text-gray-500 mb-3">How often partners receive payments</p>
                  <select
                    value={partnerSettings.paymentSchedule}
                    onChange={(e) => handleSettingChange('paymentSchedule', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Payment Hold Days</label>
                  <p className="text-sm text-gray-500 mb-3">Days to hold payments before processing</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={partnerSettings.holdPaymentDays}
                      onChange={(e) => handleSettingChange('holdPaymentDays', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{partnerSettings.holdPaymentDays} days</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Minimum Payout Amount</label>
                  <p className="text-sm text-gray-500 mb-3">Minimum amount required for payout</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={partnerSettings.minPayoutAmount}
                      onChange={(e) => handleSettingChange('minPayoutAmount', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">${partnerSettings.minPayoutAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto Payout Enabled</label>
                    <p className="text-sm text-gray-500">Automatically process eligible payouts</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoPayoutEnabled', !partnerSettings.autoPayoutEnabled)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.autoPayoutEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.autoPayoutEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'communication' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Communication Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Partner Notifications</label>
                    <p className="text-sm text-gray-500">Send general platform notifications to partners</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enablePartnerNotifications', !partnerSettings.enablePartnerNotifications)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.enablePartnerNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.enablePartnerNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Booking Alerts</label>
                    <p className="text-sm text-gray-500">Notify partners of new bookings</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableBookingAlerts', !partnerSettings.enableBookingAlerts)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.enableBookingAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.enableBookingAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Review Notifications</label>
                    <p className="text-sm text-gray-500">Notify partners of new reviews</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableReviewNotifications', !partnerSettings.enableReviewNotifications)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.enableReviewNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.enableReviewNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Payment Alerts</label>
                    <p className="text-sm text-gray-500">Notify partners of payment processing</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enablePaymentAlerts', !partnerSettings.enablePaymentAlerts)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.enablePaymentAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.enablePaymentAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'verification' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Verification Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Document Expiry Days</label>
                  <p className="text-sm text-gray-500 mb-3">Days before documents expire</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="180"
                      max="730"
                      step="30"
                      value={partnerSettings.documentExpiryDays}
                      onChange={(e) => handleSettingChange('documentExpiryDays', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">{partnerSettings.documentExpiryDays} days</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Verification Reminder Days</label>
                  <p className="text-sm text-gray-500 mb-3">Days before expiry to send reminder</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="7"
                      max="90"
                      step="7"
                      value={partnerSettings.verificationReminderDays}
                      onChange={(e) => handleSettingChange('verificationReminderDays', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">{partnerSettings.verificationReminderDays} days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto Renewal Reminders</label>
                    <p className="text-sm text-gray-500">Automatically send renewal reminders</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoRenewalReminders', !partnerSettings.autoRenewalReminders)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.autoRenewalReminders ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.autoRenewalReminders ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'display' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Display Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Show Partner Contact Info</label>
                    <p className="text-sm text-gray-500">Display contact information on public profiles</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('showPartnerContactInfo', !partnerSettings.showPartnerContactInfo)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.showPartnerContactInfo ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.showPartnerContactInfo ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Show Partner Stats</label>
                    <p className="text-sm text-gray-500">Display performance statistics on profiles</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('showPartnerStats', !partnerSettings.showPartnerStats)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.showPartnerStats ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.showPartnerStats ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Enable Partner Ratings</label>
                    <p className="text-sm text-gray-500">Allow customers to rate partners</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enablePartnerRatings', !partnerSettings.enablePartnerRatings)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.enablePartnerRatings ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.enablePartnerRatings ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Allow Partner Responses</label>
                    <p className="text-sm text-gray-500">Allow partners to respond to reviews</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('allowPartnerResponses', !partnerSettings.allowPartnerResponses)}
                    className={`w-12 h-6 rounded-full transition ${
                      partnerSettings.allowPartnerResponses ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      partnerSettings.allowPartnerResponses ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupplierSettingsTab() {
  const [supplierSettings, setSupplierSettings] = useState({
    // Registration Settings
    autoApproveSuppliers: false,
    requireBusinessLicense: true,
    requireTaxCertificate: true,
    requireQualityCert: false,
    requireInsurance: false,
    minOrderValue: 100,
    
    // Commission Settings
    commissionRate: 10,
    consignmentFee: 5,
    storageFeePerItem: 2,
    
    // Product Settings
    maxProductsPerSupplier: 200,
    requireProductApproval: true,
    allowDropshipping: true,
    maxProductImages: 10,
    
    // Payment Settings
    paymentSchedule: 'biweekly',
    holdPaymentDays: 14,
    autoPayoutEnabled: false,
    minPayoutAmount: 250,
    
    // Communication Settings
    enableSupplierNotifications: true,
    enableOrderAlerts: true,
    enableInventoryAlerts: true,
    enablePaymentAlerts: true,
    
    // Verification Settings
    documentExpiryDays: 365,
    autoRenewalReminders: true,
    verificationReminderDays: 30,
    
    // Display Settings
    showSupplierContactInfo: true,
    showSupplierStats: true,
    enableSupplierRatings: true,
    allowSupplierResponses: true,
    
    // Inventory Settings
    lowStockThreshold: 10,
    outOfStockAlert: true,
    autoRestockReminders: false
  });

  const [activeSection, setActiveSection] = useState('registration');

  const sections = [
    { id: 'registration', label: 'Registration', icon: Plus },
    { id: 'commission', label: 'Commission', icon: DollarSign },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'communication', label: 'Communication', icon: Activity },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'display', label: 'Display', icon: Eye },
    { id: 'inventory', label: 'Inventory', icon: Package }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSupplierSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Settings</h1>
        <p className="text-gray-500">Configure supplier account management and platform policies</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-2xl shadow-sm p-4">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <section.icon className="w-5 h-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === 'registration' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Registration Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto-approve Suppliers</label>
                    <p className="text-sm text-gray-500">Automatically approve new supplier registrations</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoApproveSuppliers', !supplierSettings.autoApproveSuppliers)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.autoApproveSuppliers ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.autoApproveSuppliers ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Business License</label>
                    <p className="text-sm text-gray-500">Business license mandatory for registration</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireBusinessLicense', !supplierSettings.requireBusinessLicense)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.requireBusinessLicense ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.requireBusinessLicense ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Tax Certificate</label>
                    <p className="text-sm text-gray-500">Tax certificate required for compliance</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireTaxCertificate', !supplierSettings.requireTaxCertificate)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.requireTaxCertificate ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.requireTaxCertificate ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Minimum Order Value</label>
                  <p className="text-sm text-gray-500 mb-3">Minimum order value for suppliers</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={supplierSettings.minOrderValue}
                      onChange={(e) => handleSettingChange('minOrderValue', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">${supplierSettings.minOrderValue}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'commission' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Commission Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Commission Rate</label>
                  <p className="text-sm text-gray-500 mb-3">Percentage charged on each sale</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={supplierSettings.commissionRate}
                      onChange={(e) => handleSettingChange('commissionRate', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{supplierSettings.commissionRate}%</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Consignment Fee</label>
                  <p className="text-sm text-gray-500 mb-3">Fee for consignment arrangements</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={supplierSettings.consignmentFee}
                      onChange={(e) => handleSettingChange('consignmentFee', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{supplierSettings.consignmentFee}%</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Storage Fee per Item</label>
                  <p className="text-sm text-gray-500 mb-3">Monthly storage fee per item</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={supplierSettings.storageFeePerItem}
                      onChange={(e) => handleSettingChange('storageFeePerItem', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">${supplierSettings.storageFeePerItem}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Product Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Maximum Products per Supplier</label>
                  <p className="text-sm text-gray-500 mb-3">Maximum number of products a supplier can list</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="25"
                      value={supplierSettings.maxProductsPerSupplier}
                      onChange={(e) => handleSettingChange('maxProductsPerSupplier', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{supplierSettings.maxProductsPerSupplier}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Product Approval</label>
                    <p className="text-sm text-gray-500">All products must be approved before listing</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireProductApproval', !supplierSettings.requireProductApproval)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.requireProductApproval ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.requireProductApproval ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Allow Dropshipping</label>
                    <p className="text-sm text-gray-500">Allow suppliers to use dropshipping model</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('allowDropshipping', !supplierSettings.allowDropshipping)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.allowDropshipping ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.allowDropshipping ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Maximum Product Images</label>
                  <p className="text-sm text-gray-500 mb-3">Maximum number of images per product</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="3"
                      max="20"
                      value={supplierSettings.maxProductImages}
                      onChange={(e) => handleSettingChange('maxProductImages', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{supplierSettings.maxProductImages}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Payment Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Payment Schedule</label>
                  <p className="text-sm text-gray-500 mb-3">How often suppliers receive payments</p>
                  <select
                    value={supplierSettings.paymentSchedule}
                    onChange={(e) => handleSettingChange('paymentSchedule', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Payment Hold Days</label>
                  <p className="text-sm text-gray-500 mb-3">Days to hold payments before processing</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={supplierSettings.holdPaymentDays}
                      onChange={(e) => handleSettingChange('holdPaymentDays', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{supplierSettings.holdPaymentDays} days</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Minimum Payout Amount</label>
                  <p className="text-sm text-gray-500 mb-3">Minimum amount required for payout</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={supplierSettings.minPayoutAmount}
                      onChange={(e) => handleSettingChange('minPayoutAmount', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">${supplierSettings.minPayoutAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto Payout Enabled</label>
                    <p className="text-sm text-gray-500">Automatically process eligible payouts</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoPayoutEnabled', !supplierSettings.autoPayoutEnabled)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.autoPayoutEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.autoPayoutEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'communication' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Communication Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Supplier Notifications</label>
                    <p className="text-sm text-gray-500">Send general platform notifications to suppliers</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableSupplierNotifications', !supplierSettings.enableSupplierNotifications)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.enableSupplierNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.enableSupplierNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Order Alerts</label>
                    <p className="text-sm text-gray-500">Notify suppliers of new orders</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableOrderAlerts', !supplierSettings.enableOrderAlerts)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.enableOrderAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.enableOrderAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Inventory Alerts</label>
                    <p className="text-sm text-gray-500">Notify suppliers of low inventory</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableInventoryAlerts', !supplierSettings.enableInventoryAlerts)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.enableInventoryAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.enableInventoryAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Payment Alerts</label>
                    <p className="text-sm text-gray-500">Notify suppliers of payment processing</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enablePaymentAlerts', !supplierSettings.enablePaymentAlerts)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.enablePaymentAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.enablePaymentAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'verification' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Verification Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Document Expiry Days</label>
                  <p className="text-sm text-gray-500 mb-3">Days before documents expire</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="180"
                      max="730"
                      step="30"
                      value={supplierSettings.documentExpiryDays}
                      onChange={(e) => handleSettingChange('documentExpiryDays', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">{supplierSettings.documentExpiryDays} days</span>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-900">Verification Reminder Days</label>
                  <p className="text-sm text-gray-500 mb-3">Days before expiry to send reminder</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="7"
                      max="90"
                      step="7"
                      value={supplierSettings.verificationReminderDays}
                      onChange={(e) => handleSettingChange('verificationReminderDays', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-20 text-center font-medium">{supplierSettings.verificationReminderDays} days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto Renewal Reminders</label>
                    <p className="text-sm text-gray-500">Automatically send renewal reminders</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoRenewalReminders', !supplierSettings.autoRenewalReminders)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.autoRenewalReminders ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.autoRenewalReminders ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'display' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Display Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Show Supplier Contact Info</label>
                    <p className="text-sm text-gray-500">Display contact information on public profiles</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('showSupplierContactInfo', !supplierSettings.showSupplierContactInfo)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.showSupplierContactInfo ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.showSupplierContactInfo ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Show Supplier Stats</label>
                    <p className="text-sm text-gray-500">Display performance statistics on profiles</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('showSupplierStats', !supplierSettings.showSupplierStats)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.showSupplierStats ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.showSupplierStats ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Enable Supplier Ratings</label>
                    <p className="text-sm text-gray-500">Allow customers to rate suppliers</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableSupplierRatings', !supplierSettings.enableSupplierRatings)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.enableSupplierRatings ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.enableSupplierRatings ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Allow Supplier Responses</label>
                    <p className="text-sm text-gray-500">Allow suppliers to respond to reviews</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('allowSupplierResponses', !supplierSettings.allowSupplierResponses)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.allowSupplierResponses ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.allowSupplierResponses ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'inventory' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Inventory Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900">Low Stock Threshold</label>
                  <p className="text-sm text-gray-500 mb-3">Alert when stock falls below this level</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={supplierSettings.lowStockThreshold}
                      onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">{supplierSettings.lowStockThreshold}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Out of Stock Alert</label>
                    <p className="text-sm text-gray-500">Send alerts when items go out of stock</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('outOfStockAlert', !supplierSettings.outOfStockAlert)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.outOfStockAlert ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.outOfStockAlert ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto Restock Reminders</label>
                    <p className="text-sm text-gray-500">Automatically send restock reminders</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoRestockReminders', !supplierSettings.autoRestockReminders)}
                    className={`w-12 h-6 rounded-full transition ${
                      supplierSettings.autoRestockReminders ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                      supplierSettings.autoRestockReminders ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsoredAdsTab() {
  const [ads, setAds] = useState([
    {
      id: 'AD001',
      title: 'Luxury Safari Experience',
      advertiser: 'Adventure Tours Ltd',
      category: 'tourism',
      status: 'active',
      policyStatus: 'compliant',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      budget: '$5,000',
      impressions: 245000,
      clicks: 12750,
      ctr: 5.2,
      dynamicRate: 9.99,
      content: 'Experience the ultimate African safari with luxury accommodations and expert guides.',
      imageUrl: '/api/placeholder/300/200',
      violations: [],
    },
    {
      id: 'AD002',
      title: 'Fast Shipping Solutions',
      advertiser: 'Global Trade Co',
      category: 'trade',
      status: 'pending',
      policyStatus: 'review',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      budget: '$3,500',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      dynamicRate: 7.99,
      content: 'Get your goods delivered anywhere in the world within 48 hours. Guaranteed fast shipping!',
      imageUrl: '/api/placeholder/300/200',
      violations: ['unrealistic claims', 'guarantee language'],
    },
    {
      id: 'AD003',
      title: 'Handmade Crafts Store',
      advertiser: 'Local Artisans',
      category: 'trade',
      status: 'active',
      policyStatus: 'compliant',
      startDate: '2024-02-15',
      endDate: '2024-04-15',
      budget: '$2,000',
      impressions: 89500,
      clicks: 3580,
      ctr: 4.0,
      dynamicRate: 8.49,
      content: 'Unique handmade crafts from local artisans. Support local communities.',
      imageUrl: '/api/placeholder/300/200',
      violations: [],
    },
    {
      id: 'AD004',
      title: 'Investment Opportunity - High Returns',
      advertiser: 'Quick Investments',
      category: 'financial',
      status: 'rejected',
      policyStatus: 'violated',
      startDate: '2024-03-10',
      endDate: '2024-06-10',
      budget: '$10,000',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      dynamicRate: 7.99,
      content: 'Get 50% returns in 30 days. Guaranteed investment success. No risk involved.',
      imageUrl: '/api/placeholder/300/200',
      violations: ['financial claims', 'guaranteed returns', 'misleading information'],
    },
  ]);

  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPolicy, setFilterPolicy] = useState('all');
  const [campaignFee, setCampaignFee] = useState(7.99);
  const [showFeeEditModal, setShowFeeEditModal] = useState(false);
  const [tempFee, setTempFee] = useState(campaignFee);
  const [pricingMode, setPricingMode] = useState<'fixed' | 'dynamic'>('dynamic');
  const [showPricingOptimization, setShowPricingOptimization] = useState(false);

  const handleApprove = (adId: string) => {
    setAds(prev => 
      prev.map(ad => 
        ad.id === adId 
          ? { ...ad, status: 'active', policyStatus: 'compliant', violations: [] }
          : ad
      )
    );
  };

  const handleReject = (adId: string) => {
    setAds(prev => 
      prev.map(ad => 
        ad.id === adId 
          ? { ...ad, status: 'rejected', policyStatus: 'violated' }
          : ad
      )
    );
  };

  const handleStop = (adId: string) => {
    setAds(prev => 
      prev.map(ad => 
        ad.id === adId 
          ? { ...ad, status: 'stopped' }
          : ad
      )
    );
  };

  const handleDelete = (adId: string) => {
    setAds(prev => prev.filter(ad => ad.id !== adId));
    setShowDetails(false);
    setSelectedAd(null);
  };

  const handleReview = (adId: string) => {
    setAds(prev => 
      prev.map(ad => 
        ad.id === adId 
          ? { ...ad, status: 'pending', policyStatus: 'review' }
          : ad
      )
    );
  };

  const handleUpdateFee = () => {
    if (tempFee > 0 && tempFee <= 1000) {
      setCampaignFee(tempFee);
      setShowFeeEditModal(false);
      // In a real app, this would update the backend
      console.log('Campaign fee updated to $', tempFee, 'per day');
    }
  };

  const handleOpenFeeEdit = () => {
    setTempFee(campaignFee);
    setShowFeeEditModal(true);
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
    stopped: 'bg-gray-100 text-gray-700',
  };

  const policyColors = {
    compliant: 'bg-green-100 text-green-700',
    review: 'bg-orange-100 text-orange-700',
    violated: 'bg-red-100 text-red-700',
  };

  const filteredAds = ads.filter(ad => {
    const statusMatch = filterStatus === 'all' || ad.status === filterStatus;
    const policyMatch = filterPolicy === 'all' || ad.policyStatus === filterPolicy;
    return statusMatch && policyMatch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sponsored Ads Management</h1>
          <p className="text-gray-500">Review, approve, and manage sponsored advertisements</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Ad Campaign
          </button>
        </div>
      </div>

      {/* Ad Statistics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100 text-sm mb-2">Total Campaigns</p>
          <p className="text-3xl font-bold">{ads.length}</p>
          <p className="text-sm text-blue-100 mt-1">This month</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-green-100 text-sm mb-2">Active Campaigns</p>
          <p className="text-3xl font-bold">{ads.filter(ad => ad.status === 'active').length}</p>
          <p className="text-sm text-green-100 mt-1">Running now</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-yellow-100 text-sm mb-2">Pending Review</p>
          <p className="text-3xl font-bold">{ads.filter(ad => ad.status === 'pending').length}</p>
          <p className="text-sm text-yellow-100 mt-1">Need approval</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Policy Violations</p>
          <p className="text-3xl font-bold">{ads.filter(ad => ad.policyStatus === 'violated').length}</p>
          <p className="text-sm text-purple-100 mt-1">Need attention</p>
        </div>
      </div>

      {/* Pricing Mode & Campaign Fee Management */}
      <div className="bg-gray-700 rounded-2xl p-6 shadow-lg text-white mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Pricing Strategy</h2>
            <p className="text-gray-300">Choose between fixed or dynamic pricing based on engagement</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPricingMode('fixed')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                pricingMode === 'fixed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Fixed Pricing
            </button>
            <button
              onClick={() => setPricingMode('dynamic')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                pricingMode === 'dynamic'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Dynamic Pricing
            </button>
          </div>
        </div>

        {pricingMode === 'fixed' ? (
          <div>
            <div className="flex items-center justify-between">
              <div className="text-right">
                <div className="text-4xl font-bold mb-1">${campaignFee.toFixed(2)}</div>
                <div className="text-gray-300 text-sm">per day</div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-600 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300">Active Revenue</span>
                  <div className="text-xl font-bold">
                    ${(campaignFee * ads.filter(ad => ad.status === 'active').length * 30).toFixed(2)}
                    <span className="text-sm text-gray-300 font-normal">/month est.</span>
                  </div>
                </div>
                <div className="bg-gray-600 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300">Total Campaigns</span>
                  <div className="text-xl font-bold">{ads.filter(ad => ad.status === 'active').length}</div>
                </div>
              </div>
              <button
                onClick={handleOpenFeeEdit}
                className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-orange-400"
              >
                <Edit className="w-5 h-5" />
                Update Fee
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {ads.filter(ad => ad.status === 'active').map(ad => (
                <div key={ad.id} className="bg-gray-600 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">{ad.title.substring(0, 20)}...</span>
                    <span className="text-green-400 text-xs font-bold">↑ {((ad.dynamicRate / campaignFee - 1) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-2xl font-bold">${ad.dynamicRate.toFixed(2)}/day</div>
                  <div className="text-xs text-gray-400 mt-1">CTR: {ad.ctr}%</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-600 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300">Dynamic Revenue</span>
                  <div className="text-xl font-bold">
                    ${(ads.filter(ad => ad.status === 'active').reduce((sum, ad) => sum + ad.dynamicRate, 0) * 30).toFixed(2)}
                    <span className="text-sm text-gray-300 font-normal">/month est.</span>
                  </div>
                </div>
                <div className="bg-gray-600 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300">Avg. Premium</span>
                  <div className="text-xl font-bold text-green-400">
                    +{(ads.filter(ad => ad.status === 'active').reduce((sum, ad) => sum + (ad.dynamicRate / campaignFee - 1) * 100, 0) / Math.max(1, ads.filter(ad => ad.status === 'active').length)).toFixed(0)}%
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPricingOptimization(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Optimize Pricing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Campaign Filters</h2>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="stopped">Stopped</option>
            </select>
            <select
              value={filterPolicy}
              onChange={(e) => setFilterPolicy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Policy Status</option>
              <option value="compliant">Compliant</option>
              <option value="review">Under Review</option>
              <option value="violated">Violations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ads List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-lg">Advertisement Campaigns</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advertiser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                {pricingMode === 'dynamic' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Dynamic Rate</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ad.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ad.title}</p>
                      <p className="text-xs text-gray-500">Budget: {ad.budget}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ad.advertiser}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ad.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[ad.status as keyof typeof statusColors]}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${policyColors[ad.policyStatus as keyof typeof policyColors]}`}>
                      {ad.policyStatus}
                    </span>
                    {ad.violations.length > 0 && (
                      <p className="text-xs text-red-600 mt-1">{ad.violations.length} violations</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <p>{ad.impressions.toLocaleString()} impressions</p>
                      <p className="text-xs text-gray-500">CTR: {ad.ctr}%</p>
                    </div>
                  </td>
                  {pricingMode === 'dynamic' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="text-right">
                        <p className="font-bold text-purple-600">${ad.dynamicRate.toFixed(2)}/day</p>
                        <p className="text-xs text-gray-500">
                          {ad.dynamicRate > campaignFee ? '+' : ''}{((ad.dynamicRate / campaignFee - 1) * 100).toFixed(0)}% vs base
                        </p>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedAd(ad);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 transition"
                      >
                        View
                      </button>
                      {ad.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(ad.id)}
                            className="text-green-600 hover:text-green-900 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(ad.id)}
                            className="text-red-600 hover:text-red-900 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {ad.status === 'active' && (
                        <button
                          onClick={() => handleStop(ad.id)}
                          className="text-orange-600 hover:text-orange-900 transition"
                        >
                          Stop
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="text-red-600 hover:text-red-900 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ad Details Modal */}
      {selectedAd && showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
                  <p className="text-gray-500 mt-1">{selectedAd.id} - {selectedAd.title}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedAd(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Campaign Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Campaign Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Advertiser</span>
                        <span className="font-medium">{selectedAd.advertiser}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="font-medium">{selectedAd.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Budget</span>
                        <span className="font-medium">{selectedAd.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Start Date</span>
                        <span className="font-medium">{selectedAd.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">End Date</span>
                        <span className="font-medium">{selectedAd.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Impressions</span>
                        <span className="font-medium">{selectedAd.impressions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Clicks</span>
                        <span className="font-medium">{selectedAd.clicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Click-Through Rate</span>
                        <span className="font-medium">{selectedAd.ctr}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Ad Content & Policy */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Ad Content</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <p className="text-gray-400">Ad Image</p>
                      </div>
                      <p className="text-sm text-gray-700">{selectedAd.content}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Policy Compliance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${policyColors[selectedAd.policyStatus as keyof typeof policyColors]}`}>
                          {selectedAd.policyStatus}
                        </span>
                      </div>
                      {selectedAd.violations.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Policy Violations:</p>
                          <div className="space-y-1">
                            {selectedAd.violations.map((violation: string, index: number) => (
                              <div key={index} className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-600">{violation}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedAd.policyStatus === 'compliant' && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">No policy violations detected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                {selectedAd.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedAd.id)}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                    >
                      Approve Campaign
                    </button>
                    <button
                      onClick={() => handleReject(selectedAd.id)}
                      className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
                    >
                      Reject Campaign
                    </button>
                  </>
                )}
                {selectedAd.status === 'active' && (
                  <button
                    onClick={() => handleStop(selectedAd.id)}
                    className="px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
                  >
                    Stop Campaign
                  </button>
                )}
                {selectedAd.status === 'rejected' && (
                  <button
                    onClick={() => handleReview(selectedAd.id)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                  >
                    Review Again
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedAd.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
                >
                  Delete Campaign
                </button>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedAd(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee Edit Modal */}
      {showFeeEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Update Campaign Fee</h3>
              <button
                onClick={() => setShowFeeEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Campaign Rate ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={tempFee}
                  onChange={(e) => setTempFee(parseFloat(e.target.value) || 0)}
                  min="0.01"
                  max="1000"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="7.99"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Set the daily rate for sponsored ad campaigns. Current: ${campaignFee.toFixed(2)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Revenue Impact Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current monthly revenue:</span>
                  <span className="font-medium">${(campaignFee * ads.filter(ad => ad.status === 'active').length * 30).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New monthly revenue:</span>
                  <span className="font-medium text-green-600">${(tempFee * ads.filter(ad => ad.status === 'active').length * 30).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Monthly difference:</span>
                  <span className={`font-bold ${tempFee > campaignFee ? 'text-green-600' : 'text-red-600'}`}>
                    {tempFee > campaignFee ? '+' : ''}${((tempFee - campaignFee) * ads.filter(ad => ad.status === 'active').length * 30).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFeeEditModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateFee}
                disabled={tempFee <= 0 || tempFee > 1000}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Fee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Optimization Modal */}
      {showPricingOptimization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Dynamic Pricing Optimization</h3>
              <button
                onClick={() => setShowPricingOptimization(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Pricing Algorithm Rules
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Base CTR Threshold</div>
                  <div className="text-2xl font-bold text-gray-900">3.0%</div>
                  <div className="text-xs text-gray-500 mt-1">Minimum CTR for base rate</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Max Premium</div>
                  <div className="text-2xl font-bold text-purple-600">+50%</div>
                  <div className="text-xs text-gray-500 mt-1">Maximum rate increase</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Premium per 1% CTR</div>
                  <div className="text-2xl font-bold text-green-600">+10%</div>
                  <div className="text-xs text-gray-500 mt-1">Rate increase per CTR point</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Update Frequency</div>
                  <div className="text-2xl font-bold text-blue-600">Daily</div>
                  <div className="text-xs text-gray-500 mt-1">How often rates update</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-lg mb-4">Campaign Rate Preview</h4>
              <div className="space-y-3">
                {ads.filter(ad => ad.status === 'active').map(ad => (
                  <div key={ad.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">{ad.title}</div>
                      <div className="text-sm text-gray-500">CTR: {ad.ctr}% | {ad.impressions.toLocaleString()} impressions</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">${ad.dynamicRate.toFixed(2)}/day</div>
                      <div className={`text-xs ${ad.dynamicRate > campaignFee ? 'text-green-600' : 'text-gray-500'}`}>
                        {ad.dynamicRate > campaignFee ? '+' : ''}{((ad.dynamicRate / campaignFee - 1) * 100).toFixed(0)}% vs base
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Revenue Impact</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Base Pricing (30 days)</div>
                  <div className="text-xl font-bold">
                    ${(campaignFee * ads.filter(ad => ad.status === 'active').length * 30).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Dynamic Pricing (30 days)</div>
                  <div className="text-xl font-bold text-green-600">
                    ${(ads.filter(ad => ad.status === 'active').reduce((sum, ad) => sum + ad.dynamicRate, 0) * 30).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Projected Lift</div>
                  <div className="text-xl font-bold text-purple-600">
                    +{(
                      ((ads.filter(ad => ad.status === 'active').reduce((sum, ad) => sum + ad.dynamicRate, 0) * 30) /
                      (campaignFee * ads.filter(ad => ad.status === 'active').length * 30) - 1) * 100
                    ).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPricingOptimization(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPricingOptimization(false);
                }}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Apply Optimization
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubscriptionPlansTab() {
  const [activeEntityType, setActiveEntityType] = useState<'partners' | 'suppliers'>('partners');
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const partnerPlans = [
    {
      id: 'plan-partner-basic',
      name: 'Basic',
      price: 29,
      pricePeriod: 'month',
      maxTours: 10,
      featuredTours: 0,
      prioritySupport: false,
      analytics: false,
      customBranding: false,
      apiAccess: false,
      description: 'Perfect for new partners starting out',
      activeSubscriptions: 89,
      popular: false,
    },
    {
      id: 'plan-partner-premium',
      name: 'Premium',
      price: 79,
      pricePeriod: 'month',
      maxTours: 50,
      featuredTours: 5,
      prioritySupport: true,
      analytics: true,
      customBranding: false,
      apiAccess: false,
      description: 'For growing businesses with more tours',
      activeSubscriptions: 47,
      popular: true,
    },
    {
      id: 'plan-partner-enterprise',
      name: 'Enterprise',
      price: 199,
      pricePeriod: 'month',
      maxTours: 200,
      featuredTours: 20,
      prioritySupport: true,
      analytics: true,
      customBranding: true,
      apiAccess: true,
      description: 'Complete solution for established operators',
      activeSubscriptions: 20,
      popular: false,
    },
  ];

  const supplierPlans = [
    {
      id: 'plan-supplier-basic',
      name: 'Basic',
      price: 49,
      pricePeriod: 'month',
      maxProducts: 50,
      featuredProducts: 0,
      prioritySupport: false,
      inventoryAnalytics: false,
      customBranding: false,
      apiAccess: false,
      description: 'Ideal for small suppliers',
      activeSubscriptions: 156,
      popular: false,
    },
    {
      id: 'plan-supplier-premium',
      name: 'Premium',
      price: 129,
      pricePeriod: 'month',
      maxProducts: 200,
      featuredProducts: 10,
      prioritySupport: true,
      inventoryAnalytics: true,
      customBranding: false,
      apiAccess: false,
      description: 'For growing trade businesses',
      activeSubscriptions: 98,
      popular: true,
    },
    {
      id: 'plan-supplier-enterprise',
      name: 'Enterprise',
      price: 299,
      pricePeriod: 'month',
      maxProducts: 1000,
      featuredProducts: 50,
      prioritySupport: true,
      inventoryAnalytics: true,
      customBranding: true,
      apiAccess: true,
      description: 'Complete solution for large suppliers',
      activeSubscriptions: 38,
      popular: false,
    },
  ];

  const currentPlans = activeEntityType === 'partners' ? partnerPlans : supplierPlans;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
          <p className="text-gray-500">Manage subscription tiers for partners and suppliers</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddPlanModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Plan
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100 text-sm mb-2">Partner Subscriptions</p>
          <p className="text-3xl font-bold">156</p>
          <p className="text-sm text-blue-100 mt-1">Active plans</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Supplier Subscriptions</p>
          <p className="text-3xl font-bold">292</p>
          <p className="text-sm text-purple-100 mt-1">Active plans</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-green-100 text-sm mb-2">Subscription Revenue</p>
          <p className="text-3xl font-bold">$32,450</p>
          <p className="text-sm text-green-100 mt-1">Monthly recurring</p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-amber-100 text-sm mb-2">Avg. Plan Value</p>
          <p className="text-3xl font-bold">$89</p>
          <p className="text-sm text-amber-100 mt-1">Per month</p>
        </div>
      </div>

      {/* Entity Type Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveEntityType('partners')}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeEntityType === 'partners'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Partner Plans
        </button>
        <button
          onClick={() => setActiveEntityType('suppliers')}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeEntityType === 'suppliers'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Supplier Plans
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-3 gap-8">
        {currentPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-sm overflow-hidden ${
              plan.popular ? 'ring-2 ring-purple-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-bold">
                MOST POPULAR
              </div>
            )}
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.pricePeriod}</span>
                </div>
                <p className="text-gray-500 mt-2 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                {(plan as any).maxTours && (
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Up to {(plan as any).maxTours} tours</span>
                  </div>
                )}
                {(plan as any).featuredTours !== undefined && (
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{(plan as any).featuredTours} featured tours</span>
                  </div>
                )}
                {(plan as any).maxProducts && (
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Up to {(plan as any).maxProducts} products</span>
                  </div>
                )}
                {(plan as any).featuredProducts !== undefined && (
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{(plan as any).featuredProducts} featured products</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {(plan as any).prioritySupport ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="text-gray-700">Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  {(plan as any).analytics || (plan as any).inventoryAnalytics ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="text-gray-700">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  {(plan as any).customBranding ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="text-gray-700">Custom branding</span>
                </div>
                <div className="flex items-center gap-3">
                  {(plan as any).apiAccess ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="text-gray-700">API access</span>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-1">{plan.activeSubscriptions}</div>
                <div className="text-sm text-gray-500">Active subscribers</div>
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition text-sm transform hover:scale-105 active:scale-95 duration-200 flex items-center justify-center gap-2"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setFormData({...plan});
                    setShowEditPlanModal(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition text-sm transform hover:scale-105 active:scale-95 duration-200 flex items-center justify-center gap-2">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {showEditPlanModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Plan</h2>
              <button 
                onClick={() => setShowEditPlanModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Period</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.pricePeriod}
                  onChange={(e) => setFormData({...formData, pricePeriod: e.target.value})}
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              {activeEntityType === 'partners' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Tours</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.maxTours}
                      onChange={(e) => setFormData({...formData, maxTours: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Tours</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.featuredTours}
                      onChange={(e) => setFormData({...formData, featuredTours: Number(e.target.value)})}
                    />
                  </div>
                </>
              )}
              {activeEntityType === 'suppliers' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Products</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.maxProducts}
                      onChange={(e) => setFormData({...formData, maxProducts: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Products</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.featuredProducts}
                      onChange={(e) => setFormData({...formData, featuredProducts: Number(e.target.value)})}
                    />
                  </div>
                </>
              )}
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="prioritySupport" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.prioritySupport}
                  onChange={(e) => setFormData({...formData, prioritySupport: e.target.checked})}
                />
                <label htmlFor="prioritySupport" className="ml-2 block text-sm text-gray-700">
                  Priority Support
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="customBranding" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.customBranding}
                  onChange={(e) => setFormData({...formData, customBranding: e.target.checked})}
                />
                <label htmlFor="customBranding" className="ml-2 block text-sm text-gray-700">
                  Custom Branding
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="apiAccess" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.apiAccess}
                  onChange={(e) => setFormData({...formData, apiAccess: e.target.checked})}
                />
                <label htmlFor="apiAccess" className="ml-2 block text-sm text-gray-700">
                  API Access
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="popular" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.popular}
                  onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                />
                <label htmlFor="popular" className="ml-2 block text-sm text-gray-700">
                  Mark as Popular
                </label>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setShowEditPlanModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, you would update the plan data
                  setShowEditPlanModal(false);
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AIConfigurationTab() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Configuration</h1>
      <p className="text-gray-500 mb-8">Configure AI personalization engine</p>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">AI Recommendations</p>
          <p className="text-3xl font-bold text-purple-600">89.4%</p>
          <p className="text-sm text-gray-500 mt-1">Accuracy rate</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Engagement Boost</p>
          <p className="text-3xl font-bold text-blue-600">+34%</p>
          <p className="text-sm text-gray-500 mt-1">With AI enabled</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Conversion Lift</p>
          <p className="text-3xl font-bold text-green-600">+28%</p>
          <p className="text-sm text-gray-500 mt-1">AI-driven sales</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Training Data</p>
          <p className="text-3xl font-bold text-gray-900">2.4M</p>
          <p className="text-sm text-gray-500 mt-1">Data points</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
        <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">AI personalization settings, recommendation weights, and model training</p>
      </div>
    </div>
  );
}

function DisputeManagementTab() {
  const [disputes, setDisputes] = useState([
    {
      id: 'DS001',
      title: 'Tour Package Quality Issue',
      user: 'John Smith',
      partner: 'Adventure Tours Ltd',
      status: 'investigating',
      priority: 'high',
      date: '2024-03-15',
      category: 'quality',
      amount: '$2,450',
      description: 'Client claims tour package did not match advertised quality',
      conversationId: 'CONV001',
      userCertified: false,
      partnerCertified: true,
    },
    {
      id: 'DS002',
      title: 'Payment Processing Error',
      user: 'Sarah Johnson',
      partner: 'Global Trade Co',
      status: 'pending',
      priority: 'medium',
      date: '2024-03-14',
      category: 'payment',
      amount: '$8,900',
      description: 'Duplicate payment charged for trade order',
      conversationId: 'CONV002',
      userCertified: true,
      partnerCertified: true,
    },
    {
      id: 'DS003',
      title: 'Service Not Delivered',
      user: 'Mike Chen',
      partner: 'Quick Logistics',
      status: 'resolved',
      priority: 'low',
      date: '2024-03-13',
      category: 'delivery',
      amount: '$1,200',
      description: 'Shipping service not provided as agreed',
      conversationId: 'CONV003',
      userCertified: true,
      partnerCertified: false,
    },
  ]);

  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [showConversation, setShowConversation] = useState(false);
  const [investigationNotes, setInvestigationNotes] = useState('');
  const [resolution, setResolution] = useState('');

  const handleInvestigate = (dispute: any) => {
    setSelectedDispute(dispute);
    setShowConversation(true);
  };

  const handleResolveDispute = (disputeId: string, resolution: string) => {
    setDisputes(prev => 
      prev.map(d => 
        d.id === disputeId 
          ? { ...d, status: 'resolved', resolution }
          : d
      )
    );
    setSelectedDispute(null);
    setResolution('');
    setInvestigationNotes('');
  };

  const handleEscalate = (disputeId: string) => {
    setDisputes(prev => 
      prev.map(d => 
        d.id === disputeId 
          ? { ...d, priority: 'critical' }
          : d
      )
    );
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    investigating: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700',
    escalated: 'bg-red-100 text-red-700',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-orange-100 text-orange-700',
    high: 'bg-red-100 text-red-700',
    critical: 'bg-purple-100 text-purple-700',
  };

  // Mock conversation data
  const mockConversations: { [key: string]: any[] } = {
    'CONV001': [
      {
        id: 1,
        sender: 'John Smith',
        type: 'user',
        message: 'Hi, I\'m interested in the Adventure Package tour. Can you provide more details?',
        timestamp: '2024-03-10 10:30 AM',
        certified: false,
      },
      {
        id: 2,
        sender: 'Adventure Tours Ltd',
        type: 'partner',
        message: 'Hello! Our Adventure Package includes 5-day guided tour with accommodation and meals. All guides are certified professionals.',
        timestamp: '2024-03-10 11:15 AM',
        certified: true,
      },
      {
        id: 3,
        sender: 'John Smith',
        type: 'user',
        message: 'That sounds great. How do I make the payment and what\'s the cancellation policy?',
        timestamp: '2024-03-10 11:30 AM',
        certified: false,
      },
      {
        id: 4,
        sender: 'Adventure Tours Ltd',
        type: 'partner',
        message: 'Payment can be made through the platform. We offer full refund if cancelled 48 hours before the tour.',
        timestamp: '2024-03-10 12:00 PM',
        certified: true,
      },
      {
        id: 5,
        sender: 'John Smith',
        type: 'user',
        message: 'I\'ve made the payment. Looking forward to the tour!',
        timestamp: '2024-03-10 02:30 PM',
        certified: false,
      },
      {
        id: 6,
        sender: 'John Smith',
        type: 'user',
        message: 'The tour was terrible! The guide was not professional, accommodation was poor quality, and meals were basic. This is not what was advertised!',
        timestamp: '2024-03-15 06:00 PM',
        certified: false,
      },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dispute Management</h1>
          <p className="text-gray-500">Investigate and resolve user disputes with comprehensive tools</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Dispute Statistics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <p className="text-sm mb-2 text-center" style={{ color: '#e57600' }}>Total Disputes</p>
          <p className="text-3xl font-bold text-center" style={{ color: '#e77900' }}>{disputes.length}</p>
          <p className="text-sm mt-1 text-center" style={{ color: '#e87a00' }}>This month</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <p className="text-blue-100 text-sm mb-2 text-center">Under Investigation</p>
          <p className="text-3xl font-bold text-center">{disputes.filter(d => d.status === 'investigating').length}</p>
          <p className="text-sm text-blue-100 mt-1 text-center">Active cases</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <p className="text-green-100 text-sm mb-2 text-center">Resolved</p>
          <p className="text-3xl font-bold text-center">{disputes.filter(d => d.status === 'resolved').length}</p>
          <p className="text-sm text-green-100 mt-1 text-center">This month</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <p className="text-purple-100 text-sm mb-2 text-center">Total Value</p>
          <p className="text-3xl font-bold text-center">$12,550</p>
          <p className="text-sm text-purple-100 mt-1 text-center">In dispute</p>
        </div>
      </div>

      {/* Dispute List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Active Disputes</h2>
            <div className="flex gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>All Status</option>
                <option>Pending</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispute ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {disputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dispute.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{dispute.title}</p>
                      <p className="text-xs text-gray-500">{dispute.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p className="text-gray-900">{dispute.user}</p>
                      <p className="text-gray-500">vs {dispute.partner}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispute.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[dispute.status as keyof typeof statusColors]}`}>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[dispute.priority as keyof typeof priorityColors]}`}>
                      {dispute.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInvestigate(dispute)}
                        className="text-blue-600 hover:text-blue-900 transition"
                      >
                        Investigate
                      </button>
                      <button
                        onClick={() => handleEscalate(dispute.id)}
                        className="text-orange-600 hover:text-orange-900 transition"
                      >
                        Escalate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigation Modal */}
      {selectedDispute && showConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dispute Investigation</h2>
                  <p className="text-gray-500 mt-1">{selectedDispute.id} - {selectedDispute.title}</p>
                </div>
                <button
                  onClick={() => {
                    setShowConversation(false);
                    setSelectedDispute(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(90vh-200px)]">
              {/* Left Panel - Case Details */}
              <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Case Information */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">Case Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Dispute ID</span>
                        <span className="font-medium">{selectedDispute.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="font-medium">{selectedDispute.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="font-medium">{selectedDispute.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Date Filed</span>
                        <span className="font-medium">{selectedDispute.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Parties Involved */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">Parties Involved</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">User</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedDispute.userCertified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {selectedDispute.userCertified ? 'Certified' : 'Not Certified'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedDispute.user}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Partner</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedDispute.partnerCertified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {selectedDispute.partnerCertified ? 'Certified' : 'Not Certified'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedDispute.partner}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">Description</h3>
                    <p className="text-sm text-gray-600">{selectedDispute.description}</p>
                  </div>

                  {/* Investigation Notes */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">Investigation Notes</h3>
                    <textarea
                      value={investigationNotes}
                      onChange={(e) => setInvestigationNotes(e.target.value)}
                      placeholder="Add your investigation notes here..."
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Panel - Conversation */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Conversation History</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">User</span>
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Partner</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockConversations[selectedDispute.conversationId]?.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-lg ${message.type === 'user' ? 'bg-green-50' : 'bg-blue-50'} rounded-2xl p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{message.sender}</span>
                          {!message.certified && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                              Not Certified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{message.message}</p>
                        <p className="text-xs text-gray-500">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resolution Actions */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Decision</label>
                  <textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Enter your resolution decision..."
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowConversation(false);
                      setSelectedDispute(null);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleResolveDispute(selectedDispute.id, resolution)}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                  >
                    Resolve Dispute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-500">Platform insights and analytics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {['overview', 'revenue', 'users', 'performance', 'geographic', 'trends'].map((report) => (
          <button
            key={report}
            onClick={() => setSelectedReport(report)}
            className={`px-4 py-2 font-medium transition ${
              selectedReport === report
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {report.charAt(0).toUpperCase() + report.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-8">
          {/* Revenue Overview */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-8 shadow-xl mt-3 mb-3">
            <h2 className="text-2xl font-bold mb-6">Revenue Overview (March 2024)</h2>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-blue-100 text-sm mb-2 text-center">Total Revenue</p>
                <p className="text-4xl font-bold text-center" style={{ fontSize: '27px' }}>$458,920</p>
                <p className="text-sm text-blue-100 mt-1 text-center">+18.5% vs last month</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-2 text-center">Commission</p>
                <p className="text-4xl font-bold text-center" style={{ fontSize: '27px' }}>$135,132</p>
                <p className="text-sm text-blue-100 mt-1 text-center">29.4% of total</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-2 text-center">Subscriptions</p>
                <p className="text-4xl font-bold text-center" style={{ fontSize: '27px' }}>$14,560</p>
                <p className="text-sm text-blue-100 mt-1 text-center">34 active plans</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-2 text-center">Projected</p>
                <p className="text-4xl font-bold text-center" style={{ fontSize: '27px' }}>$524,600</p>
                <p className="text-sm text-blue-100 mt-1 text-center">Next month</p>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-6 mt-6.5 mb-6.5">
            <MetricCard
              title="Active Users"
              value="11,892"
              change="+324"
              trend="up"
              icon={UserCheck}
              color="blue"
            />
            <MetricCard
              title="Conversion Rate"
              value="3.4%"
              change="+0.2%"
              trend="up"
              icon={TrendingUp}
              color="green"
            />
            <MetricCard
              title="Avg Order Value"
              value="$365"
              change="-2.1%"
              trend="down"
              icon={ShoppingCart}
              color="amber"
            />
            <MetricCard
              title="Retention Rate"
              value="78.5%"
              change="+1.2%"
              trend="up"
              icon={Activity}
              color="purple"
            />
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-2 gap-6 mt-5.75 mb-5.75">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-600" />
                Revenue Trend
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Revenue visualization</p>
                  <p className="text-sm text-gray-500 mt-1">Daily revenue over {selectedPeriod}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-green-600" />
                Revenue Distribution
              </h3>
              <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-gray-600">Revenue breakdown</p>
                  <p className="text-sm text-gray-500 mt-1">Tourism vs Trade split</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-2 gap-6 mt-5 mb-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Tourism Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Booking Value</span>
                  <span className="font-bold">$456,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Commission</span>
                  <span className="font-bold text-green-600">$45,892</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Factory className="w-5 h-5 text-green-600" />
                Trade Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="font-bold">856</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Order Value</span>
                  <span className="font-bold">$892,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Commission</span>
                  <span className="font-bold text-green-600">$89,240</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Report */}
      {selectedReport === 'revenue' && (
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6 mt-4 mb-4">
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
              <p className="text-green-100 text-sm mb-2">Gross Revenue</p>
              <p className="text-4xl font-bold">$458,920</p>
              <p className="text-sm text-green-100 mt-1">+18.5% growth</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
              <p className="text-blue-100 text-sm mb-2">Net Revenue</p>
              <p className="text-4xl font-bold">$323,788</p>
              <p className="text-sm text-blue-100 mt-1">After deductions</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
              <p className="text-purple-100 text-sm mb-2">Profit Margin</p>
              <p className="text-4xl font-bold">70.5%</p>
              <p className="text-sm text-purple-100 mt-1">+2.3% vs last month</p>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Revenue Breakdown by Category</h3>
            <div className="space-y-4">
              {[
                { category: 'Tourism Bookings', amount: 456200, percentage: 99.4, color: 'blue' },
                { category: 'Trade Orders', amount: 2720, percentage: 0.6, color: 'green' },
                { category: 'Subscriptions', amount: 14560, percentage: 3.2, color: 'purple' },
                { category: 'Sponsored Ads', amount: 14560, percentage: 3.2, color: 'amber' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${item.color}-600`} />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                    <span className="font-bold">${item.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Report */}
      {selectedReport === 'users' && (
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-6 mt-4.75 mb-4.75">
            <MetricCard
              title="Total Users"
              value="12,487"
              change="+324"
              trend="up"
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="Active Users"
              value="11,892"
              change="+287"
              trend="up"
              icon={UserCheck}
              color="green"
            />
            <MetricCard
              title="New Users"
              value="324"
              change="+12.4%"
              trend="up"
              icon={TrendingUp}
              color="purple"
            />
            <MetricCard
              title="Churn Rate"
              value="2.1%"
              change="-0.3%"
              trend="down"
              icon={TrendingDown}
              color="red"
            />
          </div>

          {/* User Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mt-5.75 mb-5.75">
            <h3 className="font-bold text-lg mb-6">User Activity Overview</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
                <p className="text-sm text-gray-600">Tour Bookings</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <p className="text-2xl font-bold text-green-600">856</p>
                <p className="text-sm text-gray-600">Trade Orders</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <p className="text-2xl font-bold text-purple-600">$365</p>
                <p className="text-sm text-gray-600">Avg Order Value</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Report */}
      {selectedReport === 'performance' && (
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-6 mt-6 mb-6">
            <MetricCard
              title="Page Load Time"
              value="1.2s"
              change="-0.3s"
              trend="up"
              icon={Activity}
              color="green"
            />
            <MetricCard
              title="Conversion Rate"
              value="3.4%"
              change="+0.2%"
              trend="up"
              icon={TrendingUp}
              color="blue"
            />
            <MetricCard
              title="Bounce Rate"
              value="42.1%"
              change="-2.3%"
              trend="down"
              icon={TrendingDown}
              color="green"
            />
            <MetricCard
              title="Session Duration"
              value="5m 42s"
              change="+1m 15s"
              trend="up"
              icon={Activity}
              color="purple"
            />
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Platform Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">API Response Time</span>
                  <span className="font-bold text-green-600">145ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Server Uptime</span>
                  <span className="font-bold text-green-600">99.9%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Error Rate</span>
                  <span className="font-bold text-green-600">0.2%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Cache Hit Rate</span>
                  <span className="font-bold text-blue-600">87.3%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Database Query Time</span>
                  <span className="font-bold text-blue-600">23ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">CDN Performance</span>
                  <span className="font-bold text-blue-600">98.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Geographic Report */}
      {selectedReport === 'geographic' && (
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-6 mt-4.75 mb-4.75">
            <MetricCard
              title="Countries Active"
              value="47"
              change="+3"
              trend="up"
              icon={Globe}
              color="blue"
            />
            <MetricCard
              title="Top Country"
              value="China"
              change="34.2%"
              trend="up"
              icon={MapPin}
              color="green"
            />
            <MetricCard
              title="Intl Revenue"
              value="$312,450"
              change="+22.1%"
              trend="up"
              icon={DollarSign}
              color="purple"
            />
            <MetricCard
              title="Local Revenue"
              value="$146,470"
              change="+8.7%"
              trend="up"
              icon={CreditCard}
              color="amber"
            />
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Geographic Distribution</h3>
            <div className="space-y-4">
              {[
                { country: 'China', users: 4268, revenue: 156720, percentage: 34.2 },
                { country: 'South Africa', users: 3124, revenue: 114840, percentage: 25.0 },
                { country: 'Nigeria', users: 2187, revenue: 80340, percentage: 17.5 },
                { country: 'Egypt', users: 1562, revenue: 57420, percentage: 12.5 },
                { country: 'Others', users: 1346, revenue: 49460, percentage: 10.8 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{item.country}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-500">{item.users.toLocaleString()} users</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                    <span className="font-bold">${item.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trends Report */}
      {selectedReport === 'trends' && (
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-6 mt-4.75 mb-4.75">
            <MetricCard
              title="Growth Rate"
              value="18.5%"
              change="+2.3%"
              trend="up"
              icon={TrendingUp}
              color="green"
            />
            <MetricCard
              title="Market Share"
              value="12.4%"
              change="+0.8%"
              trend="up"
              icon={PieChart}
              color="blue"
            />
            <MetricCard
              title="User Satisfaction"
              value="4.7/5"
              change="+0.2"
              trend="up"
              icon={Star}
              color="amber"
            />
            <MetricCard
              title="Support Tickets"
              value="234"
              change="-15"
              trend="down"
              icon={AlertCircle}
              color="red"
            />
          </div>

          {/* Trend Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Growth Trends Analysis</h3>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <LineChart className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Growth visualization</p>
                <p className="text-sm text-gray-500 mt-1">User and revenue trends over time</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}) {
  const colors = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    amber: 'text-amber-600 bg-amber-100',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-sm text-green-600">{change} this month</p>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}) {
  const colors = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    amber: 'text-amber-600 bg-amber-100',
    red: 'text-red-600 bg-red-100',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <div className="flex items-center gap-2">
        {trend === 'up' ? (
          <ArrowUp className="w-4 h-4 text-green-600" />
        ) : (
          <ArrowDown className="w-4 h-4 text-red-600" />
        )}
        <p className={`text-sm ${trendColors[trend]}`}>{change}</p>
      </div>
    </div>
  );
}

function GroupBookingsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const groupBookings = [
    {
      id: '1',
      organization: 'University of Zimbabwe',
      tripName: 'Cultural Tour',
      travelers: 25,
      destination: 'Beijing, China',
      dates: 'May 15-20, 2026',
      contact: 'John Smith',
      phone: '+263 777 123 456',
      status: 'pending',
    },
    {
      id: '2',
      organization: 'ABC Corporation',
      tripName: 'Team Building',
      travelers: 15,
      destination: 'Victoria Falls, Zimbabwe',
      dates: 'June 10-14, 2026',
      contact: 'Sarah Johnson',
      phone: '+1 234 567 8901',
      status: 'approved',
    },
  ];

  const filteredBookings = groupBookings.filter(booking => {
    const matchesSearch = booking.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.tripName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Bookings Management</h1>
          <p className="text-gray-500">Manage school and corporate group booking requests</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search group bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Group Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
            <div className="flex flex-col items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{booking.organization} - {booking.tripName}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{booking.travelers} travelers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserCheck className="w-4 h-4" />
                    <span>{booking.contact}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <Phone className="w-4 h-4 inline mr-1" style={{ transform: 'rotate(630deg)' }} />
                  {booking.phone}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : booking.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-1 text-sm"
                onClick={() => {
                  // In a real app, this would send a quote to the group
                  console.log('Accepting and sending quote for booking:', booking.id);
                  // For demo purposes, we'll just simulate the action
                  alert('Quote sent successfully!');
                }}
              >
                <Check className="w-4 h-4" />
                Accept & Send Quote
              </button>
              <button 
                className="px-4 py-2 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition flex items-center gap-1 text-sm"
                onClick={() => {
                  // In a real app, this would reject the group booking
                  console.log('Rejecting booking:', booking.id);
                  // For demo purposes, we'll just simulate the action
                  alert('Booking rejected successfully!');
                }}
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button 
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-1 text-sm"
                onClick={() => {
                  // In a real app, this would open a messaging interface
                  console.log('Opening messaging for booking:', booking.id);
                  // For demo purposes, we'll just simulate the action
                  alert('Opening messaging interface...');
                }}
              >
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-1 text-sm"
                onClick={() => {
                  // In a real app, this would open detailed booking information
                  console.log('Viewing details for booking:', booking.id);
                  // For demo purposes, we'll just simulate the action
                  alert('Opening booking details...');
                }}
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthMetric({ label, value, status }: { label: string; value: string; status: 'good' | 'warning' | 'critical' }) {
  const statusColors = {
    good: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700',
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}>
        {value}
      </span>
    </div>
  );
}