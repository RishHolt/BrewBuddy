import React, { useState } from 'react';
import { CubeIcon, UserIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface InventoryLog {
  id: string;
  date: string;
  itemName: string;
  action: 'restock' | 'take' | 'add' | 'remove';
  quantity: number;
  unit: string;
  reason?: string;
  notes?: string;
  user: string;
  previousStock: number;
  newStock: number;
}

const generateDynamicDate = (daysAgo: number, time: string) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const [hours, minutes] = time.split(':');
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toISOString();
};

const mockLogs: InventoryLog[] = [
  {
    id: '1',
    date: generateDynamicDate(0, '14:30'),
    itemName: 'Black Tea',
    action: 'restock',
    quantity: 10,
    unit: 'kg',
    user: 'Jonathan Evora',
    previousStock: 15,
    newStock: 25,
    notes: 'Regular monthly restock'
  },
  {
    id: '2',
    date: generateDynamicDate(0, '13:45'),
    itemName: 'Fresh Milk',
    action: 'take',
    quantity: 5,
    unit: 'L',
    reason: 'preparation',
    user: 'James Mendoza',
    previousStock: 50,
    newStock: 45,
    notes: 'For afternoon drinks'
  },
  {
    id: '3',
    date: generateDynamicDate(0, '11:20'),
    itemName: 'Earl Grey Tea',
    action: 'restock',
    quantity: 8,
    unit: 'kg',
    user: 'Kim Fuentes',
    previousStock: 3,
    newStock: 11,
    notes: 'Emergency restock due to low stock'
  },
  {
    id: '4',
    date: generateDynamicDate(0, '10:15'),
    itemName: 'Cold Cups (L)',
    action: 'take',
    quantity: 200,
    unit: 'pcs',
    reason: 'preparation',
    user: 'Lei Elcano',
    previousStock: 800,
    newStock: 600,
    notes: 'Morning prep'
  },
  {
    id: '5',
    date: generateDynamicDate(0, '09:30'),
    itemName: 'Vanilla Syrup',
    action: 'add',
    quantity: 10,
    unit: 'L',
    user: 'Derrick Visca',
    previousStock: 0,
    newStock: 10,
    notes: 'New stock arrival'
  },
  {
    id: '6',
    date: generateDynamicDate(1, '16:45'),
    itemName: 'Chocolate Sauce',
    action: 'take',
    quantity: 2,
    unit: 'L',
    reason: 'preparation',
    user: 'Sammuel Nolasco',
    previousStock: 18,
    newStock: 16,
    notes: 'For mocha drinks'
  },
  {
    id: '7',
    date: generateDynamicDate(1, '15:30'),
    itemName: 'Tapioca Pearls',
    action: 'restock',
    quantity: 15,
    unit: 'kg',
    user: 'Jonathan Evora',
    previousStock: 3,
    newStock: 18,
    notes: 'Regular restock'
  },
  {
    id: '8',
    date: generateDynamicDate(1, '14:20'),
    itemName: 'Coffee Filters',
    action: 'take',
    quantity: 50,
    unit: 'pcs',
    reason: 'preparation',
    user: 'James Mendoza',
    previousStock: 150,
    newStock: 100,
    notes: 'For coffee station'
  },
  {
    id: '9',
    date: generateDynamicDate(1, '11:15'),
    itemName: 'Matcha Powder',
    action: 'remove',
    quantity: 2,
    unit: 'kg',
    reason: 'expired',
    user: 'Kim Fuentes',
    previousStock: 10,
    newStock: 8,
    notes: 'Product expired'
  },
  {
    id: '10',
    date: generateDynamicDate(1, '10:00'),
    itemName: 'Fresh Lemons',
    action: 'add',
    quantity: 5,
    unit: 'kg',
    user: 'Lei Elcano',
    previousStock: 3,
    newStock: 8,
    notes: 'Morning delivery'
  },
  {
    id: '11',
    date: generateDynamicDate(1, '09:30'),
    itemName: 'Espresso Beans',
    action: 'take',
    quantity: 3,
    unit: 'kg',
    reason: 'preparation',
    user: 'Jonathan Evora',
    previousStock: 25,
    newStock: 22,
    notes: 'For espresso drinks'
  },
  {
    id: '12',
    date: generateDynamicDate(1, '09:15'),
    itemName: 'Cream Cheese',
    action: 'restock',
    quantity: 10,
    unit: 'kg',
    user: 'James Mendoza',
    previousStock: 8,
    newStock: 18,
    notes: 'Weekly restock'
  },
  {
    id: '13',
    date: generateDynamicDate(2, '16:45'),
    itemName: 'Straws',
    action: 'take',
    quantity: 500,
    unit: 'pcs',
    reason: 'preparation',
    user: 'Kim Fuentes',
    previousStock: 2000,
    newStock: 1500,
    notes: 'For drink service'
  },
  {
    id: '14',
    date: generateDynamicDate(2, '15:30'),
    itemName: 'Green Tea',
    action: 'remove',
    quantity: 2,
    unit: 'kg',
    reason: 'damaged',
    user: 'Derrick Visca',
    previousStock: 22,
    newStock: 20,
    notes: 'Package damaged during storage'
  },
  {
    id: '15',
    date: generateDynamicDate(2, '14:20'),
    itemName: 'Vanilla Syrup',
    action: 'restock',
    quantity: 12,
    unit: 'L',
    user: 'Sammuel Nolasco',
    previousStock: 3,
    newStock: 15,
    notes: 'Emergency restock'
  },
  {
    id: '16',
    date: generateDynamicDate(2, '13:10'),
    itemName: 'Cup Lids',
    action: 'take',
    quantity: 300,
    unit: 'pcs',
    reason: 'preparation',
    user: 'Lei Elcano',
    previousStock: 1200,
    newStock: 900,
    notes: 'For drink service'
  },
  {
    id: '17',
    date: generateDynamicDate(2, '11:45'),
    itemName: 'Fresh Milk',
    action: 'remove',
    quantity: 2,
    unit: 'L',
    reason: 'wastage',
    user: 'Jonathan Evora',
    previousStock: 45,
    newStock: 43,
    notes: 'Spilled during transfer'
  },
  {
    id: '18',
    date: generateDynamicDate(2, '10:30'),
    itemName: 'Fresh Milk',
    action: 'take',
    quantity: 10,
    unit: 'L',
    reason: 'preparation',
    user: 'James Mendoza',
    previousStock: 45,
    newStock: 35,
    notes: 'For coffee drinks'
  },
  {
    id: '19',
    date: generateDynamicDate(2, '09:15'),
    itemName: 'Thai Tea',
    action: 'restock',
    quantity: 15,
    unit: 'kg',
    user: 'Kim Fuentes',
    previousStock: 5,
    newStock: 20,
    notes: 'Regular restock'
  },
  {
    id: '20',
    date: generateDynamicDate(2, '09:00'),
    itemName: 'Coffee Filters',
    action: 'take',
    quantity: 25,
    unit: 'pcs',
    reason: 'preparation',
    user: 'Derrick Visca',
    previousStock: 100,
    newStock: 75,
    notes: 'For coffee station'
  }
];

