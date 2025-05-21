import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MenuManager from './pages/MenuManager';
import SalesReport from './pages/SalesReport';
import OrderPage from './pages/OrderPage';
import OrderDetails from './pages/OrderDetails';
import Inventory from './pages/Inventory';
import InventoryLogs from './pages/InventoryLogs';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="menu" element={<MenuManager />} />
              <Route path="sales" element={<SalesReport />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="order-details" element={<OrderDetails />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory-logs" element={<InventoryLogs />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 