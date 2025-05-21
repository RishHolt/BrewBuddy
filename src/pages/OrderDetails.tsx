import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface CartItem {
  id: string;
  type: 'drink' | 'side';
  name: string;
  price: number;
  // Drink specific properties
  drinkId?: string;
  size?: string;
  sugarLevel?: number;
  iceLevel?: number;
  toppings?: string[];
}

interface Topping {
  id: string;
  name: string;
  price: number;
}

interface LocationState {
  cart: CartItem[];
  toppings: Topping[];
}

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!state?.cart) {
      navigate('/order');
    } else {
      setLocalCart(state.cart);
    }
  }, [state, navigate]);

  if (!state?.cart) {
    return null;
  }

  const { toppings } = state;

  const calculateCartTotal = () => localCart.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleRemoveFromCart = (itemId: string) => {
    setLocalCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setLocalCart([]);
  };

  const handlePlaceOrder = () => {
    if (localCart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Please add items to your cart first!',
      });
      return;
    }

    // Clear cart and navigate to dashboard
    handleClearCart();
    Swal.fire({
      icon: 'success',
      title: 'Order Created',
      text: 'The order has been sent to kitchen',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      navigate('/dashboard');
    });
  };

  const handleClearItems = () => {
    if (localCart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Cart is already empty!',
      });
      return;
    }

    Swal.fire({
      title: 'Clear All Items?',
      text: 'This will remove all items from the current selection',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear all'
    }).then((result) => {
      if (result.isConfirmed) {
        handleClearCart();
        Swal.fire(
          'Cleared!',
          'All items have been removed.',
          'success'
        );
        navigate('/order', { state: { cart: [] } });
      }
    });
  };

  const renderCartItem = (item: CartItem, index: number) => {
    if (item.type === 'drink') {
      return (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Item {index + 1}</span>
              <h3 className="font-medium text-gray-900">{item.name}</h3>
            </div>
            <div className="mt-1 space-y-1">
              {item.size && (
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-20 font-medium">Size:</span>
                  {item.size === 'S' && 'Small'}
                  {item.size === 'M' && 'Medium'}
                  {item.size === 'L' && 'Large'}
                </p>
              )}
              {item.sugarLevel !== undefined && (
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-20 font-medium">Sugar:</span>
                  {item.sugarLevel}%
                </p>
              )}
              {item.iceLevel !== undefined && (
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-20 font-medium">Ice:</span>
                  {item.iceLevel}%
                </p>
              )}
              {item.toppings && item.toppings.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-20 font-medium">Toppings:</span>
                  <span className="text-accent">
                    {item.toppings.map(t => 
                      toppings.find(top => top.id === t)?.name
                    ).join(', ')}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-accent font-medium">₱{item.price.toFixed(2)}</span>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Item {index + 1}</span>
              <h3 className="font-medium text-gray-900">{item.name}</h3>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-accent font-medium">₱{item.price.toFixed(2)}</span>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {localCart.length} {localCart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            {localCart.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-gray-400 mb-2">📋</div>
                <p className="text-gray-500">No items selected</p>
                <p className="text-sm text-gray-400">Add items from the menu to create an order</p>
                <button
                  onClick={() => navigate('/order')}
                  className="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Return to Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {localCart.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-lg border border-gray-200 p-3"
                    >
                      {renderCartItem(item, index)}
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({localCart.length} items)</span>
                      <span>₱{calculateCartTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (12%)</span>
                      <span>₱{(parseFloat(calculateCartTotal()) * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between">
                      <span className="font-medium">Total Amount</span>
                      <span className="text-lg font-bold text-accent">
                        ₱{(parseFloat(calculateCartTotal()) * 1.12).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary w-full py-3"
                  >
                    Create Order
                  </button>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate('/order', { state: { cart: localCart } })}
                      className="btn-primary flex-1"
                    >
                      Add More Items
                    </button>
                    <button
                      onClick={handleClearItems}
                      className="btn-secondary flex-1"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mt-4">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 text-sm p-2 focus:ring-accent focus:border-accent"
                    placeholder="Add special instructions or notes for kitchen..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 