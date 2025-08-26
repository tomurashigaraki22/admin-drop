# Authentication System Architecture

## Overview
This document describes the improved authentication system for the admin dashboard, which will include email/password authentication and separate admin account management.

## Components

### 1. Login Component
- Email and password input fields
- Form validation
- Authentication service integration
- Error handling

### 2. Authentication Service
- Validate email/password credentials
- Manage authentication state
- Handle localStorage persistence
- Provide authentication status to other components

### 3. Admin Accounts Management
- View existing admin accounts
- Add new admin accounts
- Delete admin accounts
- Update admin account details

### 4. Route Protection
- Protect admin-only routes
- Redirect unauthenticated users to login

## Data Structure

### Admin Account Object
```javascript
{
  id: string,
  email: string,
  password: string, // Will be hashed in real implementation
  createdAt: Date,
  lastLogin: Date
}
```

### Initial Dummy Data
```javascript
const initialAdminAccounts = [
  {
    id: '1',
    email: 'admin@twinkklesdrop.com',
    password: 'admin123',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2023-01-01')
  },
  {
    id: '2',
    email: 'superadmin@twinkklesdrop.com',
    password: 'superadmin123',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2023-01-01')
  }
];
```

### Storage
Admin accounts will be stored in localStorage with the key `adminAccounts`. On first load, if no accounts exist, the initial dummy data will be used.

## Authentication Flow

```mermaid
graph TD
    A[User visits app] --> B{Already authenticated?}
    B -->|Yes| C[Show dashboard]
    B -->|No| D[Show login page]
    D --> E[Enter email/password]
    E --> F[Submit credentials]
    F --> G{Valid credentials?}
    G -->|Yes| H[Set authentication state]
    G -->|No| I[Show error message]
    H --> C
```

## Admin Management Flow

```mermaid
graph TD
    A[Admin dashboard] --> B{Navigate to Admin Accounts}
    B --> C[View admin accounts list]
    C --> D[Add new admin account]
    C --> E[Delete admin account]
    D --> F[Enter email/password]
    F --> G[Save new admin]
    G --> H[Update admin list]
    E --> I[Confirm deletion]
    I --> J[Remove admin from list]
```

## Implementation Plan

1. Update Login component to support email/password authentication
2. Create authentication service with localStorage persistence
3. Implement admin accounts data structure with dummy data
4. Create AdminAccounts component for managing admin users
5. Create AddAdmin component for adding new admin accounts
6. Update Sidebar navigation to include admin management pages
7. Add route protection for admin-only pages