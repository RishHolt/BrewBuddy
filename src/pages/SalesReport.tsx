import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface SaleRecord {
  id: string;
  date: string;
  time: string;
  orderId: string;
  itemName: string;
  type: 'Drink' | 'Side Dish';
  quantity: number;
  price: number;
  addOns?: string[];
}

// Generate realistic sales data for the last 7 days
const generateRealisticSales = (): SaleRecord[] => {
  const sales: SaleRecord[] = [];
  const items = [
    { name: 'Classic Milk Tea', type: 'Drink' as const, price: 120.00, popularity: 0.8 },
    { name: 'Thai Milk Tea', type: 'Drink' as const, price: 135.00, popularity: 0.75 },
    { name: 'Taro Milk Tea', type: 'Drink' as const, price: 135.00, popularity: 0.7 },
    { name: 'Caffe Latte', type: 'Drink' as const, price: 125.00, popularity: 0.65 },
    { name: 'Wintermelon Milk Tea', type: 'Drink' as const, price: 130.00, popularity: 0.6 },
    { name: 'Brown Sugar Milk Tea', type: 'Drink' as const, price: 140.00, popularity: 0.6 },
    { name: 'Matcha Latte', type: 'Drink' as const, price: 145.00, popularity: 0.55 },
    { name: 'Americano', type: 'Drink' as const, price: 110.00, popularity: 0.5 },
    { name: 'Mojito', type: 'Drink' as const, price: 140.00, popularity: 0.45 },
    { name: 'Croissant', type: 'Side Dish' as const, price: 85.00, popularity: 0.4 },
    { name: 'Garlic Bread', type: 'Side Dish' as const, price: 65.00, popularity: 0.35 },
    { name: 'Cookies (3pcs)', type: 'Side Dish' as const, price: 55.00, popularity: 0.3 },
  ];

  const addOns = [
    { name: 'Black Pearls', price: 20.00, popularity: 0.6 },
    { name: 'Cream Cheese', price: 30.00, popularity: 0.4 },
    { name: 'Pudding', price: 25.00, popularity: 0.3 },
    { name: 'Grass Jelly', price: 25.00, popularity: 0.25 },
    { name: 'Crystal Boba', price: 25.00, popularity: 0.2 },
  ];

  // Generate sales for each day
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // More orders on weekends, fewer on weekdays
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseOrders = isWeekend ? 45 : 30;
    const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
    const numOrders = baseOrders + variation;

    for (let j = 0; j < numOrders; j++) {
      // Select item based on popularity
      const rand = Math.random();
      const item = items.find(item => rand <= item.popularity) || items[items.length - 1];
      
      // Random quantity (1-3 for drinks, 1-2 for side dishes)
      const maxQty = item.type === 'Drink' ? 3 : 2;
      const quantity = Math.floor(Math.random() * maxQty) + 1;

      // Add random add-ons for drinks
      const itemAddOns: string[] = [];
      if (item.type === 'Drink') {
        addOns.forEach(addOn => {
          if (Math.random() <= addOn.popularity) {
            itemAddOns.push(addOn.name);
          }
        });
      }

      const orderDate = new Date(date);
      // Set random hour between 8 AM and 10 PM
      orderDate.setHours(8 + Math.floor(Math.random() * 14), Math.floor(Math.random() * 60));
      
      sales.push({
        id: `${date.getTime()}-${j}`,
        orderId: `${1001 + sales.length}`,
        date: orderDate.toLocaleDateString('en-US', { 
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        time: orderDate.toLocaleString('en-US', { 
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        itemName: item.name,
        type: item.type,
        quantity,
        price: item.price,
        addOns: itemAddOns.length > 0 ? itemAddOns : undefined
      });
    }
  }

  return sales;
};

const initialSales = generateRealisticSales();

const SalesReport = () => {
  const [sales] = useState(initialSales);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'Drink' | 'Side Dish'>('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSales = sales
    .filter(sale => {
      if (startDate && sale.date < startDate) return false;
      if (endDate && sale.date > endDate) return false;
      if (selectedType !== 'all' && sale.type !== selectedType) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = a.date.localeCompare(b.date);
      } else if (sortField === 'itemName') {
        comparison = a.itemName.localeCompare(b.itemName);
      } else if (sortField === 'revenue') {
        const revenueA = a.quantity * a.price;
        const revenueB = b.quantity * b.price;
        comparison = revenueA - revenueB;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.quantity * sale.price,
    0
  );

  const totalItems = filteredSales.reduce(
    (sum, sale) => sum + sale.quantity,
    0
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedType('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Sales Report</h1>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-text">
                ₱{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items Sold</p>
              <p className="text-2xl font-bold text-text">{totalItems.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-text">Filters</h2>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-sm text-gray-500 hover:text-accent flex items-center gap-1"
          >
            Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as 'all' | 'Drink' | 'Side Dish');
                setCurrentPage(1);
              }}
              className="input"
            >
              <option value="all">All Categories</option>
              <option value="Drink">Drinks</option>
              <option value="Side Dish">Side Dishes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-text">Sales History</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <button
                    className="flex items-center space-x-1 group"
                    onClick={() => handleSort('date')}
                  >
                    <span>Date & Time</span>
                    {sortField === 'date' && (
                      <span className="text-accent">
                        {sortDirection === 'asc' ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th>Order ID</th>
                <th>
                  <button
                    className="flex items-center space-x-1 group"
                    onClick={() => handleSort('itemName')}
                  >
                    <span>Item</span>
                    {sortField === 'itemName' && (
                      <span className="text-accent">
                        {sortDirection === 'asc' ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th>Category</th>
                <th>Quantity</th>
                <th>
                  <button
                    className="flex items-center space-x-1 group"
                    onClick={() => handleSort('revenue')}
                  >
                    <span>Total</span>
                    {sortField === 'revenue' && (
                      <span className="text-accent">
                        {sortDirection === 'asc' ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div>
                      <div className="text-gray-900">{sale.date}</div>
                      <div className="text-sm text-gray-500">{sale.time}</div>
                    </div>
                  </td>
                  <td className="font-mono text-sm text-gray-900">#{sale.orderId}</td>
                  <td>
                    <div>
                      <div className="text-gray-900">{sale.itemName}</div>
                      {sale.addOns && sale.addOns.length > 0 && (
                        <div className="text-sm text-gray-500">
                          + {sale.addOns.join(', ')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sale.type === 'Drink'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {sale.type}
                    </span>
                  </td>
                  <td className="text-gray-900">{sale.quantity}</td>
                  <td className="font-medium text-gray-900">₱{(sale.quantity * sale.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedSales.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No sales found for the selected criteria
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between items-center">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 bg-gray-100'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Previous
              </button>
              <p className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-400 bg-gray-100'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReport; 