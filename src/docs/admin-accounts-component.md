# Admin Accounts Component

## Overview
This document describes the AdminAccounts component that will display and manage admin user accounts.

## Component Structure
```jsx
function AdminAccounts() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAdminAccounts();
  }, []);

  const loadAdminAccounts = async () => {
    try {
      setLoading(true);
      const accounts = await getAllAdminAccounts();
      setAdmins(accounts);
    } catch (err) {
      setError('Failed to load admin accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this admin account?')) {
      try {
        await deleteAdminAccount(email);
        setAdmins(admins.filter(admin => admin.email !== email));
        alert('Admin account deleted successfully');
      } catch (err) {
        alert('Failed to delete admin account');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Accounts</h1>
        <Link 
          to="/add-admin" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
        >
          Add New Admin
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {admin.lastLogin 
                        ? new Date(admin.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(admin.email)}
                        className="text-red-600 hover:text-red-900"
                        disabled={admins.length <= 1}
                        title={admins.length <= 1 ? "Cannot delete the last admin" : ""}
                      >
                        <BiTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No admin accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

## Features
1. Display all admin accounts in a table
2. Show account details (email, creation date, last login)
3. Delete admin accounts with confirmation
4. Link to add new admin accounts
5. Loading and error states

## Integration Points
- Authentication service for fetching admin accounts
- AddAdmin component for creating new accounts
- React Router for navigation
- React Icons for UI elements

## Security Considerations
- Prevent deletion of the last admin account
- Confirmation dialog before deletion
- Proper error handling

## Styling
- Uses existing Tailwind classes for consistency
- Responsive table design
- Loading spinner during data fetch