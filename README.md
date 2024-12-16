# E-Commerce Application

## Project Overview

The E-Commerce Application is a scalable, high-performance platform for online shopping. It supports users, vendors, and administrators with distinct functionalities and a seamless shopping experience.

**Live Links:**

- [Backend](https://bazaar-bridge.vercel.app/)
- [Frontend](https://bazaar-bridge-front.vercel.app/)

---

## Technology Stack & Packages

### Backend:

- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT-based authentication
- **Image Uploads**: Cloudinary integration
- **Packages**:
  - @prisma/client
  - axios
  - bcrypt
  - cloudinary
  - cookie-parser
  - cors
  - dotenv
  - express
  - jsonwebtoken
  - multer
  - multer-storage-cloudinary
  - nodemailer
  - prisma
  - tsx
  - typescript
  - uuid
  - zod

### DevDependencies:

- @eslint/js
- @types packages (e.g., @types/node, @types/express)
- eslint-config-prettier
- prettier
- ts-node-dev
- typescript-eslint

---

## Features & Functionalities

### Admin Role:

- Manage users (suspend/delete accounts)
- Blacklist vendor shops
- Dynamically manage product categories
- Monitor transactions and platform activities

### Vendor Role:

- Create and manage their shop
- Add/edit/delete products with attributes like name, price, category, inventory count, images, and discounts
- View and respond to customer reviews
- Manage order history

### Customer Role:

- Browse and filter products (e.g., by price, category)
- Add products to the cart and apply coupon codes
- Compare up to three products
- View purchase history
- Leave reviews and ratings for purchased products

### Home Page

- Display all available products from various vendors.
- Prioritize products from followed shops for logged-in users.
- Infinite scrolling for product listing.
- Filtering and searching functionalities (price range, category, keyword, etc.).
- Scroll-to-top button for better navigation.
- Display a list of categories. When a category is clicked, redirect the user to the "All Products" page and automatically filter the products to show only those belonging to the selected category.
- Show flash sale products and add a button at the bottom. After clicking the button, redirect to the flash sale page and display all flash sale products.

### Product Details Page

- Product name, price, category, images, and detailed descriptions.
- Display the shop name with a clickable link redirecting to the shop page.
- Related products section showing products in the same category.
- Customer reviews and ratings for the product.

### Shop Page

- Vendor’s shop name and details.
- List of products belonging to the vendor only.
- Option for customers to add products directly to the cart from the shop page.
- Option for users to follow or unfollow the shop.
- Follower count.

### Cart Functionality

- Products can only be added from one vendor at a time.
- If attempting to add products from another vendor, show a warning with options:
  - Replace the cart with the new product(s).
  - Retain the current cart and cancel the addition.
- Display product details, pricing, and total cost in the cart.

### Checkout

- Apply coupon codes for discounts during checkout.
- Integrate Aamarpay or Stripe for payment processing.

### Order History

- **For Vendors**: View a detailed list of all orders placed for their shop.
- **For Customers**: View their purchase history with product and order details.

### Authentication

- **Signup Page**: Option to register as a user or vendor.
  - If a vendor is selected, redirect them to the dashboard to add their shop name and some initial products.
- **Login Page**: Secure login using JWT.
- **Password Management**:
  - Change password after logging in.
  - Reset password functionality via email.

### Recent Products Page

- Display the last 10 products viewed by the user.
- Include product details, prices, and direct links to the product page.

### Comparison Feature

- Allow users to compare up to three products, but only if the products are from the same category.
- Comparison will be based on attributes such as price, category, ratings, and other relevant details.
- If a user attempts to add a product from a different category for comparison, display a warning message indicating that only products from the same category can be compared.

### Responsive Design

- Mobile and desktop-friendly interface for all users.

---

## Setup Instructions

### Prerequisites:

- Node.js installed
- PostgreSQL database setup
- Cloudinary account for image uploads
- Environment variables configured (e.g., `.env` file)

### Installation:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database using Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Ensure the following variables are configured in a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

---

## Known Issues/Bugs

- None reported as of now.

---

## Key Highlights

- JWT-based authentication for secure access.
- Paginated APIs for scalability.
- Responsive design for seamless mobile and desktop experiences.
- Advanced filtering and search functionalities.
- Integrated third-party services for payments and image uploads.

---

## Contribution

Contributions are welcome. Feel free to open issues or submit pull requests for any improvements or bug fixes.

---

## License

This project is licensed under the [MIT License](LICENSE).
