import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

// Drink Categories
const drinkCategories = [
  { id: 'milk-tea', name: 'Milk Tea' },
  { id: 'hot-coffee', name: 'Hot Coffee' },
  { id: 'iced-coffee', name: 'Iced Coffee' },
  { id: 'frappe', name: 'Frappe' },
  { id: 'fruit-tea', name: 'Fruit Tea' },
  { id: 'soda', name: 'Soda Drinks' },
];

// Expanded drinks menu with categories
const drinks = [
  // Milk Tea
  { 
    id: 'classic-milk-tea', 
    name: 'Classic Milk Tea', 
    category: 'milk-tea', 
    basePrice: 120.00,
    description: 'Traditional milk tea with a perfect balance of tea and cream',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'taro-milk-tea', 
    name: 'Taro Milk Tea', 
    category: 'milk-tea', 
    basePrice: 135.00,
    description: 'Rich and creamy taro-flavored milk tea',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'thai-milk-tea', 
    name: 'Thai Milk Tea', 
    category: 'milk-tea', 
    basePrice: 135.00,
    description: 'Authentic Thai tea blend with creamy milk',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'okinawa-milk-tea', 
    name: 'Okinawa Milk Tea', 
    category: 'milk-tea', 
    basePrice: 140.00,
    description: 'Brown sugar milk tea with a rich caramel flavor',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'wintermelon-milk-tea', 
    name: 'Wintermelon Milk Tea', 
    category: 'milk-tea', 
    basePrice: 135.00,
    description: 'Unique wintermelon flavor combined with milk tea',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'brown-sugar-milk-tea', 
    name: 'Brown Sugar Milk Tea', 
    category: 'milk-tea', 
    basePrice: 145.00,
    description: 'Classic milk tea with rich brown sugar syrup',
    availableSizes: ['S', 'M', 'L']
  },
  
  // Hot Coffee
  { 
    id: 'americano-hot', 
    name: 'Americano', 
    category: 'hot-coffee', 
    basePrice: 110.00,
    description: 'Espresso diluted with hot water',
    availableSizes: ['S', 'M']
  },
  { 
    id: 'cappuccino-hot', 
    name: 'Cappuccino', 
    category: 'hot-coffee', 
    basePrice: 130.00,
    description: 'Espresso topped with foamy milk',
    availableSizes: ['S', 'M']
  },
  { 
    id: 'latte-hot', 
    name: 'Caffè Latte', 
    category: 'hot-coffee', 
    basePrice: 130.00,
    description: 'Espresso with steamed milk and light foam',
    availableSizes: ['S', 'M']
  },
  { 
    id: 'mocha-hot', 
    name: 'Caffè Mocha', 
    category: 'hot-coffee', 
    basePrice: 140.00,
    description: 'Espresso with chocolate and steamed milk',
    availableSizes: ['S', 'M']
  },
  { 
    id: 'spanish-latte-hot', 
    name: 'Spanish Latte', 
    category: 'hot-coffee', 
    basePrice: 145.00,
    description: 'Espresso with condensed milk and regular milk',
    availableSizes: ['S', 'M']
  },
  { 
    id: 'vanilla-latte-hot', 
    name: 'Vanilla Latte', 
    category: 'hot-coffee', 
    basePrice: 145.00,
    description: 'Caffè latte with vanilla syrup',
    availableSizes: ['S', 'M']
  },

  // Iced Coffee
  { 
    id: 'americano-iced', 
    name: 'Iced Americano', 
    category: 'iced-coffee', 
    basePrice: 120.00,
    description: 'Chilled espresso with cold water',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'cappuccino-iced', 
    name: 'Iced Cappuccino', 
    category: 'iced-coffee', 
    basePrice: 140.00,
    description: 'Chilled espresso with cold milk foam',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'latte-iced', 
    name: 'Iced Caffè Latte', 
    category: 'iced-coffee', 
    basePrice: 140.00,
    description: 'Chilled espresso with cold milk',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'mocha-iced', 
    name: 'Iced Caffè Mocha', 
    category: 'iced-coffee', 
    basePrice: 150.00,
    description: 'Chilled espresso with chocolate and cold milk',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'spanish-latte-iced', 
    name: 'Iced Spanish Latte', 
    category: 'iced-coffee', 
    basePrice: 155.00,
    description: 'Chilled espresso with condensed milk',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'vanilla-latte-iced', 
    name: 'Iced Vanilla Latte', 
    category: 'iced-coffee', 
    basePrice: 155.00,
    description: 'Chilled vanilla-flavored caffè latte',
    availableSizes: ['S', 'M', 'L']
  },

  // Frappe
  { 
    id: 'mocha-frappe', 
    name: 'Mocha Frappe', 
    category: 'frappe', 
    basePrice: 165.00,
    description: 'Blended coffee with chocolate and whipped cream',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'caramel-frappe', 
    name: 'Caramel Frappe', 
    category: 'frappe', 
    basePrice: 165.00,
    description: 'Blended coffee with caramel and whipped cream',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'vanilla-frappe', 
    name: 'Vanilla Frappe', 
    category: 'frappe', 
    basePrice: 165.00,
    description: 'Blended coffee with vanilla and whipped cream',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'oreo-frappe', 
    name: 'Oreo Frappe', 
    category: 'frappe', 
    basePrice: 175.00,
    description: 'Blended coffee with crushed Oreos and whipped cream',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'java-chip-frappe', 
    name: 'Java Chip Frappe', 
    category: 'frappe', 
    basePrice: 175.00,
    description: 'Blended coffee with chocolate chips and whipped cream',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'matcha-frappe', 
    name: 'Matcha Frappe', 
    category: 'frappe', 
    basePrice: 175.00,
    description: 'Blended green tea with milk and whipped cream',
    availableSizes: ['M', 'L']
  },

  // Fruit Tea
  { 
    id: 'lemon-tea', 
    name: 'Lemon Tea', 
    category: 'fruit-tea', 
    basePrice: 120.00,
    description: 'Fresh tea with real lemon',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'peach-tea', 
    name: 'Peach Tea', 
    category: 'fruit-tea', 
    basePrice: 130.00,
    description: 'Black tea with peach flavor',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'strawberry-tea', 
    name: 'Strawberry Tea', 
    category: 'fruit-tea', 
    basePrice: 130.00,
    description: 'Black tea with strawberry flavor',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'passion-fruit-tea', 
    name: 'Passion Fruit Tea', 
    category: 'fruit-tea', 
    basePrice: 135.00,
    description: 'Black tea with tropical passion fruit',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'mango-tea', 
    name: 'Mango Tea', 
    category: 'fruit-tea', 
    basePrice: 130.00,
    description: 'Black tea with sweet mango flavor',
    availableSizes: ['S', 'M', 'L']
  },
  { 
    id: 'lychee-tea', 
    name: 'Lychee Tea', 
    category: 'fruit-tea', 
    basePrice: 135.00,
    description: 'Black tea with lychee flavor',
    availableSizes: ['S', 'M', 'L']
  },

  // Soda Drinks
  { 
    id: 'blue-lemonade', 
    name: 'Blue Lemonade', 
    category: 'soda', 
    basePrice: 125.00,
    description: 'Refreshing blue-colored lemonade soda',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'strawberry-soda', 
    name: 'Strawberry Soda', 
    category: 'soda', 
    basePrice: 130.00,
    description: 'Sparkling strawberry-flavored drink',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'green-apple-soda', 
    name: 'Green Apple Soda', 
    category: 'soda', 
    basePrice: 130.00,
    description: 'Crisp green apple sparkling drink',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'peach-mango-soda', 
    name: 'Peach Mango Soda', 
    category: 'soda', 
    basePrice: 135.00,
    description: 'Sparkling drink with peach and mango flavors',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'passion-fruit-soda', 
    name: 'Passion Fruit Soda', 
    category: 'soda', 
    basePrice: 135.00,
    description: 'Tropical passion fruit sparkling drink',
    availableSizes: ['M', 'L']
  },
  { 
    id: 'mojito', 
    name: 'Mojito', 
    category: 'soda', 
    basePrice: 140.00,
    description: 'Classic mint and lime sparkling drink',
    availableSizes: ['M', 'L']
  },
];

