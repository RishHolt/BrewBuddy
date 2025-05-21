import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import Modal from '../components/Modal';

interface MenuItem {
  id: string;
  name: string;
  type: 'Drink' | 'Side Dish';
  category: string;
  description: string;
  availableSizes?: Array<'S' | 'M' | 'L'>;
  prices?: {
    S?: number;
    M?: number;
    L?: number;
  };
  price?: number; // For side dishes
}

// Drink Categories
const drinkCategories = [
  { id: 'all-drinks', name: 'All Drinks' },
  { id: 'milk-tea', name: 'Milk Tea' },
  { id: 'hot-coffee', name: 'Hot Coffee' },
  { id: 'iced-coffee', name: 'Iced Coffee' },
  { id: 'frappe', name: 'Frappe' },
  { id: 'fruit-tea', name: 'Fruit Tea' },
  { id: 'soda', name: 'Soda Drinks' },
];

// Side Dish Categories
const sideDishCategories = [
  { id: 'all-sides', name: 'All Side Dishes' },
  { id: 'pastries', name: 'Pastries & Breads' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'cakes', name: 'Cakes & Desserts' },
  { id: 'savory', name: 'Savory Snacks' },
  { id: 'cookies', name: 'Cookies & Treats' }
];

// Form Categories (without "All" options)
const formDrinkCategories = [
  { id: 'milk-tea', name: 'Milk Tea' },
  { id: 'hot-coffee', name: 'Hot Coffee' },
  { id: 'iced-coffee', name: 'Iced Coffee' },
  { id: 'frappe', name: 'Frappe' },
  { id: 'fruit-tea', name: 'Fruit Tea' },
  { id: 'soda', name: 'Soda Drinks' },
];

const formSideDishCategories = [
  { id: 'pastries', name: 'Pastries & Breads' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'cakes', name: 'Cakes & Desserts' },
  { id: 'savory', name: 'Savory Snacks' },
  { id: 'cookies', name: 'Cookies & Treats' }
];

