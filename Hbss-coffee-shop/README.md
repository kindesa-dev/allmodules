# Hbss Coffee Shop

A modern, responsive coffee shop web application built with React, Vite, and Tailwind CSS. Features a complete e-commerce flow including product browsing, cart management, and checkout.

## Features

- **Home Page** - Hero section, popular products preview, about section, and contact information
- **Menu Page** - Full product catalog with search and category filtering
- **Product Details** - Detailed view of each coffee product
- **Shopping Cart** - Add/remove items, adjust quantities, persistent cart via localStorage
- **Checkout** - Form validation, order summary, order confirmation
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Custom Theme** - Coffee-inspired color palette

## Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **React Icons** - Icon library
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Hbss-coffee-shop

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
src/
├── assets/           # Images (optimized WebP format)
├── components/       # Reusable UI components
│   ├── AddToCart.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   └── ProductPreview.jsx
├── context/          # React Context providers
│   └── CartContext.jsx
├── data/             # Static data
│   └── product.js
├── pages/            # Page components
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── NotFound.jsx
│   └── ProductDetails.jsx
├── App.jsx           # Main app with routing
├── main.jsx          # Entry point
└── index.css         # Global styles + Tailwind theme
```

## Custom Tailwind Theme

The project uses a custom coffee-inspired color palette defined in `src/index.css`:

```css
@theme {
  --color-coffee-brown: #562F00;
  --color-coffee-caramel: #FFCE99;
  --color-coffee-orange: #FF9644;
  --color-coffee-cream: #FFFDF5;
}
```

## Cart Persistence

The shopping cart is persisted to `localStorage` automatically. Cart state survives page refreshes and browser sessions.

## Image Optimization

All product images and hero image are optimized to WebP format for faster loading. Original high-resolution images were compressed from 1-4MB down to 15-264KB.

## Future Improvements

- [ ] User authentication (Sign In/Sign Up)
- [ ] Order history
- [ ] Payment integration
- [ ] Admin dashboard for product management
- [ ] Unit and integration tests
- [ ] TypeScript migration
- [ ] PWA support

## License

MIT License - feel free to use this project for learning or commercial purposes.