# E-commerce Backend API

A robust and scalable backend API for e-commerce applications built with TypeScript, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT
- **Product Management**: CRUD operations for products
- **Order Processing**: Complete order management system
- **File Upload**: Support for product images using Multer
- **Data Validation**: Input validation using validator
- **Security**: Password hashing with bcryptjs
- **Logging**: Request logging with Morgan
- **CORS**: Cross-Origin Resource Sharing enabled
- **TypeScript**: Full type safety and better development experience

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## 🛠️ Development

To start the development server:
```bash
npm run dev
```

To build the project:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## 📁 Project Structure

```
src/
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Utility functions
└── server.ts       # Application entry point
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js
- MongoDB
- TypeScript
- All contributors and maintainers#   f u l l - s t a c k - e - c o m m e r c e - b a c k e n d 
 
 # full-stack-e-commerce-backend
