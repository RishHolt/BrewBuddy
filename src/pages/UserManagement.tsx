import React, { useState } from 'react';
import { UserIcon, PencilIcon, TrashIcon, PlusIcon, KeyIcon, EyeIcon, UsersIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import Swal from 'sweetalert2';

// Dummy user data - replace with actual API calls in production
const initialUsers = [
  { id: 1, name: 'Jonathan Evora', username: 'jonathan_e', role: 'Admin', lastActive: '2024-03-20', email: 'jonathan.evora@brewbuddy.com', contact: '+63 912 345 6789' },
  { id: 2, name: 'James Mendoza', username: 'james_m', role: 'Manager', lastActive: '2024-03-19', email: 'james.mendoza@brewbuddy.com', contact: '+63 923 456 7890' },
  { id: 3, name: 'Kim Fuentes', username: 'kim_f', role: 'Staff', lastActive: '2024-03-18', email: 'kim.fuentes@brewbuddy.com', contact: '+63 934 567 8901' },
  { id: 4, name: 'Lei Elcano', username: 'lei_e', role: 'Staff', lastActive: '2024-03-17', email: 'lei.elcano@brewbuddy.com', contact: '+63 945 678 9012' },
  { id: 5, name: 'Derrick Visca', username: 'derrick_v', role: 'Manager', lastActive: '2024-03-16', email: 'derrick.visca@brewbuddy.com', contact: '+63 956 789 0123' },
  { id: 6, name: 'Sammuel Nolasco', username: 'sammuel_n', role: 'Staff', lastActive: '2024-03-15', email: 'sammuel.nolasco@brewbuddy.com', contact: '+63 967 890 1234' },
];

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  lastActive: string;
  email: string;
  contact: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: 'Staff',
    password: '',
    email: '',
    contact: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: '', username: '', role: 'Staff', password: '', email: '', contact: '' });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      role: user.role,
      password: '',
      email: user.email,
      contact: user.contact,
    });
    setIsModalOpen(true);
  };

  const handlePasswordChange = (user: User) => {
    setEditingUser(user);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsPasswordModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C7A17A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(user => user.id !== userId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The user has been removed.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleViewUser = (user: User) => {
    setViewingUser(user);
    setIsViewModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.username || !formData.email || !formData.contact || (!editingUser && !formData.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
      });
      return;
    }

    // Contact number validation (simple format check)
    const contactRegex = /^\+63 \d{3} \d{3} \d{4}$/;
    if (!contactRegex.test(formData.contact)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Contact number should be in the format: +63 XXX XXX XXXX',
      });
      return;
    }

    // Username validation (only alphanumeric and underscore)
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username',
        text: 'Username can only contain letters, numbers, and underscores',
      });
      return;
    }

    // Check for duplicate username
    const isDuplicateUsername = users.some(user => 
      user.username === formData.username && (!editingUser || user.id !== editingUser.id)
    );

    if (isDuplicateUsername) {
      Swal.fire({
        icon: 'error',
        title: 'Username Taken',
        text: 'This username is already in use',
      });
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(users.map(user =>
        user.id === editingUser.id
          ? { 
              ...user, 
              name: formData.name, 
              username: formData.username, 
              role: formData.role,
              email: formData.email,
              contact: formData.contact,
            }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: users.length + 1,
        name: formData.name,
        username: formData.username,
        role: formData.role,
        email: formData.email,
        contact: formData.contact,
        lastActive: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
    Swal.fire({
      icon: 'success',
      title: `User ${editingUser ? 'Updated' : 'Added'}!`,
      text: editingUser 
        ? `${formData.name}'s information has been updated`
        : `${formData.name} has been added to the system`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password fields
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all password fields',
      });
      return;
    }

    // Check if new password meets requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(passwordData.newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must be at least 8 characters long and contain both letters and numbers',
      });
      return;
    }

    // Check if passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New password and confirmation do not match',
      });
      return;
    }

    setIsPasswordModalOpen(false);
    Swal.fire({
      icon: 'success',
      title: 'Password Updated!',
      text: 'The password has been changed successfully',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-text">User Management</h1>
        </div>
        <button
          onClick={handleAddUser}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="card bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <UsersIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-text">Users List</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-accent" />
                      </div>
                      <div className="ml-3">
                        <div className="text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-900">{user.username}</td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-gray-500">{user.lastActive}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Edit User"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handlePasswordChange(user)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Change Password"
                      >
                        <KeyIcon className="h-4 w-4 text-accent" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Delete User"
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* View User Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
      >
        {viewingUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-text">{viewingUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Username</label>
              <p className="mt-1 text-text">{viewingUser.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-text">{viewingUser.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Contact Number</label>
              <p className="mt-1 text-text">{viewingUser.contact}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Role</label>
              <span className={`mt-1 inline-flex px-2 py-1 rounded-full text-xs font-medium
                ${viewingUser.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                  viewingUser.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                {viewingUser.role}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Last Active</label>
              <p className="mt-1 text-text">{viewingUser.lastActive}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="user@brewbuddy.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              className="input"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              placeholder="+63 XXX XXX XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {!editingUser && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingUser}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingUser ? 'Update' : 'Add'} User
            </button>
          </div>
        </form>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title={`Change Password - ${editingUser?.name}`}
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              className="input"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="input"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Password must be at least 8 characters long and contain both letters and numbers
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className="input"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Change Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement; 