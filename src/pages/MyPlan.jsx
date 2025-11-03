import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Check, Crown, Zap, Star, Calendar, CreditCard } from 'lucide-react';

const MyPlan = () => {
  const [currentPlan] = useState({
    name: 'Premium',
    price: 99,
    billingCycle: 'monthly',
    startDate: '2025-11-02',
    nextBillingDate: '2025-12-02',
    status: 'active',
  });

  const features = {
    current: [
      'Access to all courses',
      'HD video quality',
      'Download lessons for offline viewing',
      'Priority support',
      'Certificates of completion',
      'Community access',
      'Monthly live sessions',
    ],
    premium: [
      'Everything in current plan',
      '1-on-1 mentorship sessions',
      'Advanced analytics',
      'Custom learning paths',
      'Early access to new courses',
      'Lifetime access guarantee',
    ],
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/dashboard" className="hover:text-blue-600">Home</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">My Plan</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Plan</h1>
          <p className="text-gray-600">Manage your subscription and billing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">{currentPlan.name} Plan</h2>
                  </div>
                  <Badge variant="success" className="bg-green-500 text-white">
                    {currentPlan.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${currentPlan.price}</div>
                  <div className="text-sm opacity-90">per {currentPlan.billingCycle}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                <div>
                  <div className="text-sm opacity-75 mb-1">Start Date</div>
                  <div className="font-medium">
                    {new Date(currentPlan.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-75 mb-1">Next Billing</div>
                  <div className="font-medium">
                    {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Plan Features */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Plan Includes</h3>
              <ul className="space-y-3">
                {features.current.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Billing History</h3>
              <div className="space-y-4">
                {[
                  { date: '2025-11-02', amount: 99, status: 'Paid', invoice: 'INV-001' },
                  { date: '2025-10-02', amount: 99, status: 'Paid', invoice: 'INV-002' },
                  { date: '2025-09-02', amount: 99, status: 'Paid', invoice: 'INV-003' },
                ].map((bill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">${bill.amount}.00</div>
                        <div className="text-sm text-gray-500">
                          {new Date(bill.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="success">{bill.status}</Badge>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md p-6 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Upgrade to Pro</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Get access to exclusive features and personalized mentorship
              </p>
              <ul className="space-y-2 mb-6">
                {features.premium.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" className="w-full bg-purple-600 hover:bg-purple-700">
                Upgrade Now
              </Button>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg mb-4">
                <div className="bg-gray-100 rounded p-2">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/25</div>
                </div>
              </div>
              <Button variant="secondary" className="w-full">
                Update Payment Method
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Cancel Subscription</div>
                  <div className="text-sm text-gray-500">End your current plan</div>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Change Billing Cycle</div>
                  <div className="text-sm text-gray-500">Switch to annual billing</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPlan;
