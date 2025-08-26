# Testing Admin Account Management Functionality

## Overview
This document describes the testing plan for the admin account management functionality, including viewing, adding, and deleting admin accounts.

## Test Scenarios

### 1. View Admin Accounts List
**Description**: Test viewing the list of admin accounts
**Preconditions**: 
- User is authenticated as an admin
- System has initial dummy admin accounts
**Steps**:
1. Navigate to Admin Accounts page
2. Observe the displayed admin accounts
**Expected Results**:
- All initial admin accounts are displayed
- Each account shows email, creation date, and last login
- "Add New Admin" button is visible
- Delete buttons are visible for each account

### 2. Add New Admin Account - Valid Data
**Description**: Test adding a new admin account with valid data
**Preconditions**: 
- User is authenticated as an admin
- On the Add Admin page
**Steps**:
1. Enter valid email (newadmin@example.com)
2. Enter valid password (password123)
3. Confirm password (password123)
4. Click "Create Admin" button
**Expected Results**:
- Success message is displayed
- User is redirected to Admin Accounts page
- New admin account appears in the list
- Account is saved in localStorage

### 3. Add New Admin Account - Duplicate Email
**Description**: Test adding a new admin account with an email that already exists
**Preconditions**: 
- User is authenticated as an admin
- On the Add Admin page
- System already has admin@twinkklesdrop.com account
**Steps**:
1. Enter existing email (admin@twinkklesdrop.com)
2. Enter valid password (password123)
3. Confirm password (password123)
4. Click "Create Admin" button
**Expected Results**:
- Error message is displayed: "An admin with this email already exists"
- User remains on Add Admin page
- No new account is added

### 4. Add New Admin Account - Invalid Email Format
**Description**: Test adding a new admin account with invalid email format
**Preconditions**: 
- User is authenticated as an admin
- On the Add Admin page
**Steps**:
1. Enter invalid email (notanemail)
2. Enter valid password (password123)
3. Confirm password (password123)
4. Click "Create Admin" button
**Expected Results**:
- Error message is displayed: "Please enter a valid email address"
- User remains on Add Admin page
- No new account is added

### 5. Add New Admin Account - Password Too Short
**Description**: Test adding a new admin account with password less than 6 characters
**Preconditions**: 
- User is authenticated as an admin
- On the Add Admin page
**Steps**:
1. Enter valid email (newadmin@example.com)
2. Enter short password (123)
3. Confirm password (123)
4. Click "Create Admin" button
**Expected Results**:
- Error message is displayed: "Password must be at least 6 characters"
- User remains on Add Admin page
- No new account is added

### 6. Add New Admin Account - Passwords Do Not Match
**Description**: Test adding a new admin account with non-matching passwords
**Preconditions**: 
- User is authenticated as an admin
- On the Add Admin page
**Steps**:
1. Enter valid email (newadmin@example.com)
2. Enter password (password123)
3. Confirm password (different123)
4. Click "Create Admin" button
**Expected Results**:
- Error message is displayed: "Passwords do not match"
- User remains on Add Admin page
- No new account is added

### 7. Delete Admin Account - Success
**Description**: Test deleting an admin account
**Preconditions**: 
- User is authenticated as an admin
- On the Admin Accounts page
- Multiple admin accounts exist
**Steps**:
1. Click delete button for an admin account
2. Confirm deletion in the dialog
**Expected Results**:
- Confirmation dialog appears
- After confirmation, account is removed from the list
- Account is removed from localStorage
- Success message is displayed

### 8. Delete Admin Account - Cancel
**Description**: Test canceling deletion of an admin account
**Preconditions**: 
- User is authenticated as an admin
- On the Admin Accounts page
**Steps**:
1. Click delete button for an admin account
2. Cancel deletion in the dialog
**Expected Results**:
- Confirmation dialog appears
- After canceling, account remains in the list
- Account remains in localStorage

### 9. Delete Last Admin Account
**Description**: Test attempting to delete the last admin account
**Preconditions**: 
- User is authenticated as an admin
- Only one admin account exists
- On the Admin Accounts page
**Steps**:
1. Click delete button for the last admin account
**Expected Results**:
- Delete button is disabled or not visible
- If clickable, error message is displayed
- Account is not deleted

### 10. Form Validation on Add Admin Page
**Description**: Test form validation for required fields
**Preconditions**: 
- User is authenticated as an admin
- On the Add Admin page
**Steps**:
1. Leave all fields empty
2. Click "Create Admin" button
**Expected Results**:
- Error message is displayed: "All fields are required"
- User remains on Add Admin page
- No new account is added

## Test Data
### Initial Admin Accounts
1. Email: admin@twinkklesdrop.com
   Password: admin123
2. Email: superadmin@twinkklesdrop.com
   Password: superadmin123

### Test Admin Accounts to Add
1. Email: newadmin@example.com
   Password: password123
2. Email: testadmin@example.com
   Password: testpass456

## Testing Tools
- Browser developer tools for localStorage inspection
- Network tab to verify no external requests during operations
- Console for error logging

## Success Criteria
- All valid operations succeed
- All invalid operations are properly rejected
- Proper error messages are displayed
- Data is correctly managed in localStorage
- UI updates correctly after operations
- No data corruption occurs

## Edge Cases to Test
- Adding admin with special characters in email
- Adding admin with very long passwords
- Case sensitivity of email
- Deleting accounts rapidly
- Adding multiple accounts in succession
- Refreshing page after operations
- Concurrent operations (if possible)