// Expanded toppings
const toppings = [
  { id: 'pearls', name: 'Black Pearls', price: 20.00 },
  { id: 'nata', name: 'Nata de Coco', price: 20.00 },
  { id: 'pudding', name: 'Pudding', price: 25.00 },
  { id: 'grass-jelly', name: 'Grass Jelly', price: 25.00 },
  { id: 'aloe-vera', name: 'Aloe Vera', price: 25.00 },
  { id: 'coffee-jelly', name: 'Coffee Jelly', price: 25.00 },
  { id: 'cream-cheese', name: 'Cream Cheese', price: 30.00 },
  { id: 'crystal-boba', name: 'Crystal Boba', price: 25.00 },
  { id: 'brown-sugar-pearls', name: 'Brown Sugar Pearls', price: 25.00 },
];

// Side dish categories
const sideDishCategories = [
  { id: 'pastries', name: 'Pastries & Breads' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'cakes', name: 'Cakes & Desserts' },
  { id: 'savory', name: 'Savory Snacks' },
  { id: 'cookies', name: 'Cookies & Treats' }
];

// Expanded side dishes menu with categories
const sideDishes = [
  // Pastries & Breads
  { id: 'butter-croissant', name: 'Butter Croissant', price: 85.00, category: 'pastries', description: 'Flaky, buttery French pastry' },
  { id: 'chocolate-croissant', name: 'Chocolate Croissant', price: 95.00, category: 'pastries', description: 'Croissant filled with rich chocolate' },
  { id: 'danish-pastry', name: 'Danish Pastry', price: 90.00, category: 'pastries', description: 'Sweet pastry with fruit filling' },
  { id: 'blueberry-muffin', name: 'Blueberry Muffin', price: 75.00, category: 'pastries', description: 'Moist muffin loaded with blueberries' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', price: 95.00, category: 'pastries', description: 'Soft roll with cinnamon-sugar swirl' },
  { id: 'bagel', name: 'Plain Bagel', price: 70.00, category: 'pastries', description: 'Freshly baked New York style bagel' },

  // Sandwiches
  { id: 'grilled-cheese', name: 'Grilled Cheese Sandwich', price: 145.00, category: 'sandwiches', description: 'Classic comfort food with melted cheese blend' },
  { id: 'club-sandwich', name: 'Club Sandwich', price: 165.00, category: 'sandwiches', description: 'Triple-decker with chicken, bacon, and veggies' },
  { id: 'tuna-sandwich', name: 'Tuna Sandwich', price: 155.00, category: 'sandwiches', description: 'Creamy tuna mix with fresh vegetables' },
  { id: 'chicken-sandwich', name: 'Chicken Sandwich', price: 165.00, category: 'sandwiches', description: 'Grilled chicken with lettuce and special sauce' },
  { id: 'veggie-sandwich', name: 'Veggie Delight', price: 145.00, category: 'sandwiches', description: 'Fresh vegetables with hummus spread' },

  // Cakes & Desserts
  { id: 'chocolate-cake', name: 'Chocolate Cake', price: 125.00, category: 'cakes', description: 'Rich chocolate layer cake' },
  { id: 'cheesecake', name: 'Classic Cheesecake', price: 135.00, category: 'cakes', description: 'Creamy New York style cheesecake' },
  { id: 'carrot-cake', name: 'Carrot Cake', price: 125.00, category: 'cakes', description: 'Spiced cake with cream cheese frosting' },
  { id: 'tiramisu', name: 'Tiramisu', price: 145.00, category: 'cakes', description: 'Italian coffee-flavored dessert' },
  { id: 'red-velvet', name: 'Red Velvet Slice', price: 135.00, category: 'cakes', description: 'Classic red velvet with cream cheese' },

  // Savory Snacks
  { id: 'fries', name: 'French Fries', price: 95.00, category: 'savory', description: 'Crispy golden fries with seasoning' },
  { id: 'nachos', name: 'Loaded Nachos', price: 135.00, category: 'savory', description: 'Tortilla chips with cheese and toppings' },
  { id: 'chicken-fingers', name: 'Chicken Fingers', price: 145.00, category: 'savory', description: 'Crispy breaded chicken strips' },
  { id: 'mozzarella-sticks', name: 'Mozzarella Sticks', price: 135.00, category: 'savory', description: 'Breaded and fried cheese sticks' },
  { id: 'onion-rings', name: 'Onion Rings', price: 95.00, category: 'savory', description: 'Crispy battered onion rings' },

  // Cookies & Treats
  { id: 'chocolate-chip', name: 'Chocolate Chip Cookies', price: 75.00, category: 'cookies', description: 'Classic cookies (3 pieces)' },
  { id: 'oatmeal-raisin', name: 'Oatmeal Raisin Cookies', price: 75.00, category: 'cookies', description: 'Chewy oatmeal cookies (3 pieces)' },
  { id: 'matcha-cookies', name: 'Matcha Cookies', price: 85.00, category: 'cookies', description: 'Green tea flavored cookies (3 pieces)' },
  { id: 'brownies', name: 'Chocolate Brownies', price: 95.00, category: 'cookies', description: 'Fudgy chocolate brownies (2 pieces)' },
  { id: 'biscotti', name: 'Almond Biscotti', price: 85.00, category: 'cookies', description: 'Crunchy Italian cookies (3 pieces)' }
];

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

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [size, setSize] = useState('M');
  const [sugarLevel, setSugarLevel] = useState(100);
  const [iceLevel, setIceLevel] = useState(100);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>(location.state?.cart || []);
  const [orderType, setOrderType] = useState<'drinks' | 'sides'>('drinks');

  // Filter drinks by category
  const filteredDrinks = selectedCategory
    ? drinks.filter(drink => drink.category === selectedCategory)
    : [];

  const calculateSizePrice = (basePrice: number, selectedSize: string) => {
    let price = basePrice;
    if (selectedSize === 'S') price -= 15;
    if (selectedSize === 'L') price += 20;
    return price;
  };

  const calculateDrinkPrice = () => {
    let total = 0;
    const drink = drinks.find(d => d.id === selectedDrink);
    if (drink) {
      total += calculateSizePrice(drink.basePrice, size);
    selectedToppings.forEach(toppingId => {
      const topping = toppings.find(t => t.id === toppingId);
      if (topping) total += topping.price;
    });
    }
    return total;
  };

  const handleAddToCart = () => {
    if (orderType === 'drinks') {
    if (!selectedDrink) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a drink first!',
      });
      return;
    }

      const drink = drinks.find(d => d.id === selectedDrink);
      if (!drink) return;

      const cartItem: CartItem = {
        id: Date.now().toString(),
        type: 'drink',
        name: drink.name,
        drinkId: selectedDrink,
        size,
        sugarLevel,
        iceLevel,
        toppings: [...selectedToppings],
        price: calculateDrinkPrice(),
      };

      setCart([...cart, cartItem]);
      
      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${drink.name} (${size}) has been added to your cart`,
        showConfirmButton: false,
        timer: 1500,
      });

      resetForm();
    }
  };

  const handleAddSideToCart = (side: typeof sideDishes[0]) => {
    const cartItem: CartItem = {
      id: Date.now().toString(),
      type: 'side',
      name: side.name,
      price: side.price,
    };

    setCart([...cart, cartItem]);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${side.name} has been added to your cart`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const resetForm = () => {
    setSelectedDrink('');
    setSize('M');
    setSugarLevel(100);
    setIceLevel(100);
    setSelectedToppings([]);
  };

  const handleViewCart = () => {
    navigate('/order-details', { 
      state: { 
        cart,
        toppings
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Place Order</h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setOrderType('drinks')}
                  className={`btn ${
                    orderType === 'drinks'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Drinks
                </button>
                <button
                  onClick={() => setOrderType('sides')}
                  className={`btn ${
                    orderType === 'sides'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Side Dishes
                </button>
              </div>
              <button
                onClick={handleViewCart}
                className="btn-primary flex items-center space-x-2"
              >
                <span>View Cart</span>
                <span className="bg-white text-accent rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {orderType === 'drinks' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Categories */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {drinkCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedDrink('');
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-accent/5 border-l-4 border-accent'
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <span className={`font-medium ${
                        selectedCategory === category.id ? 'text-accent' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Drinks and Customization */}
            <div className="lg:col-span-9">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedCategory ? drinkCategories.find(c => c.id === selectedCategory)?.name : 'Select a Category'}
                  </h2>
                </div>

                <div className="p-4">
                  {selectedCategory ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredDrinks.map((drink) => (
                        <button
                          key={drink.id}
                          onClick={() => {
                            setSelectedDrink(drink.id);
                            setSize(drink.availableSizes[0]);
                          }}
                          className={`p-4 rounded-lg border transition-all ${
                            selectedDrink === drink.id
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 hover:border-accent/50 hover:shadow-md'
                          }`}
                        >
                          <div className="text-left">
                            <h3 className="font-medium text-gray-900">{drink.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{drink.description}</p>
                            <div className="text-sm text-gray-500 mt-2">
                              Available sizes: {drink.availableSizes.join(' / ')}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Please select a category from the left menu
                    </div>
                  )}
                </div>

                {selectedDrink && (
                  <div className="border-t border-gray-100 p-4">
                    <div className="space-y-4">
                      {/* Size Selection */}
                      <div className="grid grid-cols-3 gap-3">
                        {['S', 'M', 'L'].map((s) => {
                          const drink = drinks.find(d => d.id === selectedDrink);
                          if (!drink) return null;
                          const isAvailable = drink.availableSizes.includes(s);
                          
                          return (
                            <button
                              key={s}
                              onClick={() => isAvailable && setSize(s)}
                              disabled={!isAvailable}
                              className={`p-3 rounded-lg border transition-all ${
                                !isAvailable 
                                  ? 'opacity-50 cursor-not-allowed bg-gray-100'
                                  : size === s
                                    ? 'bg-accent text-white'
                                    : 'hover:border-accent/50'
                              }`}
                            >
                              <div className="text-center">
                                <div className="font-medium">
                                  {s === 'S' && 'Small'}
                                  {s === 'M' && 'Medium'}
                                  {s === 'L' && 'Large'}
                                </div>
                                {!isAvailable ? (
                                  <div className="text-sm mt-1 text-gray-400">
                                    Unavailable
                                  </div>
                                ) : (
                                  <div className="text-sm mt-1">
                                    ₱{calculateSizePrice(drink.basePrice, s).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Sugar and Ice Levels */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="flex justify-between text-sm mb-1">
                            <span>Sugar Level</span>
                            <span>{sugarLevel}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="25"
                            value={sugarLevel}
                            onChange={(e) => setSugarLevel(Number(e.target.value))}
                            className="w-full accent-accent"
                          />
                        </div>
                        <div>
                          <label className="flex justify-between text-sm mb-1">
                            <span>Ice Level</span>
                            <span>{iceLevel}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="25"
                            value={iceLevel}
                            onChange={(e) => setIceLevel(Number(e.target.value))}
                            className="w-full accent-accent"
                          />
                        </div>
                      </div>

                      {/* Toppings */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {toppings.map((topping) => (
                          <label
                            key={topping.id}
                            className={`flex items-center p-2 rounded border ${
                              selectedToppings.includes(topping.id)
                                ? 'border-accent bg-accent/5'
                                : 'border-gray-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedToppings.includes(topping.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedToppings([...selectedToppings, topping.id]);
                                } else {
                                  setSelectedToppings(selectedToppings.filter(id => id !== topping.id));
                                }
                              }}
                              className="rounded text-accent"
                            />
                            <div className="ml-2">
                              <span className="block text-sm">{topping.name}</span>
                              <span className="block text-xs text-accent">+₱{topping.price}</span>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="font-medium">Total</span>
                        <span className="text-lg font-bold text-accent">₱{calculateDrinkPrice().toFixed(2)}</span>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="btn-primary w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Side Dishes View
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Side Dishes Menu</h2>
            </div>
            <div className="p-4">
              {/* Categories at top */}
              <div className="mb-6 border-b border-gray-100">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {sideDishCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'text-accent border-b-2 border-accent'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items Grid */}
              <div className="p-4">
                {selectedCategory ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sideDishes
                      .filter(dish => dish.category === selectedCategory)
                      .map(dish => (
                        <div
                          key={dish.id}
                          className="p-4 rounded-lg border transition-all hover:shadow-md hover:border-accent/50"
                        >
                          <div className="text-left">
                            <h3 className="font-medium text-gray-900">{dish.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{dish.description}</p>
                            <p className="text-accent font-medium mt-2">₱{dish.price.toFixed(2)}</p>
                            <button
                              onClick={() => handleAddSideToCart(dish)}
                              className="mt-3 w-full btn-primary"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Please select a category from above
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage; 