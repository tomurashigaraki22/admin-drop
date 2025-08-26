# localStorage Implementation for Admin Accounts

## Overview
This document describes how admin accounts will be stored and managed using localStorage.

## Storage Key
Admin accounts will be stored in localStorage with the key: `adminAccounts`

## Data Structure
The stored data will be a JSON string representation of an array of admin account objects:

```javascript
[
  {
    id: string,
    email: string,
    password: string,
    createdAt: Date,
    lastLogin: Date
  },
  // ... more admin accounts
]
```

## Implementation Details

### Initialization
On first load, if no admin accounts exist in localStorage, the system will initialize with dummy data:

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

### Storage Functions

#### getAdminAccounts()
Retrieves admin accounts from localStorage:
```javascript
function getAdminAccounts() {
  const accountsJson = localStorage.getItem('adminAccounts');
  if (accountsJson) {
    return JSON.parse(accountsJson);
  }
  
  // Initialize with dummy data if empty
  localStorage.setItem('adminAccounts', JSON.stringify(initialAdminAccounts));
  return initialAdminAccounts;
}
```

#### saveAdminAccounts(accounts)
Saves admin accounts to localStorage:
```javascript
function saveAdminAccounts(accounts) {
  localStorage.setItem('adminAccounts', JSON.stringify(accounts));
}
```

### Data Operations

#### Adding Accounts
When adding a new admin account:
1. Retrieve existing accounts from localStorage
2. Check for duplicate email
3. Add new account to array
4. Save updated array to localStorage

#### Deleting Accounts
When deleting an admin account:
1. Retrieve existing accounts from localStorage
2. Filter out account with matching email
3. Save updated array to localStorage

#### Updating Accounts
When updating an admin account (e.g., last login):
1. Retrieve existing accounts from localStorage
2. Find and update the matching account
3. Save updated array to localStorage

## Error Handling
The implementation will handle potential localStorage errors:
- Quota exceeded errors
- Storage access errors
- JSON parsing errors

## Security Considerations
- In a production environment, passwords should be hashed before storage
- localStorage is not secure for sensitive data in real applications
- For this implementation, plain text passwords are used for simplicity with dummy data

## Performance Considerations
- All operations are synchronous and fast for small datasets