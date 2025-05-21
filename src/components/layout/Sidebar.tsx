import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon, 
  CubeIcon, 
  ChartBarIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useSidebar } from '../../contexts/SidebarContext';

const CoffeeCupLogo = () => (
  <svg 
    className="w-10 h-10 text-accent" 
    viewBox="-5 0 32 32" 
    fill="currentColor"
  >
    <path d="M12.406 14.75c-0.094-2.094-0.219-3.219-1.469-4.594-1.594-1.781-2.188-3.5-0.875-6.156 0.344 1.781 0.469 3.375 1.719 4.344s2.281 3.594 0.625 6.406zM10.063 14.75c-0.063-1.125-0.125-1.688-0.813-2.469-0.844-0.938-1.188-1.844-0.469-3.281 0.188 0.969 0.219 1.813 0.906 2.313s1.281 1.938 0.375 3.438zM15.719 24.625h5.688c0.344 0 0.469 0.25 0.25 0.531 0 0-2.219 2.844-5.281 2.844h-10.969s-5.281-2.844-5.281-2.844c-0.219-0.281-0.125-0.531 0.219-0.531h5.625c-0.781-0.406-1.938-2.188-1.938-4.406v-4.688h13.688v0.375c0.438-0.375 0.969-0.563 1.531-0.563 0.781 0 2.25 0.813 2.25 2.219 0 2.031-1.344 2.781-2.125 3.313 0 0-1.469 1.156-2.5 2.5-0.344 0.594-0.75 1.063-1.156 1.25zM19.25 16.188c-0.5 0-1.125 0.219-1.531 1.219v2.594c0 0.344-0.031 0.75-0.094 1.094 0.688-0.688 1.5-1.156 1.5-1.156 0.5-0.344 1.5-1 1.5-2.281 0.031-0.906-0.813-1.469-1.375-1.469zM6.406 16.563h-0.875v1.281h0.875v-1.281zM6.406 18.594h-0.875v2.094s0.25 2.813 2.031 3.656c-1.094-1.281-1.156-2.75-1.156-3.656v-2.094z" />
  </svg>
);

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Order', href: '/order', icon: ShoppingCartIcon },
  { name: 'Menu', href: '/menu', icon: ClipboardDocumentListIcon },
  { 
    name: 'Inventory', 
    href: '/inventory', 
    icon: CubeIcon,
    subItems: [
      { name: 'Overview', href: '/inventory' },
      { name: 'Logs', href: '/inventory-logs' }
    ]
  },
  { name: 'Sales', href: '/sales', icon: ChartBarIcon },
  { name: 'Users', href: '/users', icon: UserGroupIcon },
];

const Sidebar = () => {
  const location = useLocation();
  const { isMinimized } = useSidebar();

  return (
    <div 
      className={`${
        isMinimized ? 'w-16' : 'w-64'
      } bg-primary text-white transition-all duration-300 ease-in-out`}
    >
      <div className={`w-full p-4 ${isMinimized ? 'px-2' : ''}`}>
        <div className={`flex items-center ${isMinimized ? 'justify-center' : 'justify-center gap-1'} mt-2`}>
          <div className="flex-shrink-0 -mt-2.5">
            <CoffeeCupLogo />
          </div>
          {!isMinimized && (
            <h1 className="font-playfair text-2xl font-semibold text-accent tracking-wide">BrewBuddy</h1>
          )}
        </div>
        {!isMinimized && (
          <p className="text-center text-sm text-gray-300">Tea & Coffee Shop</p>
        )}
      </div>
      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isSubItemActive = hasSubItems && item.subItems.some(
            subItem => location.pathname === subItem.href
          );
          
          return (
            <div key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center ${
                  isMinimized ? 'justify-center px-2' : 'px-6'
                } py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive || isSubItemActive
                    ? 'bg-accent text-white' 
                    : 'text-gray-300 hover:bg-accent/10 hover:text-white'
                }`}
                title={isMinimized ? item.name : undefined}
              >
                <item.icon className={`h-4 w-4 ${isMinimized ? '' : 'mr-3'}`} />
                {!isMinimized && item.name}
              </Link>
              
              {/* Sub-items */}
              {!isMinimized && hasSubItems && (
                <div className="ml-8 py-1 border-l border-gray-700">
                  {item.subItems.map((subItem) => {
                    const isSubActive = location.pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`flex items-center px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                          isSubActive
                            ? 'text-accent bg-accent/10'
                            : 'text-gray-300 hover:text-accent hover:bg-accent/5'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 