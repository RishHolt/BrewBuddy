# BrewBuddy - Milk Tea & Coffee Shop Management UI

A modern, responsive front-end application for managing a milk tea and coffee shop. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Dashboard**: View daily sales, top-selling items, and low-stock ingredients
- 🛍️ **Order Management**: Create orders with customizable options for drinks and side dishes
- 📝 **Menu Management**: Add, edit, and delete menu items
- 📦 **Inventory Tracking**: Monitor stock levels and restock items
- 📈 **Sales Reports**: View and analyze sales data with filtering options

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- SweetAlert2 for notifications
- Heroicons for icons
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RishHolt/brewbuddy.git
   cd brewbuddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── layout/        # Layout components like Sidebar and TopBar
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── OrderPage.tsx
│   ├── MenuManager.tsx
│   ├── Inventory.tsx
│   └── SalesReport.tsx
└── index.css         # Global styles and Tailwind directives
```

## Color Scheme

- Primary (Coffee Black): #2C2A28
- Secondary (Cream White): #F5F5F5
- Accent (Mocha Beige): #C7A17A
- Text (Deep Charcoal): #333333
- Button (Latte Brown): #8B6D5C
- Button Hover (Light Mocha): #A68A75

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 