const InventoryLogs = () => {
  const [logs] = useState<InventoryLog[]>(mockLogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAction, setFilterAction] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10;

  // Filter logs based on search and action filter
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery.trim() === '' ? true :
      log.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.notes?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesAction = filterAction === '' ? true : log.action === filterAction;
    
    return matchesSearch && matchesAction;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'restock':
        return 'bg-green-100 text-green-800';
      case 'take':
        return 'bg-orange-100 text-orange-800';
      case 'add':
        return 'bg-blue-100 text-blue-800';
      case 'remove':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Inventory Logs</h1>
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

      {/* Filters */}
      <div className="card bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-text">Filters</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by item name, user, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="input w-full md:w-48"
          >
            <option value="">All Actions</option>
            <option value="restock">Restock</option>
            <option value="take">Take</option>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <CubeIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-text">Activity History</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Item</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Stock Change</th>
                <th>User</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div>
                      <div className="text-gray-900">
                        {new Date(log.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(log.date).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-900">{log.itemName}</td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                    </span>
                  </td>
                  <td className="text-gray-900">{log.quantity} {log.unit}</td>
                  <td className="whitespace-nowrap">
                    <span className="text-gray-500">{log.previousStock}</span>
                    <span className="mx-2">→</span>
                    <span className={log.newStock > log.previousStock ? 'text-green-600' : 'text-red-600'}>
                      {log.newStock}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mr-2">
                        <UserIcon className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="text-gray-500 max-w-xs truncate">
                    {log.reason ? `${log.reason}: ` : ''}{log.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No logs found for the selected criteria
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 bg-gray-100'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
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
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredLogs.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredLogs.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryLogs; 