const initialMenuItems: MenuItem[] = [
  { 
    id: '1', 
    name: 'Classic Milk Tea',
    type: 'Drink',
    category: 'milk-tea',
    description: 'Traditional milk tea with a perfect balance of tea and cream',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 110.00,
      M: 120.00,
      L: 135.00
    }
  },
  { 
    id: '2', 
    name: 'Taro Milk Tea',
    type: 'Drink',
    category: 'milk-tea',
    description: 'Rich and creamy taro-flavored milk tea',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 125.00,
      M: 135.00,
      L: 150.00
    }
  },
  { 
    id: '3', 
    name: 'Thai Milk Tea',
    type: 'Drink',
    category: 'milk-tea',
    description: 'Authentic Thai tea blend with creamy milk',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 125.00,
      M: 135.00,
      L: 150.00
    }
  },
  {
    id: '4',
    name: 'Okinawa Milk Tea',
    type: 'Drink',
    category: 'milk-tea',
    description: 'Brown sugar milk tea with a rich caramel flavor',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 130.00,
      M: 140.00,
      L: 155.00
    }
  },
  {
    id: '5',
    name: 'Wintermelon Milk Tea',
    type: 'Drink',
    category: 'milk-tea',
    description: 'Unique wintermelon flavor combined with milk tea',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 125.00,
      M: 135.00,
      L: 150.00
    }
  },
  {
    id: '6',
    name: 'Brown Sugar Milk Tea',
    type: 'Drink',
    category: 'milk-tea',
    description: 'Classic milk tea with rich brown sugar syrup',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 135.00,
      M: 145.00,
      L: 160.00
    }
  },
  { 
    id: '7', 
    name: 'Americano',
    type: 'Drink',
    category: 'hot-coffee',
    description: 'Espresso diluted with hot water',
    availableSizes: ['S', 'M'],
    prices: {
      S: 100.00,
      M: 110.00
    }
  },
  {
    id: '8',
    name: 'Cappuccino',
    type: 'Drink',
    category: 'hot-coffee',
    description: 'Espresso topped with foamy milk',
    availableSizes: ['S', 'M'],
    prices: {
      S: 120.00,
      M: 130.00
    }
  },
  { 
    id: '9', 
    name: 'Caffe Latte',
    type: 'Drink',
    category: 'hot-coffee',
    description: 'Espresso with steamed milk and light foam',
    availableSizes: ['S', 'M'],
    prices: {
      S: 115.00,
      M: 125.00
    }
  },
  {
    id: '10',
    name: 'Caffè Mocha',
    type: 'Drink',
    category: 'hot-coffee',
    description: 'Espresso with chocolate and steamed milk',
    availableSizes: ['S', 'M'],
    prices: {
      S: 135.00,
      M: 145.00
    }
  },
  {
    id: '11',
    name: 'Spanish Latte',
    type: 'Drink',
    category: 'hot-coffee',
    description: 'Espresso with condensed milk and regular milk',
    availableSizes: ['S', 'M'],
    prices: {
      S: 140.00,
      M: 150.00
    }
  },
  {
    id: '12',
    name: 'Vanilla Latte',
    type: 'Drink',
    category: 'hot-coffee',
    description: 'Caffè latte with vanilla syrup',
    availableSizes: ['S', 'M'],
    prices: {
      S: 140.00,
      M: 150.00
    }
  },
  {
    id: '13',
    name: 'Iced Americano',
    type: 'Drink',
    category: 'iced-coffee',
    description: 'Chilled espresso with cold water',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 115.00,
      M: 125.00,
      L: 135.00
    }
  },
  {
    id: '14',
    name: 'Iced Cappuccino',
    type: 'Drink',
    category: 'iced-coffee',
    description: 'Chilled espresso with cold milk foam',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 135.00,
      M: 145.00,
      L: 155.00
    }
  },
  {
    id: '15',
    name: 'Iced Caffè Latte',
    type: 'Drink',
    category: 'iced-coffee',
    description: 'Chilled espresso with cold milk',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 135.00,
      M: 145.00,
      L: 155.00
    }
  },
  {
    id: '16',
    name: 'Iced Caffè Mocha',
    type: 'Drink',
    category: 'iced-coffee',
    description: 'Chilled espresso with chocolate and cold milk',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 145.00,
      M: 155.00,
      L: 165.00
    }
  },
  {
    id: '17',
    name: 'Iced Spanish Latte',
    type: 'Drink',
    category: 'iced-coffee',
    description: 'Chilled espresso with condensed milk',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 150.00,
      M: 160.00,
      L: 165.00
    }
  },
  {
    id: '18',
    name: 'Iced Vanilla Latte',
    type: 'Drink',
    category: 'iced-coffee',
    description: 'Chilled vanilla-flavored caffè latte',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 150.00,
      M: 160.00,
      L: 165.00
    }
  },
  {
    id: '19',
    name: 'Mocha Frappe',
    type: 'Drink',
    category: 'frappe',
    description: 'Blended coffee with chocolate and whipped cream',
    availableSizes: ['M', 'L'],
    prices: {
      M: 160.00,
      L: 170.00
    }
  },
  {
    id: '20',
    name: 'Caramel Frappe',
    type: 'Drink',
    category: 'frappe',
    description: 'Blended coffee with caramel and whipped cream',
    availableSizes: ['M', 'L'],
    prices: {
      M: 160.00,
      L: 170.00
    }
  },
  {
    id: '21',
    name: 'Vanilla Frappe',
    type: 'Drink',
    category: 'frappe',
    description: 'Blended coffee with vanilla and whipped cream',
    availableSizes: ['M', 'L'],
    prices: {
      M: 160.00,
      L: 170.00
    }
  },
  {
    id: '22',
    name: 'Oreo Frappe',
    type: 'Drink',
    category: 'frappe',
    description: 'Blended coffee with crushed Oreos and whipped cream',
    availableSizes: ['M', 'L'],
    prices: {
      M: 170.00,
      L: 180.00
    }
  },
  {
    id: '23',
    name: 'Java Chip Frappe',
    type: 'Drink',
    category: 'frappe',
    description: 'Blended coffee with chocolate chips and whipped cream',
    availableSizes: ['M', 'L'],
    prices: {
      M: 170.00,
      L: 180.00
    }
  },
  {
    id: '24',
    name: 'Matcha Frappe',
    type: 'Drink',
    category: 'frappe',
    description: 'Blended green tea with milk and whipped cream',
    availableSizes: ['M', 'L'],
    prices: {
      M: 170.00,
      L: 180.00
    }
  },
  {
    id: '25',
    name: 'Lemon Tea',
    type: 'Drink',
    category: 'fruit-tea',
    description: 'Fresh tea with real lemon',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 115.00,
      M: 125.00,
      L: 135.00
    }
  },
  {
    id: '26',
    name: 'Peach Tea',
    type: 'Drink',
    category: 'fruit-tea',
    description: 'Black tea with peach flavor',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 125.00,
      M: 135.00,
      L: 145.00
    }
  },
  {
    id: '27',
    name: 'Strawberry Tea',
    type: 'Drink',
    category: 'fruit-tea',
    description: 'Black tea with strawberry flavor',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 125.00,
      M: 135.00,
      L: 145.00
    }
  },
  {
    id: '28',
    name: 'Passion Fruit Tea',
    type: 'Drink',
    category: 'fruit-tea',
    description: 'Black tea with tropical passion fruit',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 130.00,
      M: 140.00,
      L: 150.00
    }
  },
  {
    id: '29',
    name: 'Mango Tea',
    type: 'Drink',
    category: 'fruit-tea',
    description: 'Black tea with sweet mango flavor',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 125.00,
      M: 135.00,
      L: 145.00
    }
  },
  {
    id: '30',
    name: 'Lychee Tea',
    type: 'Drink',
    category: 'fruit-tea',
    description: 'Black tea with lychee flavor',
    availableSizes: ['S', 'M', 'L'],
    prices: {
      S: 130.00,
      M: 140.00,
      L: 150.00
    }
  },
  {
    id: '31',
    name: 'Blue Lemonade',
    type: 'Drink',
    category: 'soda',
    description: 'Refreshing blue-colored lemonade soda',
    availableSizes: ['M', 'L'],
    prices: {
      M: 120.00,
      L: 130.00
    }
  },
  {
    id: '32',
    name: 'Strawberry Soda',
    type: 'Drink',
    category: 'soda',
    description: 'Sparkling strawberry-flavored drink',
    availableSizes: ['M', 'L'],
    prices: {
      M: 125.00,
      L: 135.00
    }
  },
  {
    id: '33',
    name: 'Green Apple Soda',
    type: 'Drink',
    category: 'soda',
    description: 'Crisp green apple sparkling drink',
    availableSizes: ['M', 'L'],
    prices: {
      M: 125.00,
      L: 135.00
    }
  },
  {
    id: '34',
    name: 'Peach Mango Soda',
    type: 'Drink',
    category: 'soda',
    description: 'Sparkling drink with peach and mango flavors',
    availableSizes: ['M', 'L'],
    prices: {
      M: 130.00,
      L: 140.00
    }
  },
  {
    id: '35',
    name: 'Passion Fruit Soda',
    type: 'Drink',
    category: 'soda',
    description: 'Tropical passion fruit sparkling drink',
    availableSizes: ['M', 'L'],
    prices: {
      M: 130.00,
      L: 140.00
    }
  },
  {
    id: '36',
    name: 'Mojito',
    type: 'Drink',
    category: 'soda',
    description: 'Classic mint and lime sparkling drink',
    availableSizes: ['M', 'L'],
    prices: {
      M: 135.00,
      L: 145.00
    }
  },
  { 
    id: '37', 
    name: 'Butter Croissant',
    type: 'Side Dish',
    category: 'pastries',
    description: 'Flaky, buttery French pastry',
    price: 85.00
  },
  {
    id: '38',
    name: 'Chocolate Croissant',
    type: 'Side Dish',
    category: 'pastries',
    description: 'Croissant filled with rich chocolate',
    price: 95.00
  },
  {
    id: '39',
    name: 'Danish Pastry',
    type: 'Side Dish',
    category: 'pastries',
    description: 'Sweet pastry with fruit filling',
    price: 90.00
  },
  {
    id: '40',
    name: 'Blueberry Muffin',
    type: 'Side Dish',
    category: 'pastries',
    description: 'Moist muffin loaded with blueberries',
    price: 75.00
  },
  {
    id: '41',
    name: 'Cinnamon Roll',
    type: 'Side Dish',
    category: 'pastries',
    description: 'Soft roll with cinnamon-sugar swirl',
    price: 95.00
  },
  {
    id: '42',
    name: 'Plain Bagel',
    type: 'Side Dish',
    category: 'pastries',
    description: 'Freshly baked New York style bagel',
    price: 70.00
  },
  {
    id: '43',
    name: 'Grilled Cheese Sandwich',
    type: 'Side Dish',
    category: 'sandwiches',
    description: 'Classic comfort food with melted cheese blend',
    price: 145.00
  },
  {
    id: '44',
    name: 'Club Sandwich',
    type: 'Side Dish',
    category: 'sandwiches',
    description: 'Triple-decker with chicken, bacon, and veggies',
    price: 165.00
  },
  {
    id: '45',
    name: 'Tuna Sandwich',
    type: 'Side Dish',
    category: 'sandwiches',
    description: 'Creamy tuna mix with fresh vegetables',
    price: 155.00
  },
  {
    id: '46',
    name: 'Chicken Sandwich',
    type: 'Side Dish',
    category: 'sandwiches',
    description: 'Grilled chicken with lettuce and special sauce',
    price: 165.00
  },
  {
    id: '47',
    name: 'Veggie Delight',
    type: 'Side Dish',
    category: 'sandwiches',
    description: 'Fresh vegetables with hummus spread',
    price: 145.00
  },
  {
    id: '48',
    name: 'Chocolate Cake',
    type: 'Side Dish',
    category: 'cakes',
    description: 'Rich chocolate layer cake',
    price: 125.00
  },
  {
    id: '49',
    name: 'Classic Cheesecake',
    type: 'Side Dish',
    category: 'cakes',
    description: 'Creamy New York style cheesecake',
    price: 135.00
  },
  {
    id: '50',
    name: 'Carrot Cake',
    type: 'Side Dish',
    category: 'cakes',
    description: 'Spiced cake with cream cheese frosting',
    price: 125.00
  },
  {
    id: '51',
    name: 'Tiramisu',
    type: 'Side Dish',
    category: 'cakes',
    description: 'Italian coffee-flavored dessert',
    price: 145.00
  },
  {
    id: '52',
    name: 'Red Velvet Slice',
    type: 'Side Dish',
    category: 'cakes',
    description: 'Classic red velvet with cream cheese',
    price: 135.00
  },
  {
    id: '53',
    name: 'French Fries',
    type: 'Side Dish',
    category: 'savory',
    description: 'Crispy golden fries with seasoning',
    price: 95.00
  },
  {
    id: '54',
    name: 'Loaded Nachos',
    type: 'Side Dish',
    category: 'savory',
    description: 'Tortilla chips with cheese and toppings',
    price: 135.00
  },
  {
    id: '55',
    name: 'Chicken Fingers',
    type: 'Side Dish',
    category: 'savory',
    description: 'Crispy breaded chicken strips',
    price: 145.00
  },
  {
    id: '56',
    name: 'Mozzarella Sticks',
    type: 'Side Dish',
    category: 'savory',
    description: 'Breaded and fried cheese sticks',
    price: 135.00
  },
  {
    id: '57',
    name: 'Onion Rings',
    type: 'Side Dish',
    category: 'savory',
    description: 'Crispy battered onion rings',
    price: 95.00
  },
  { 
    id: '58', 
    name: 'Chocolate Chip Cookies',
    type: 'Side Dish',
    category: 'cookies',
    description: 'Classic cookies (3 pieces)',
    price: 75.00
  },
  {
    id: '59',
    name: 'Oatmeal Raisin Cookies',
    type: 'Side Dish',
    category: 'cookies',
    description: 'Chewy oatmeal cookies (3 pieces)',
    price: 75.00
  },
  {
    id: '60',
    name: 'Matcha Cookies',
    type: 'Side Dish',
    category: 'cookies',
    description: 'Green tea flavored cookies (3 pieces)',
    price: 85.00
  },
  {
    id: '61',
    name: 'Chocolate Brownies',
    type: 'Side Dish',
    category: 'cookies',
    description: 'Fudgy chocolate brownies (2 pieces)',
    price: 95.00
  },
  {
    id: '62',
    name: 'Almond Biscotti',
    type: 'Side Dish',
    category: 'cookies',
    description: 'Crunchy Italian cookies (3 pieces)',
    price: 85.00
  }
];

