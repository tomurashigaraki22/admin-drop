# Authentication Service

## Overview
This document describes the authentication service that will handle email/password validation for admin accounts.

## Service Functions

### authenticateAdmin(email, password)
Validates admin credentials against stored admin accounts.

```javascript
async function authenticateAdmin(email, password) {
  // Get admin accounts from localStorage
  const adminAccounts = getAdminAccounts();
  
  // Find account with matching email
  const account = adminAccounts.find(acc => acc.email === email);
  
  // Validate password
  if (account && account.password === password) {
    // Update last login timestamp
    account.lastLogin = new Date();
    saveAdminAccounts(adminAccounts);
    return true;
  }
  
  return false;
}
```

### getAdminAccounts()
Retrieves admin accounts from localStorage, initializing with dummy data if none exist.

```javascript
function getAdminAccounts() {
  const accountsJson = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (accountsJson) {
    return JSON.parse(accountsJson);
  }
  
  // Initialize with dummy data if empty
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(initialAdminAccounts));
  return initialAdminAccounts;
}
```

### saveAdminAccounts(accounts)
Saves admin accounts to localStorage.

```javascript
function saveAdminAccounts(accounts) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(accounts));
}
```

### addAdminAccount(email, password)
Adds a new admin account.

```javascript
function addAdminAccount(email, password) {
  const accounts = getAdminAccounts();
  
  // Check if email already exists
  if (accounts.some(acc => acc.email === email)) {
    throw new Error('Admin with this email already exists');
  }
  
  // Create new account
  const newAccount = {
    id: Date.now().toString(),
    email,
    password,
    createdAt: new Date(),
    lastLogin: null
  };
  
  // Save account
  accounts.push(newAccount);
  saveAdminAccounts(accounts);
  return newAccount;
}
```

### deleteAdminAccount(email)
Deletes an admin account by email.

```javascript
function deleteAdminAccount(email) {
  const accounts = getAdminAccounts();
  const filteredAccounts = accounts.filter(acc => acc.email !== email);
  saveAdminAccounts(filteredAccounts);
  return filteredAccounts.length < accounts.length;
}
```

### getAllAdminAccounts()
Retrieves all admin accounts without passwords.

```javascript
function getAllAdminAccounts() {
  const accounts = getAdminAccounts();
  return accounts.map(({ password, ...rest }) => rest);
}
```

## Storage
Admin accounts are stored in localStorage with the key `adminAccounts`.

## Security Considerations
In a production environment, passwords should be hashed before storage. For this implementation, we're using plain text passwords for simplicity with dummy data.

## Error Handling
The service will throw errors for:
- Duplicate email when adding admin accounts
- Invalid credentials during authentication
- Storage access issues