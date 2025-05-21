import React, { useState } from 'react';
import { ExclamationTriangleIcon, PlusIcon, CubeIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import Modal from '../components/Modal';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  description: string;
  supplier?: string;
  lastRestockDate?: string;
}

// Inventory Categories
const inventoryCategories = [
  { id: 'tea', name: 'Tea Ingredients' },
  { id: 'coffee', name: 'Coffee Ingredients' },
  { id: 'dairy', name: 'Dairy Products' },
  { id: 'toppings', name: 'Drink Toppings' },
  { id: 'syrups', name: 'Syrups & Flavors' },
  { id: 'baking', name: 'Baking Ingredients' },
  { id: 'packaging', name: 'Packaging Materials' },
  { id: 'equipment', name: 'Equipment & Tools' },
  { id: 'cleaning', name: 'Cleaning Supplies' },
  { id: 'fruits', name: 'Fresh Fruits' },
  { id: 'powders', name: 'Flavored Powders' },
  { id: 'spreads', name: 'Spreads & Fillings' },
  { id: 'savory', name: 'Savory Ingredients' },
  { id: 'frozen', name: 'Frozen Items' }
];

const initialInventory: InventoryItem[] = [
  // Tea Ingredients
  { 
    id: '1', 
    name: 'Black Tea', 
    category: 'tea',
    currentStock: 25, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'Premium black tea leaves for milk tea',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '2', 
    name: 'Green Tea', 
    category: 'tea',
    currentStock: 22, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'High-quality Japanese green tea',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '3', 
    name: 'Oolong Tea', 
    category: 'tea',
    currentStock: 20, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'Premium Taiwanese oolong tea',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '4', 
    name: 'Earl Grey Tea', 
    category: 'tea',
    currentStock: 3, 
    minimumStock: 5, 
    unit: 'kg',
    description: 'Bergamot-flavored black tea',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-12'
  },
  { 
    id: '5', 
    name: 'Thai Tea', 
    category: 'tea',
    currentStock: 18, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'Authentic Thai tea blend',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-12'
  },
  { 
    id: '6', 
    name: 'Jasmine Tea', 
    category: 'tea',
    currentStock: 15, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'Fragrant jasmine green tea',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-12'
  },

  // Coffee Ingredients
  { 
    id: '7', 
    name: 'Arabica Coffee Beans', 
    category: 'coffee',
    currentStock: 35, 
    minimumStock: 15, 
    unit: 'kg',
    description: 'Premium Arabica coffee beans',
    supplier: 'Coffee Bean Co.',
    lastRestockDate: '2024-03-08'
  },
  { 
    id: '8', 
    name: 'Robusta Coffee Beans', 
    category: 'coffee',
    currentStock: 28, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'Strong Robusta coffee beans',
    supplier: 'Coffee Bean Co.',
    lastRestockDate: '2024-03-08'
  },
  { 
    id: '9', 
    name: 'Ground Coffee', 
    category: 'coffee',
    currentStock: 20, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'Pre-ground coffee blend',
    supplier: 'Coffee Bean Co.',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '10', 
    name: 'Espresso Beans', 
    category: 'coffee',
    currentStock: 25, 
    minimumStock: 12, 
    unit: 'kg',
    description: 'Dark roast espresso beans',
    supplier: 'Coffee Bean Co.',
    lastRestockDate: '2024-03-10'
  },

  // Dairy Products
  { 
    id: '11', 
    name: 'Fresh Milk', 
    category: 'dairy',
    currentStock: 45, 
    minimumStock: 20, 
    unit: 'L',
    description: 'Fresh whole milk for beverages',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '12', 
    name: 'Non-fat Milk', 
    category: 'dairy',
    currentStock: 35, 
    minimumStock: 15, 
    unit: 'L',
    description: 'Non-fat milk option',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '13', 
    name: 'Soy Milk', 
    category: 'dairy',
    currentStock: 25, 
    minimumStock: 10, 
    unit: 'L',
    description: 'Plant-based milk alternative',
    supplier: 'Green Foods Co.',
    lastRestockDate: '2024-03-14'
  },
  { 
    id: '14', 
    name: 'Almond Milk', 
    category: 'dairy',
    currentStock: 4, 
    minimumStock: 8, 
    unit: 'L',
    description: 'Plant-based milk alternative',
    supplier: 'Green Foods Co.',
    lastRestockDate: '2024-03-14'
  },
  { 
    id: '15', 
    name: 'Oat Milk', 
    category: 'dairy',
    currentStock: 20, 
    minimumStock: 8, 
    unit: 'L',
    description: 'Plant-based milk alternative',
    supplier: 'Green Foods Co.',
    lastRestockDate: '2024-03-14'
  },
  { 
    id: '16', 
    name: 'Heavy Cream', 
    category: 'dairy',
    currentStock: 18, 
    minimumStock: 8, 
    unit: 'L',
    description: 'For whipped cream and specialty drinks',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '17', 
    name: 'Condensed Milk', 
    category: 'dairy',
    currentStock: 25, 
    minimumStock: 12, 
    unit: 'kg',
    description: 'For Thai tea and Spanish latte',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },

  // Toppings
  { 
    id: '18', 
    name: 'Tapioca Pearls', 
    category: 'toppings',
    currentStock: 3, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'Black tapioca pearls for bubble tea',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '19', 
    name: 'Brown Sugar Pearls', 
    category: 'toppings',
    currentStock: 15, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'Brown sugar flavored pearls',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '20', 
    name: 'Crystal Boba', 
    category: 'toppings',
    currentStock: 12, 
    minimumStock: 7, 
    unit: 'kg',
    description: 'Transparent chewy pearls',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '21', 
    name: 'Grass Jelly', 
    category: 'toppings',
    currentStock: 15, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'Grass jelly for drink toppings',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '22', 
    name: 'Nata de Coco', 
    category: 'toppings',
    currentStock: 12, 
    minimumStock: 6, 
    unit: 'kg',
    description: 'Coconut jelly cubes',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-12'
  },
  { 
    id: '23', 
    name: 'Red Bean', 
    category: 'toppings',
    currentStock: 10, 
    minimumStock: 5, 
    unit: 'kg',
    description: 'Sweetened red beans',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-12'
  },
  { 
    id: '24', 
    name: 'Pudding', 
    category: 'toppings',
    currentStock: 12, 
    minimumStock: 6, 
    unit: 'kg',
    description: 'Egg pudding for drinks',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-13'
  },
  { 
    id: '25', 
    name: 'Coffee Jelly', 
    category: 'toppings',
    currentStock: 10, 
    minimumStock: 6, 
    unit: 'kg',
    description: 'Coffee flavored jelly',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-13'
  },
  { 
    id: '26', 
    name: 'Aloe Vera', 
    category: 'toppings',
    currentStock: 12, 
    minimumStock: 7, 
    unit: 'kg',
    description: 'Aloe vera jelly cubes',
    supplier: 'Boba Supply Inc.',
    lastRestockDate: '2024-03-13'
  },

  // Syrups & Flavors
  { 
    id: '27', 
    name: 'Classic Syrup', 
    category: 'syrups',
    currentStock: 20, 
    minimumStock: 10, 
    unit: 'L',
    description: 'Simple syrup for drinks',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '28', 
    name: 'Brown Sugar Syrup', 
    category: 'syrups',
    currentStock: 15, 
    minimumStock: 8, 
    unit: 'L',
    description: 'For brown sugar drinks',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '29', 
    name: 'Caramel Syrup', 
    category: 'syrups',
    currentStock: 12, 
    minimumStock: 8, 
    unit: 'L',
    description: 'Caramel flavoring syrup',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '30', 
    name: 'Vanilla Syrup', 
    category: 'syrups',
    currentStock: 14, 
    minimumStock: 8, 
    unit: 'L',
    description: 'Vanilla flavoring syrup',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '31', 
    name: 'Hazelnut Syrup', 
    category: 'syrups',
    currentStock: 10, 
    minimumStock: 6, 
    unit: 'L',
    description: 'Hazelnut flavoring syrup',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '32', 
    name: 'Chocolate Sauce', 
    category: 'syrups',
    currentStock: 18, 
    minimumStock: 10, 
    unit: 'L',
    description: 'For mocha drinks',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },

  // Flavored Powders
  { 
    id: '33', 
    name: 'Taro Powder', 
    category: 'powders',
    currentStock: 12, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For taro milk tea',
    supplier: 'Flavor Pro Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '34', 
    name: 'Matcha Powder', 
    category: 'powders',
    currentStock: 10, 
    minimumStock: 6, 
    unit: 'kg',
    description: 'Premium green tea powder',
    supplier: 'Tea World Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '35', 
    name: 'Wintermelon Powder', 
    category: 'powders',
    currentStock: 8, 
    minimumStock: 5, 
    unit: 'kg',
    description: 'For wintermelon milk tea',
    supplier: 'Flavor Pro Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '36', 
    name: 'Chocolate Powder', 
    category: 'powders',
    currentStock: 15, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For chocolate drinks',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },

  // Baking Ingredients
  { 
    id: '37', 
    name: 'All-purpose Flour', 
    category: 'baking',
    currentStock: 35, 
    minimumStock: 20, 
    unit: 'kg',
    description: 'Basic flour for baking',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '38', 
    name: 'Bread Flour', 
    category: 'baking',
    currentStock: 30, 
    minimumStock: 15, 
    unit: 'kg',
    description: 'High-protein flour for bread',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '39', 
    name: 'Sugar', 
    category: 'baking',
    currentStock: 40, 
    minimumStock: 20, 
    unit: 'kg',
    description: 'Refined white sugar',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '40', 
    name: 'Butter', 
    category: 'baking',
    currentStock: 20, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'Unsalted butter for baking',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '41', 
    name: 'Eggs', 
    category: 'baking',
    currentStock: 500, 
    minimumStock: 300, 
    unit: 'pcs',
    description: 'Fresh eggs for baking',
    supplier: 'Local Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '42', 
    name: 'Cocoa Powder', 
    category: 'baking',
    currentStock: 12, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For chocolate pastries',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '43', 
    name: 'Yeast', 
    category: 'baking',
    currentStock: 5, 
    minimumStock: 3, 
    unit: 'kg',
    description: 'Active dry yeast',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },

  // Spreads & Fillings
  { 
    id: '44', 
    name: 'Cream Cheese', 
    category: 'spreads',
    currentStock: 8, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'For cheesecakes and toppings',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '45', 
    name: 'Chocolate Chips', 
    category: 'spreads',
    currentStock: 6, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For cookies and drinks',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '46', 
    name: 'Fruit Jam', 
    category: 'spreads',
    currentStock: 5, 
    minimumStock: 7, 
    unit: 'kg',
    description: 'Assorted fruit jams',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },

  // Fresh Fruits
  { 
    id: '47', 
    name: 'Fresh Lemons', 
    category: 'fruits',
    currentStock: 3, 
    minimumStock: 5, 
    unit: 'kg',
    description: 'For tea and drinks',
    supplier: 'Fresh Produce Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '48', 
    name: 'Fresh Limes', 
    category: 'fruits',
    currentStock: 2, 
    minimumStock: 4, 
    unit: 'kg',
    description: 'For mojitos and drinks',
    supplier: 'Fresh Produce Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '49', 
    name: 'Fresh Mint', 
    category: 'fruits',
    currentStock: 1, 
    minimumStock: 2, 
    unit: 'kg',
    description: 'For mojitos',
    supplier: 'Fresh Produce Co.',
    lastRestockDate: '2024-03-15'
  },

  // Packaging Materials
  { 
    id: '50', 
    name: 'Cold Cups (M)', 
    category: 'packaging',
    currentStock: 500, 
    minimumStock: 1000, 
    unit: 'pcs',
    description: 'Medium size plastic cups',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '51', 
    name: 'Cold Cups (L)', 
    category: 'packaging',
    currentStock: 800, 
    minimumStock: 1000, 
    unit: 'pcs',
    description: 'Large size plastic cups',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '52', 
    name: 'Hot Cups (S)', 
    category: 'packaging',
    currentStock: 600, 
    minimumStock: 800, 
    unit: 'pcs',
    description: 'Small paper cups for hot drinks',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '53', 
    name: 'Hot Cups (M)', 
    category: 'packaging',
    currentStock: 500, 
    minimumStock: 700, 
    unit: 'pcs',
    description: 'Medium paper cups for hot drinks',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '54', 
    name: 'Cup Lids', 
    category: 'packaging',
    currentStock: 1200, 
    minimumStock: 1500, 
    unit: 'pcs',
    description: 'Plastic lids for cold cups',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '55', 
    name: 'Straws', 
    category: 'packaging',
    currentStock: 2000, 
    minimumStock: 2500, 
    unit: 'pcs',
    description: 'Bubble tea straws',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '56', 
    name: 'Paper Bags', 
    category: 'packaging',
    currentStock: 300, 
    minimumStock: 500, 
    unit: 'pcs',
    description: 'For takeout orders',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },
  { 
    id: '57', 
    name: 'Food Containers', 
    category: 'packaging',
    currentStock: 400, 
    minimumStock: 600, 
    unit: 'pcs',
    description: 'For pastries and side dishes',
    supplier: 'Packaging Pro',
    lastRestockDate: '2024-03-01'
  },

  // Equipment & Tools
  { 
    id: '58', 
    name: 'Tea Filters', 
    category: 'equipment',
    currentStock: 200, 
    minimumStock: 300, 
    unit: 'pcs',
    description: 'Disposable tea filters',
    supplier: 'Kitchen Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '59', 
    name: 'Coffee Filters', 
    category: 'equipment',
    currentStock: 150, 
    minimumStock: 200, 
    unit: 'pcs',
    description: 'Paper coffee filters',
    supplier: 'Kitchen Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '60', 
    name: 'Shaker Cups', 
    category: 'equipment',
    currentStock: 10, 
    minimumStock: 15, 
    unit: 'pcs',
    description: 'For mixing drinks',
    supplier: 'Kitchen Supply Co.',
    lastRestockDate: '2024-03-05'
  },

  // Cleaning Supplies
  { 
    id: '61', 
    name: 'Sanitizer', 
    category: 'cleaning',
    currentStock: 5, 
    minimumStock: 8, 
    unit: 'L',
    description: 'Food-grade sanitizer',
    supplier: 'Clean Pro',
    lastRestockDate: '2024-03-10'
  },
  { 
    id: '62', 
    name: 'Cleaning Cloths', 
    category: 'cleaning',
    currentStock: 20, 
    minimumStock: 30, 
    unit: 'pcs',
    description: 'Microfiber cleaning cloths',
    supplier: 'Clean Pro',
    lastRestockDate: '2024-03-10'
  },

  // Additional Baking Ingredients
  { 
    id: '63', 
    name: 'Baking Powder', 
    category: 'baking',
    currentStock: 3, 
    minimumStock: 5, 
    unit: 'kg',
    description: 'For pastries and cakes',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '64', 
    name: 'Baking Soda', 
    category: 'baking',
    currentStock: 2, 
    minimumStock: 4, 
    unit: 'kg',
    description: 'For pastries and cakes',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '65', 
    name: 'Cinnamon Powder', 
    category: 'baking',
    currentStock: 2, 
    minimumStock: 3, 
    unit: 'kg',
    description: 'For cinnamon rolls and pastries',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '66', 
    name: 'Vanilla Extract', 
    category: 'baking',
    currentStock: 2, 
    minimumStock: 3, 
    unit: 'L',
    description: 'For baking and desserts',
    supplier: 'Baking Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '67', 
    name: 'Cream Cheese Frosting', 
    category: 'baking',
    currentStock: 5, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For cinnamon rolls and cakes',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },

  // Additional Spreads & Fillings
  { 
    id: '68', 
    name: 'Blueberry Filling', 
    category: 'spreads',
    currentStock: 4, 
    minimumStock: 6, 
    unit: 'kg',
    description: 'For muffins and pastries',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '69', 
    name: 'Nutella', 
    category: 'spreads',
    currentStock: 5, 
    minimumStock: 7, 
    unit: 'kg',
    description: 'Chocolate hazelnut spread',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },
  { 
    id: '70', 
    name: 'Peanut Butter', 
    category: 'spreads',
    currentStock: 4, 
    minimumStock: 6, 
    unit: 'kg',
    description: 'For sandwiches and pastries',
    supplier: 'Sweet Supply Co.',
    lastRestockDate: '2024-03-05'
  },

  // Savory Ingredients
  { 
    id: '71', 
    name: 'Chicken Breast', 
    category: 'savory',
    currentStock: 8, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'For sandwiches and snacks',
    supplier: 'Local Meat Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '72', 
    name: 'Bacon', 
    category: 'savory',
    currentStock: 5, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For club sandwiches',
    supplier: 'Local Meat Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '73', 
    name: 'Tuna', 
    category: 'savory',
    currentStock: 10, 
    minimumStock: 15, 
    unit: 'kg',
    description: 'For tuna sandwiches',
    supplier: 'Seafood Supply Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '74', 
    name: 'Cheese Slices', 
    category: 'savory',
    currentStock: 100, 
    minimumStock: 150, 
    unit: 'pcs',
    description: 'For sandwiches',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '75', 
    name: 'Mozzarella', 
    category: 'savory',
    currentStock: 5, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For mozzarella sticks',
    supplier: 'Local Dairy Farm',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '76', 
    name: 'Fresh Vegetables', 
    category: 'savory',
    currentStock: 10, 
    minimumStock: 15, 
    unit: 'kg',
    description: 'Assorted vegetables for sandwiches',
    supplier: 'Fresh Produce Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '77', 
    name: 'Mayonnaise', 
    category: 'savory',
    currentStock: 5, 
    minimumStock: 8, 
    unit: 'kg',
    description: 'For sandwiches',
    supplier: 'Food Supply Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '78', 
    name: 'Tortilla Chips', 
    category: 'savory',
    currentStock: 15, 
    minimumStock: 20, 
    unit: 'kg',
    description: 'For nachos',
    supplier: 'Food Supply Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '79', 
    name: 'Nacho Cheese', 
    category: 'savory',
    currentStock: 8, 
    minimumStock: 10, 
    unit: 'kg',
    description: 'For loaded nachos',
    supplier: 'Food Supply Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '80', 
    name: 'Breading Mix', 
    category: 'savory',
    currentStock: 10, 
    minimumStock: 15, 
    unit: 'kg',
    description: 'For chicken fingers and mozzarella sticks',
    supplier: 'Food Supply Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '81', 
    name: 'Fresh Onions', 
    category: 'savory',
    currentStock: 8, 
    minimumStock: 12, 
    unit: 'kg',
    description: 'For onion rings and sandwiches',
    supplier: 'Fresh Produce Co.',
    lastRestockDate: '2024-03-15'
  },

  // Frozen Items
  { 
    id: '82', 
    name: 'French Fries', 
    category: 'frozen',
    currentStock: 20, 
    minimumStock: 30, 
    unit: 'kg',
    description: 'Frozen french fries',
    supplier: 'Food Supply Co.',
    lastRestockDate: '2024-03-15'
  },
  { 
    id: '83', 
    name: 'Frozen Blueberries', 
    category: 'frozen',
    currentStock: 8, 
    minimumStock: 12, 
    unit: 'kg',
    description: 'For muffins and pastries',
    supplier: 'Fresh Produce Co.',
    lastRestockDate: '2024-03-15'
  }
];

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTakeModalOpen, setIsTakeModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [lowStockPage, setLowStockPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);
  const [restockAmount, setRestockAmount] = useState('');
  const [takeFormData, setTakeFormData] = useState({
    itemId: '',
    amount: '',
    action: 'take',
    reason: 'preparation',
    notes: '',
    category: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    currentStock: '',
    minimumStock: '',
    unit: 'kg',
    description: '',
    supplier: '',
  });

  const handleRestock = (item: InventoryItem) => {
    setRestockItem(item);
    setRestockAmount('');
    setIsRestockModalOpen(true);
  };

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restockItem) return;

    const amount = parseFloat(restockAmount);
    if (!amount || amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a valid amount',
      });
      return;
    }

    const newStock = restockItem.currentStock + amount;
    
    setInventory(inventory.map(i =>
      i.id === restockItem.id
        ? { 
            ...i, 
            currentStock: newStock,
            lastRestockDate: new Date().toISOString().split('T')[0]
          }
        : i
    ));

    setIsRestockModalOpen(false);
    Swal.fire({
      icon: 'success',
      title: 'Restocked!',
      text: `Added ${amount} ${restockItem.unit} of ${restockItem.name}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleTake = () => {
    setIsTakeModalOpen(true);
    setTakeFormData({
      itemId: '',
      amount: '',
      action: 'take',
      reason: 'preparation',
      notes: '',
      category: ''
    });
  };

  const handleTakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const item = inventory.find(i => i.id === takeFormData.itemId);
    if (!item) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select an item',
      });
      return;
    }

    const amount = parseFloat(takeFormData.amount);
    if (!amount || amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a valid amount',
      });
      return;
    }

    if (amount > item.currentStock) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Cannot ${takeFormData.action} more than current stock (${item.currentStock} ${item.unit})`,
      });
      return;
    }

    const previousStock = item.currentStock;
    const newStock = item.currentStock - amount;
    
    setInventory(inventory.map(i =>
      i.id === takeFormData.itemId
        ? { ...i, currentStock: newStock }
        : i
    ));

    // Here you would typically also save to inventory logs
    // const logEntry = {
    //   id: Date.now().toString(),
    //   date: new Date().toISOString(),
    //   itemName: item.name,
    //   action: takeFormData.action,
    //   quantity: amount,
    //   unit: item.unit,
    //   reason: takeFormData.reason,
    //   notes: takeFormData.notes,
    //   user: 'Current User', // Would come from auth context
    //   previousStock,
    //   newStock
    // };

    setIsTakeModalOpen(false);
    Swal.fire({
      icon: 'success',
      title: takeFormData.action === 'take' ? 'Item Taken!' : 'Item Removed!',
      text: `${takeFormData.action === 'take' ? 'Took' : 'Removed'} ${amount} ${item.unit} of ${item.name}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      name: '',
      category: '',
      currentStock: '',
      minimumStock: '',
      unit: 'kg',
      description: '',
      supplier: '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      category: '',
      currentStock: '',
      minimumStock: '',
      unit: 'kg',
      description: '',
      supplier: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.currentStock || !formData.minimumStock || !formData.category) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
      });
      return;
    }

    const currentStock = parseFloat(formData.currentStock);
    const minimumStock = parseFloat(formData.minimumStock);

    if (isNaN(currentStock) || isNaN(minimumStock) || currentStock < 0 || minimumStock < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Values',
        text: 'Please enter valid numbers for stock levels',
      });
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      currentStock,
      minimumStock,
      unit: formData.unit,
      description: formData.description,
      supplier: formData.supplier,
      lastRestockDate: new Date().toISOString().split('T')[0]
    };

    setInventory([...inventory, newItem]);
    handleCloseModal();

    Swal.fire({
      icon: 'success',
      title: 'Item Added!',
      text: `${newItem.name} has been added to inventory`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const filteredItems = inventory.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = searchQuery.trim() === '' ? true : (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inventoryCategories.find(cat => cat.id === item.category)?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCategory && matchesSearch;
  });

  const lowStockItems = inventory.filter(item => item.currentStock < item.minimumStock);
  const itemsPerPage = 9;
  const totalLowStockPages = Math.ceil(lowStockItems.length / itemsPerPage);
  const paginatedLowStockItems = lowStockItems.slice(
    (lowStockPage - 1) * itemsPerPage,
    lowStockPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Inventory Management</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Items */}
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CubeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-text">{inventory.length}</p>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-text">{lowStockItems.length}</p>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="card bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-text">
                {inventory.filter(item => item.currentStock === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="card bg-red-50 border border-red-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 text-red-700">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <h2 className="text-lg font-semibold">Low Stock Alert</h2>
            </div>
            {totalLowStockPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLowStockPage(prev => Math.max(1, prev - 1))}
                  disabled={lowStockPage === 1}
                  className={`px-3 py-1 rounded ${
                    lowStockPage === 1
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {lowStockPage} of {totalLowStockPages}
                </span>
                <button
                  onClick={() => setLowStockPage(prev => Math.min(totalLowStockPages, prev + 1))}
                  disabled={lowStockPage === totalLowStockPages}
                  className={`px-3 py-1 rounded ${
                    lowStockPage === totalLowStockPages
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedLowStockItems.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-red-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-red-600">
                      Current: {item.currentStock} {item.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      Minimum: {item.minimumStock} {item.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRestock(item)}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories with Search Bar and Add Item */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Search Bar and Add Item */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name, category, description, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={handleTake}
              className="btn-secondary flex items-center space-x-2 px-6 py-3 whitespace-nowrap"
            >
              Take Item
            </button>
            <button
              onClick={handleOpenModal}
              className="btn-primary flex items-center space-x-2 px-6 py-3 whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Items
            </button>
            {inventoryCategories.map((category) => (
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

        {/* Inventory Items Grid */}
        <div className="p-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items found matching your search criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border ${
                    item.currentStock < item.minimumStock
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleRestock(item)}
                        className="btn-primary text-sm px-3 py-1"
                      >
                        Restock
                      </button>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Current Stock:</span>
                      <span className={`font-medium ${
                        item.currentStock < item.minimumStock ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.currentStock} {item.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Minimum Stock:</span>
                      <span className="text-gray-900">{item.minimumStock} {item.unit}</span>
                    </div>
                    {item.supplier && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Supplier:</span>
                        <span className="text-gray-900">{item.supplier}</span>
                      </div>
                    )}
                    {item.lastRestockDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Restock:</span>
                        <span className="text-gray-900">{item.lastRestockDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Take Item Modal */}
      <Modal
        isOpen={isTakeModalOpen}
        onClose={() => setIsTakeModalOpen(false)}
        title="Take/Remove Item"
      >
        <form onSubmit={handleTakeSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={takeFormData.category}
              onChange={(e) => setTakeFormData({ ...takeFormData, category: e.target.value, itemId: '' })}
            >
              <option value="">All Categories</option>
              {inventoryCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={takeFormData.itemId}
              onChange={(e) => setTakeFormData({ ...takeFormData, itemId: e.target.value })}
              required
            >
              <option value="">Select an item</option>
              {inventory
                .filter(item => !takeFormData.category || item.category === takeFormData.category)
                .map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.currentStock} {item.unit})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={takeFormData.amount}
              onChange={(e) => setTakeFormData({ ...takeFormData, amount: e.target.value })}
              placeholder="Enter amount"
              required
              min="0.1"
              step="0.1"
            />
            {takeFormData.itemId && (
              <p className="mt-1 text-sm text-gray-500">
                Current stock: {inventory.find(i => i.id === takeFormData.itemId)?.currentStock} {inventory.find(i => i.id === takeFormData.itemId)?.unit}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={takeFormData.action}
              onChange={(e) => {
                const newAction = e.target.value as 'take' | 'remove';
                setTakeFormData({ 
                  ...takeFormData, 
                  action: newAction,
                  // Reset reason based on action
                  reason: newAction === 'take' ? 'preparation' : 'damaged'
                });
              }}
              required
            >
              <option value="take">Take (Normal Usage)</option>
              <option value="remove">Remove (Damaged/Expired)</option>
            </select>
          </div>
          {takeFormData.action === 'remove' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                value={takeFormData.reason}
                onChange={(e) => setTakeFormData({ ...takeFormData, reason: e.target.value })}
                required
              >
                <option value="damaged">Damaged</option>
                <option value="expired">Expired</option>
                <option value="wastage">Wastage</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={takeFormData.notes}
              onChange={(e) => setTakeFormData({ ...takeFormData, notes: e.target.value })}
              placeholder="Add notes (optional)"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setIsTakeModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {takeFormData.action === 'take' ? 'Take' : 'Remove'} Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Restock Modal */}
      <Modal
        isOpen={isRestockModalOpen}
        onClose={() => setIsRestockModalOpen(false)}
        title="Restock Item"
      >
        {restockItem && (
          <form onSubmit={handleRestockSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item
              </label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
                {restockItem.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Stock
              </label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
                {restockItem.currentStock} {restockItem.unit}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Add
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
                placeholder={`Enter amount in ${restockItem.unit}`}
                required
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => setIsRestockModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Restock
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Add Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Inventory Item"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter item name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {inventoryCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter item description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Stock
              </label>
              <input
                type="number"
                className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                value={formData.currentStock}
                onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                placeholder="Enter current stock"
                min="0"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Stock Level
              </label>
              <input
                type="number"
                className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                value={formData.minimumStock}
                onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                placeholder="Enter minimum stock"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="L">Liter (L)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="g">Gram (g)</option>
                <option value="ml">Milliliter (ml)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier
              </label>
              <input
                type="text"
                className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                placeholder="Enter supplier name"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory; 