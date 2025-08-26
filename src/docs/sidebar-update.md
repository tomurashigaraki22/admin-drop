# Sidebar Update

## Overview
This document describes the changes to the Sidebar component to include navigation to admin management pages.

## Current Implementation
The current sidebar has navigation items for:
- Dashboard
- Users
- Analytics
- Rides
- Verify Drivers

## Updated Implementation

### New Navigation Items
We will add an "Admin Accounts" item to the sidebar menu that links to the admin accounts management page.

### Updated Menu Items Structure
```javascript
const menuItems = [
  { path: '/', label: 'Dashboard', icon: MdDashboard },
  { path: '/users', label: 'Users', icon: FaUsers },
  { path: '/drop-analytics', label: 'Analytics', icon: MdAnalytics },
  { path: '/rides', label: 'Rides', icon: FaCar },
  {
    label: 'Verify Drivers',
    icon: FaUserCheck,
    path: '/verify-drivers'
  },
  {
    label: 'Admin Accounts',
    icon: FaUserShield, // New icon for admin accounts
    path: '/admin-accounts'
  }
];
```

### Component Integration
The updated Sidebar component will include the new navigation item:

```jsx
function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: MdDashboard },
    { path: '/users', label: 'Users', icon: FaUsers },
    { path: '/drop-analytics', label: 'Analytics', icon: MdAnalytics },
    { path: '/rides', label: 'Rides', icon: FaCar },
    {
      label: 'Verify Drivers',
      icon: FaUserCheck,
      path: '/verify-drivers'
    },
    {
      label: 'Admin Accounts',
      icon: FaUserShield,
      path: '/admin-accounts'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminEmail');
    navigate('/login');
    window.location.reload();
  };

  return (
    <aside className={`${
      isCollapsed ? 'w-20' : 'w-64'
    } bg-white h-screen shadow-lg flex flex-col transition-all duration-300 flex-shrink-0`}>
      <div className="p-6 border-b flex justify-between items-center">
        {!isCollapsed && <h1 className="text-2xl font-bold text-primary">Twinkkles Drop</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-primary/10 text-primary' : ''
              }`
            }
          >
            <span className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
              {<item.icon className="w-5 h-5" />}
            </span>
            {!isCollapsed && item.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 mt-auto mb-4"
      >
        <span className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
          <MdLogout className="w-5 h-5" />
        </span>
        {!isCollapsed && 'Logout'}
      </button>
    </aside>
  );
}
```

### Icon Requirements
We need to import the `FaUserShield` icon from `react-icons/fa` for the admin accounts menu item.

### Integration Points
- React Router for navigation
- React Icons for UI elements
- Authentication state management in logout handler

## Security Considerations
The admin accounts page should only be accessible to authenticated administrators, which will be handled by route protection.