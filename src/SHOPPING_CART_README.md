# Moussestruck E-Commerce Features

## Overview
This website includes a fully functional shopping cart system with user authentication. Users must register/login before they can add items to their cart and place orders.

## Features

### 1. User Authentication
- **Registration**: New users can create an account with:
  - Full name
  - Email address
  - Password (minimum 6 characters)
  - Phone number
  - Delivery address
- **Login**: Existing users can log in with email and password
- **Session Persistence**: User stays logged in across page refreshes
- **Logout**: Users can log out anytime from the header

### 2. Shopping Cart
- **Add to Cart**: Click "Add to Cart" on any product (requires login)
- **View Cart**: Click the cart icon in header to view cart items
- **Update Quantity**: Increase or decrease item quantities
- **Remove Items**: Remove individual items from cart
- **Cart Badge**: Shows total number of items in cart
- **Persistent Cart**: Cart data saved in browser localStorage

### 3. Checkout Process
1. **View Cart**: Review all items in the cart drawer
2. **Proceed to Checkout**: Click "Proceed to Checkout"
3. **Review Order**: See delivery info and order summary
4. **Add Special Instructions**: Optional notes for the order
5. **Place Order**: Submit order and receive confirmation

### 4. Order Email System
When an order is placed:
- **Email Generated**: Beautiful HTML email with all order details
- **Recipient**: thatsit120802@gmail.com
- **From**: Customer's email address
- **Subject Format**: `Order No 2301 - December 3, 2025, 10:30 AM`
- **Contents**:
  - Order number and timestamp
  - Customer details (name, email, phone, address)
  - All order items with quantities and prices
  - Subtotal, delivery fee, and total amount
  - Special instructions (if any)

## Data Storage

All data is stored in browser localStorage:

### Users Data
```javascript
localStorage.getItem('moussestruck_users')
// Stores array of registered users with hashed passwords
```

### Current User Session
```javascript
localStorage.getItem('moussestruck_user')
// Stores currently logged-in user info
```

### Shopping Cart
```javascript
localStorage.getItem('moussestruck_cart')
// Stores cart items with quantities
```

### Order History
```javascript
localStorage.getItem('moussestruck_orders')
// Stores completed orders
```

## User Flow

### First Time User
1. Browse products on the menu
2. Click "Add to Cart" or "Login to Order"
3. Register for a new account
4. Automatically logged in after registration
5. Add products to cart
6. View cart and proceed to checkout
7. Place order and receive email confirmation

### Returning User
1. Log in with email and password
2. Previous cart items are restored
3. Continue shopping or checkout
4. Place order

## Security Notes

⚠️ **Important**: This is a frontend-only implementation using localStorage for demonstration purposes.

For production use, you should:
- Implement proper backend authentication
- Hash passwords securely on the server
- Store user data in a secure database
- Use JWT tokens or session cookies
- Validate all data on the server
- Use a proper email service (SendGrid, Mailgun, etc.)
- Implement payment processing (Stripe, PayPal, etc.)
- Add HTTPS encryption
- Implement CSRF protection
- Add rate limiting

## Testing

### Test Account
You can create a test account with any details, for example:
- Name: John Doe
- Email: john@example.com
- Password: test123
- Phone: +1 (555) 123-4567
- Address: 123 Main St, City, State, ZIP

### Test Flow
1. Register a new account
2. Add multiple items to cart
3. Update quantities
4. Remove an item
5. Proceed to checkout
6. Add special instructions
7. Place order
8. Email client will open with pre-filled order details

## Components

### Context Providers
- **AuthContext**: Manages user authentication state
- **CartContext**: Manages shopping cart state

### Components
- **AuthModal**: Login and registration forms
- **CartDrawer**: Slide-out cart panel
- **CheckoutModal**: Checkout and order placement
- **Toast**: Success/error notifications
- **Header**: Shows cart count and user status

### Integration
All components are integrated in `/App.tsx` with the context providers wrapping the entire application.

## Customization

### Email Template
Edit `/components/CheckoutModal.tsx` to customize the email template with your branding.

### Order Number
Currently generates random order numbers (2000-2999). Modify the `generateOrderNumber()` function for sequential numbering.

### Delivery Fee
Currently set to $5.00. Update in `/components/CartDrawer.tsx` and `/components/CheckoutModal.tsx`.

### Product Data
All products are in `/data/siteData.tsx`. Add, remove, or modify products there.

## Browser Compatibility

Works in all modern browsers that support:
- localStorage
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS backdrop-filter

## Performance

- Cart updates are instant (localStorage)
- No API calls needed for basic functionality
- Smooth animations with Framer Motion
- Responsive design for all devices
