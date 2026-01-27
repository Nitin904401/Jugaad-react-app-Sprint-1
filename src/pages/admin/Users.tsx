import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserStatus, deleteUser } from '../../api/users';
import Modal from '../../Components/common/Modal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

interface ConfirmModal {
  isOpen: boolean;
  userId: string;
  userName: string;
}

export const AdminUsersPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>({
    isOpen: false,
    userId: '',
    userName: '',
  });
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to load users',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    setUpdatingUserId(userId);
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';

    try {
      await updateUserStatus(userId, newStatus);
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: `User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`,
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to update user status',
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async () => {
    const userId = confirmModal.userId;
    setDeletingUserId(userId);
    setConfirmModal({ isOpen: false, userId: '', userName: '' });

    try {
      await deleteUser(userId);
      // Remove from local state
      setUsers(users.filter(user => user.id !== userId));
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'User deleted successfully',
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to delete user',
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && user.status === 'active') ||
      (statusFilter === 'Blocked' && user.status === 'blocked');
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-white text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
      
      </div>

      {/* Filters */}
      <div className="p-4 flex flex-wrap gap-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur mb-6">
        <div className="flex-grow">
          <div className="flex h-12 rounded-lg bg-white/5 border border-white/10 focus-within:border-blue-500 transition">
            <span className="px-4 flex items-center text-white/50">🔍</span>
            <input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 px-2 text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
        </div>

        {['All', 'Active', 'Blocked'].map((label) => (
          <button
            key={label}
            onClick={() => setStatusFilter(label)}
            className={`flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition ${
              label === statusFilter
                ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
          >
            {label}
            <span>▼</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 text-white/60 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left w-[40%]">User Info</th>
              <th className="px-6 py-4 text-left w-[20%]">Role</th>
              <th className="px-6 py-4 text-left w-[20%]">Status</th>
              <th className="px-6 py-4 text-left w-[20%]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-white/60 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/80 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span
                        className={`font-medium capitalize ${
                          user.status === 'active' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        disabled={updatingUserId === user.id || deletingUserId === user.id}
                        className={`flex items-center gap-2 font-bold transition disabled:opacity-50 min-w-[120px] ${
                          user.status === 'active'
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-green-400 hover:text-green-300'
                        }`}
                        title={user.status === 'active' ? 'Block user' : 'Unblock user'}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {user.status === 'active' ? 'block' : 'check_circle'}
                        </span>
                        {updatingUserId === user.id ? 'Updating...' : (user.status === 'active' ? 'Block' : 'Unblock')}
                      </button>

                      <button
                        onClick={() => setConfirmModal({ isOpen: true, userId: user.id, userName: user.name })}
                        disabled={updatingUserId === user.id || deletingUserId === user.id}
                        className="flex items-center justify-center font-bold text-white hover:text-red-300 transition disabled:opacity-50"
                        title="Delete user"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-white/60">
                  No users found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Confirmation Modal for Delete */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
              <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
            </div>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete user <span className="font-bold text-white">{confirmModal.userName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal({ isOpen: false, userId: '', userName: '' })}
                className="flex-1 h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 h-11 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
