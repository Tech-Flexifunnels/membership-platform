import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Home, ChevronRight, Download } from 'lucide-react';

const MyPlan = () => {
  const navigate = useNavigate();

  // Mock plan data
  const planData = {
    id: 1,
    productName: 'Bindu Natural World Batch 50',
    purchaseDate: '2, Nov 2025, 04:50 PM',
    membershipProductId: '454979',
    invoice: '15458500389',
    price: '7997.00 INR',
  };

  const handleDownloadInvoice = () => {
    alert('Invoice download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center hover:text-primary-500 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">My Plan</span>
        </div>

        {/* Heading */}
        <div className="flex items-center space-x-3 mb-8">
          <Gift className="w-6 h-6 text-cyan-500" />
          <h1 className="text-2xl font-bold text-gray-900">My Plans</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membership Product ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 text-white font-semibold">
                      {planData.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {planData.productName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {planData.purchaseDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {planData.membershipProductId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {planData.invoice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {planData.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={handleDownloadInvoice}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Download Invoice"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
