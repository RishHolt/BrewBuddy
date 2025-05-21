import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CurrencyDollarIcon, 
  FireIcon, 
  ExclamationTriangleIcon, 
  PlusIcon,
  ShoppingBagIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Realistic top selling items based on menu prices
const topSellingItems = [
  { name: 'Classic Milk Tea', sales: 42, revenue: 5040 }, // ₱120 x 42
  { name: 'Thai Milk Tea', sales: 38, revenue: 5130 }, // ₱135 x 38
  { name: 'Taro Milk Tea', sales: 35, revenue: 4725 }, // ₱135 x 35
  { name: 'Caffe Latte', sales: 33, revenue: 4125 }, // ₱125 x 33
  { name: 'Wintermelon Milk Tea', sales: 30, revenue: 3900 }, // ₱130 x 30
];

// Using the same data structure as inventory
const lowStockItems = [
  { id: '4', name: 'Earl Grey Tea', currentStock: 3, minimumStock: 5, unit: 'g' },
  { id: '14', name: 'Almond Milk', currentStock: 4, minimumStock: 8, unit: 'ml' },
  { id: '18', name: 'Tapioca Pearls', currentStock: 3, minimumStock: 8, unit: 'g' },
  { id: '44', name: 'Cream Cheese', currentStock: 8, minimumStock: 10, unit: 'g' },
  { id: '45', name: 'Chocolate Chips', currentStock: 6, minimumStock: 8, unit: 'g' },
  { id: '46', name: 'Fruit Jam', currentStock: 5, minimumStock: 7, unit: 'g' },
  { id: '47', name: 'Fresh Lemons', currentStock: 3, minimumStock: 5, unit: 'pcs' },
  { id: '48', name: 'Fresh Limes', currentStock: 2, minimumStock: 4, unit: 'pcs' },
  { id: '49', name: 'Fresh Mint', currentStock: 1, minimumStock: 2, unit: 'g' },
  { id: '50', name: 'Cold Cups (M)', currentStock: 500, minimumStock: 1000, unit: 'pcs' },
  { id: '51', name: 'Cold Cups (L)', currentStock: 800, minimumStock: 1000, unit: 'pcs' },
  { id: '62', name: 'Baking Powder', currentStock: 3, minimumStock: 5, unit: 'g' },
  { id: '63', name: 'Baking Soda', currentStock: 2, minimumStock: 4, unit: 'g' }
];

// Recent orders with realistic items and totals
const recentOrders = [
  { 
    id: '1005',
    items: [
      {
        name: 'Thai Milk Tea (L)',
        addOns: ['Pearls', 'Cream Cheese']
      },
      {
        name: 'Classic Milk Tea (M)',
        addOns: []
      }
    ],
    total: 275.00,
    time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  },
  { 
    id: '1004',
    items: [
      {
        name: 'Taro Milk Tea (L)',
        addOns: ['Cream Cheese']
      },
      {
        name: 'Mojito (M)',
        addOns: []
      }
    ],
    total: 305.00,
    time: new Date(Date.now() - 15 * 60000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  },
  { 
    id: '1003',
    items: [
      {
        name: 'Caffe Latte (M)',
        addOns: []
      },
      {
        name: 'Caffe Latte (M)',
        addOns: []
      },
      {
        name: 'Croissant',
        addOns: []
      }
    ],
    total: 335.00,
    time: new Date(Date.now() - 30 * 60000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  },
  { 
    id: '1002',
    items: [
      {
        name: 'Wintermelon Milk Tea (L)',
        addOns: ['Pearls']
      },
      {
        name: 'Classic Milk Tea (M)',
        addOns: ['Pudding']
      }
    ],
    total: 295.00,
    time: new Date(Date.now() - 45 * 60000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  },
  { 
    id: '1001',
    items: [
      {
        name: 'Brown Sugar Milk Tea (L)',
        addOns: ['Pearls']
      },
      {
        name: 'Brown Sugar Milk Tea (L)',
        addOns: ['Pearls']
      }
    ],
    total: 340.00,
    time: new Date(Date.now() - 60 * 60000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
];

const Dashboard = () => {
  // Calculate today's total sales from recent orders
  const todaysSales = recentOrders.reduce((sum, order) => sum + order.total, 0);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          <div>{new Date().toLocaleDateString('en-US', { 
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</div>
          <div className="text-right">{new Date().toLocaleString('en-US', { 
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Sales */}
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <CurrencyDollarIcon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Sales</p>
              <p className="text-2xl font-bold text-text">₱{todaysSales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingBagIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-text">{recentOrders.length}</p>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-text">{lowStockItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="card bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FireIcon className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-text">Top Selling</h3>
            </div>
          </div>
          <div className="space-y-4">
            {topSellingItems.slice(0, 3).map((item) => (
              <div key={item.name} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.sales} sold</p>
                </div>
                <p className="text-sm font-medium text-accent">₱{item.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-text">Low Stock Alert</h3>
            </div>
            <Link to="/inventory" className="btn-primary flex items-center space-x-2 text-sm px-3 py-1.5">
              <PlusIcon className="h-4 w-4" />
              <span>Restock</span>
            </Link>
          </div>
          <div className="space-y-4">
            {lowStockItems
              .sort((a, b) => (a.currentStock / a.minimumStock) - (b.currentStock / b.minimumStock))
              .slice(0, 4)
              .map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">Current:</span>
                      <span className="text-xs font-medium text-red-600 ml-1">{item.currentStock} {item.unit}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">Min:</span>
                      <span className="text-xs font-medium text-gray-700 ml-1">{item.minimumStock} {item.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-text">Recent Orders</h3>
          </div>
          <Link to="/order" className="btn-primary flex items-center space-x-2 text-sm px-3 py-1.5">
            <PlusIcon className="h-4 w-4" />
            <span>Add Order</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <span className="font-mono text-sm text-gray-900">#{order.id}</span>
                  </td>
                  <td>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          <div className="text-gray-900">{item.name}</div>
                          {item.addOns.length > 0 && (
                            <div className="text-sm text-gray-500">
                              + {item.addOns.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="font-medium text-gray-900">₱{order.total.toFixed(2)}</td>
                  <td className="text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No recent orders
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 