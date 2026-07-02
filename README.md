# BlindRd

A full-stack e-commerce application where users can create an account, sign in, browse products designs and save designs to a personal wishlist.

## Features

- User registration and authentication (sign up / sign in)
- Browse products organized by category
- Add and remove products/designs from a personal wishlist
- RESTful API backend with PostgreSQL persistence via Knex

## Tech Stack

**Frontend**

- React (Vite)

**Backend**

- Node.js
- Express

**Database**

- PostgreSQL
- Knex.js (query builder, migrations, and seeds)

## Project Structure

```
SDI-PROJ-3/
├── backend/                 # Express API server
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── BlindRd/                 # React (Vite) frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── css/
│   │   └── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── database/                # Knex config, migrations, and seeds
    ├── migrations/
    │   ├── 20260629155408_category.js
    │   ├── 20260629162630_products.js
    │   ├── 20260629191714_users.js
    │   └── 20260629192612_wishlist.js
    ├── seeds/
    │   ├── 01_category.js
    │   ├── 02_product.js
    │   └── 03_users.js
    ├── .env #currently empty
    ├── package.json
    └── knexfile.js
```

## Prerequisites

- [Node.js]
- [PostgreSQL]
- npm

## Database Schema

| Table        | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `users`      | Stores user account information (email, hashed password, etc.) |
| `categories` | Product categories                                             |
| `products`   | Product/design listings, linked to a category                  |
| `wishlist`   | Join table linking users to saved products                     |

## Future Improvements

- Product search and filtering
- Filtering by category
- User profile page
- Shopping cart and checkout flow
- Admin dashboard for managing products/categories
