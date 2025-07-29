import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

const API_URL = 'http://localhost:5000/api/admin/users';

const getToken = () => localStorage.getItem('superadmin_token');

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', name: '', password: '', role: 'admin' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ email: '', name: '', role: 'admin' });

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');
      setForm({ email: '', name: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm({ email: user.email, name: user.name, role: user.role });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update user');
      setEditingId(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to delete user');
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full mb-8 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-2 border text-center">{user.id}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="p-2 border">
                  <button className="text-blue-600 mr-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create User Form */}
      <form onSubmit={handleCreate} className="mb-8 bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-2">Create New User</h3>
        <div className="flex gap-2 mb-2">
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="border px-2 py-1 rounded w-1/4" required />
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border px-2 py-1 rounded w-1/4" required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="border px-2 py-1 rounded w-1/4" required />
          <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="border px-2 py-1 rounded w-1/4">
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
            <option value="manager">manager</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Create User</button>
      </form>

      {/* Edit User Form */}
      {editingId && (
        <form onSubmit={handleUpdate} className="mb-8 bg-yellow-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Edit User</h3>
          <div className="flex gap-2 mb-2">
            <input type="email" placeholder="Email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} className="border px-2 py-1 rounded w-1/4" required />
            <input type="text" placeholder="Name" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="border px-2 py-1 rounded w-1/4" required />
            <select value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} className="border px-2 py-1 rounded w-1/4">
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
              <option value="manager">manager</option>
            </select>
          </div>
          <button type="submit" className="bg-yellow-600 text-white px-4 py-1 rounded mr-2">Update User</button>
          <button type="button" className="bg-gray-300 px-4 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserManagement; 