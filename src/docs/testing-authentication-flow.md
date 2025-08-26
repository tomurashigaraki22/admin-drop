# Testing Authentication Flow with Multiple Admin Accounts

## Overview
This document describes the testing plan for the authentication flow with multiple admin accounts.

## Test Scenarios

### 1. Successful Login with Valid Credentials
**Description**: Test logging in with valid admin credentials
**Preconditions**: 
- System has initial dummy admin accounts
- User is on the login page
**Steps**:
1. Enter valid email (admin@twinkklesdrop.com)
2. Enter valid password (admin123)
3. Click "Login" button
**Expected Results**:
- User is redirected to the dashboard
- Authentication state is set in localStorage
- Admin email is stored in localStorage
- Auth token is stored in localStorage

### 2. Failed Login with Invalid Email
**Description**: Test logging in with an invalid email
**Preconditions**: 
- System has initial dummy admin accounts
- User is on the login page
**Steps**:
1. Enter invalid email (invalid@example.com)
2. Enter any password
3. Click "Login" button
**Expected Results**:
- Error message is displayed: "Invalid email or password"
- User remains on login page
- No authentication state is set

### 3. Failed Login with Invalid Password
**Description**: Test logging in with valid email but invalid password
**Preconditions**: 
- System has initial dummy admin accounts
- User is on the login page
**Steps**:
1. Enter valid email (admin@twinkklesdrop.com)
2. Enter invalid password (wrongpassword)
3. Click "Login" button
**Expected Results**:
- Error message is displayed: "Invalid email or password"
- User remains on login page
- No authentication state is set

### 4. Login with Second Admin Account
**Description**: Test logging in with the second admin account
**Preconditions**: 
- System has initial dummy admin accounts
- User is on the login page
**Steps**:
1. Enter valid email (superadmin@twinkklesdrop.com)
2. Enter valid password (superadmin123)
3. Click "Login" button
**Expected Results**:
- User is redirected to the dashboard
- Authentication state is set in localStorage
- Admin email is stored in localStorage
- Auth token is stored in localStorage

### 5. Form Validation
**Description**: Test form validation for required fields
**Preconditions**: 
- User is on the login page
**Steps**:
1. Leave email field empty
2. Leave password field empty
3. Click "Login" button
**Expected Results**:
- HTML5 validation prevents form submission
- Browser shows validation messages

### 6. Email Format Validation
**Description**: Test email format validation
**Preconditions**: 
- User is on the login page
**Steps**:
1. Enter invalid email format (notanemail)
2. Enter any password
3. Click "Login" button
**Expected Results**:
- HTML5 validation prevents form submission
- Browser shows validation messages

## Test Data
### Initial Admin Accounts
1. Email: admin@twinkklesdrop.com
   Password: admin123
2. Email: superadmin@twinkklesdrop.com
   Password: superadmin123

## Testing Tools
- Browser developer tools for localStorage inspection
- Network tab to verify no external requests during authentication
- Console for error logging

## Success Criteria
- All valid credentials allow access
- All invalid credentials are rejected
- Proper error messages are displayed
- Authentication state is correctly managed
- localStorage is properly updated
- No security vulnerabilities are exposed

## Edge Cases to Test
- Empty form submission
- Special characters in email
- Very long passwords
- Case sensitivity of email
- Multiple failed login attempts
- Session timeout after 24 hours