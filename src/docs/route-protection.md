# Route Protection for Admin-Only Pages

## Overview
This document describes how to implement route protection to ensure only authenticated administrators can access admin-only pages.

## Current Implementation
The current application uses a simple authentication check in the App component:
- If authenticated, show the main application with sidebar and routes
- If not authenticated, show the login page

## Updated Implementation

### Protected Route Component
We will create a `ProtectedRoute` component that wraps admin-only routes:

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

### Updated App Component
The App component will be updated to use the ProtectedRoute component:

```jsx
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const authToken = localStorage.getItem('authToken');
    
    // Check both authentication flag and token
    if (auth === 'true' && authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminEmail');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {!isAuthenticated ? (
          <Login setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar handleLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/drop-analytics" element={<Analytics2 />} />
                <Route path="/rides" element={<Rides />} />
                <Route path="/verify-drivers" element={<VerifyDrivers />} />
                <Route 
                  path="/admin-accounts" 
                  element={
                    <ProtectedRoute>
                      <AdminAccounts />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-admin" 
                  element={
                    <ProtectedRoute>
                      <AddAdmin />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
}
```

### Enhanced Authentication Check
We can enhance the authentication check to be more robust:

```javascript
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      const authToken = localStorage.getItem('authToken');
      
      // Check both authentication flag and token
      if (auth === 'true' && authToken) {
        // Optional: Check token expiration
        const tokenTimestamp = parseInt(authToken);
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (now - tokenTimestamp < oneDay) {
          setIsAuthenticated(true);
        } else {
          // Token expired, logout
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminEmail');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
}
```

### Integration Points
- React Router for route management
- localStorage for authentication state
- ProtectedRoute component for wrapping admin-only components
- App component for overall route structure

## Security Considerations
- Client-side route protection is not sufficient for real security
- In a production application, server-side authentication should be used
- Token expiration helps prevent unauthorized access
- Sensitive data should not be accessible through client-side routes alone

## Error Handling
- Redirect unauthenticated users to login page
- Handle token expiration gracefully
- Maintain consistent user experience during authentication checks