interface FormData {
  name: string;
  type: 'Drink' | 'Side Dish';
  category: string;
  description: string;
  availableSizes?: Array<'S' | 'M' | 'L'>;
  prices: {
    S: string;
    M: string;
    L: string;
  };
  price: string; // For side dishes only, but always initialized as empty string
}

const initialFormData: FormData = {
  name: '',
  type: 'Drink',
  category: '',
  description: '',
  price: '',
  availableSizes: ['S', 'M', 'L'],
  prices: {
    S: '',
    M: '',
    L: ''
  }
};

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedType, setSelectedType] = useState<'Drink' | 'Side Dish'>('Drink');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleOpenModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        type: item.type,
        category: item.category,
        description: item.description,
        availableSizes: item.availableSizes,
        prices: {
          S: item.prices?.S?.toString() || '',
          M: item.prices?.M?.toString() || '',
          L: item.prices?.L?.toString() || ''
        },
        price: item.price?.toString() || ''
      });
      setSelectedType(item.type);
    } else {
      setEditingItem(null);
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
      });
      return;
    }

    if (formData.type === 'Drink') {
      // Validate drink prices
      const hasValidPrices = formData.availableSizes?.every(size => {
        const price = parseFloat(formData.prices[size]);
        return !isNaN(price) && price > 0;
      });

      if (!hasValidPrices) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Prices',
          text: 'Please enter valid prices for all selected sizes',
        });
        return;
      }
    } else {
      // Validate side dish price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Price',
          text: 'Please enter a valid price',
        });
        return;
      }
    }

    const newItem: MenuItem = {
      id: editingItem?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      category: formData.category,
      description: formData.description,
      availableSizes: formData.type === 'Drink' ? formData.availableSizes : undefined,
      prices: formData.type === 'Drink' ? {
        S: formData.prices.S ? parseFloat(formData.prices.S) : undefined,
        M: formData.prices.M ? parseFloat(formData.prices.M) : undefined,
        L: formData.prices.L ? parseFloat(formData.prices.L) : undefined,
      } : undefined,
      price: formData.type === 'Side Dish' ? parseFloat(formData.price) : undefined,
    };

    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? newItem : item
      ));
    } else {
      setMenuItems([...menuItems, newItem]);
    }

    handleCloseModal();
    Swal.fire({
      icon: 'success',
      title: `Item ${editingItem ? 'Updated' : 'Added'}!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = (item: MenuItem) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C7A17A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setMenuItems(menuItems.filter(i => i.id !== item.id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The item has been removed.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const filteredItems = menuItems.filter(item => 
    (!selectedType || item.type === selectedType) &&
    (!selectedCategory || selectedCategory === 'all-drinks' && item.type === 'Drink' || 
     selectedCategory === 'all-sides' && item.type === 'Side Dish' ||
     item.category === selectedCategory)
  );

  const categories = selectedType === 'Drink' ? drinkCategories : sideDishCategories;

  const handleSizeChange = (size: 'S' | 'M' | 'L', checked: boolean) => {
    const sizes = formData.availableSizes || [];
    if (checked) {
      setFormData({
        ...formData,
        availableSizes: [...sizes, size].sort() as Array<'S' | 'M' | 'L'>
      });
    } else {
      setFormData({
        ...formData,
        availableSizes: sizes.filter(s => s !== size) as Array<'S' | 'M' | 'L'>
      });
    }
  };

  const handleTypeChange = (newType: 'Drink' | 'Side Dish') => {
    setFormData({
      ...formData,
      type: newType,
      category: '',
      availableSizes: newType === 'Drink' ? ['S', 'M', 'L'] : undefined,
      prices: {
        S: '',
        M: '',
        L: ''
      },
      price: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Menu Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Type Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setSelectedType('Drink');
            setSelectedCategory('all-drinks');
          }}
          className={`btn ${selectedType === 'Drink' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Drinks
        </button>
        <button
          onClick={() => {
            setSelectedType('Side Dish');
            setSelectedCategory('all-sides');
          }}
          className={`btn ${selectedType === 'Side Dish' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Side Dishes
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
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

        {/* Menu Items Grid */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-accent/50 transition-all relative group"
              >
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Item"
                  >
                    <PencilIcon className="h-4 w-4 text-accent" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete Item"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 pr-16">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  {item.type === 'Drink' && item.availableSizes && (
                    <div className="mt-2 flex items-center gap-4">
                      {item.availableSizes.map((size) => (
                        <div key={size} className="text-sm">
                          <span className="text-gray-600">{size}</span>
                          <span className="text-accent font-medium ml-1">₱{item.prices?.[size]?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.type === 'Side Dish' && (
                    <p className="text-accent font-medium mt-2">₱{item.price?.toFixed(2)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Item' : 'Add New Item'}
      >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter item name (e.g. Classic Milk Tea)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent"
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value as 'Drink' | 'Side Dish')}
                >
                  <option value="Drink">Drink</option>
                  <option value="Side Dish">Side Dish</option>
                </select>
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
                  {(formData.type === 'Drink' ? formDrinkCategories : formSideDishCategories).map((category) => (
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
                  placeholder="Enter item description (e.g. Traditional milk tea with a perfect balance of tea and cream)"
                  rows={3}
                  required
                />
              </div>
              {formData.type === 'Drink' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Sizes
                    </label>
                    <div className="flex space-x-4">
                      {(['S', 'M', 'L'] as const).map((size) => (
                        <label key={size} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.availableSizes?.includes(size)}
                            onChange={(e) => handleSizeChange(size, e.target.checked)}
                            className="rounded text-accent focus:ring-accent"
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Prices
                    </label>
                    <div className="flex gap-4">
                      {formData.availableSizes?.map((size) => (
                        <div key={size} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{size}</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={formData.prices[size]}
                            onChange={(e) => setFormData({
                              ...formData,
                              prices: {
                                ...formData.prices,
                                [size]: e.target.value
                              }
                            })}
                            placeholder="Enter price"
                            required={formData.availableSizes?.includes(size)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {formData.type === 'Side Dish' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="input w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-accent focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price (e.g. 85.00)"
                    required
                  />
                </div>
              )}
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
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </form>
      </Modal>
    </div>
  );
};

export default MenuManager; 