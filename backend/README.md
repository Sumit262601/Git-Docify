# GitDocify Backend API

A robust Node.js backend API for GitDocify with authentication, MongoDB integration, and GitHub OAuth.

## Features

- **Authentication System**
  - Local authentication (email/password)
  - GitHub OAuth integration
  - JWT token-based authentication
  - Session management
  - Password hashing with bcrypt

- **User Management**
  - User registration and login
  - Profile management
  - Subscription tracking
  - Usage analytics
  - Admin panel support

- **Security**
  - Rate limiting
  - CORS protection
  - Helmet security headers
  - Input validation
  - Password strength requirements

- **Database**
  - MongoDB with Mongoose ODM
  - User schema with validation
  - Subscription and usage tracking
  - Indexing for performance

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- GitHub OAuth App (for GitHub authentication)

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables in `.env`:**
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/gitdocify
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   
   # GitHub OAuth (get from GitHub Developer Settings)
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret to your `.env` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/profile` - Update profile

### Users
- `GET /api/users/stats` - Get user statistics
- `POST /api/users/generate-readme` - Generate README (with usage tracking)
- `GET /api/users` - Get all users (admin only)

### Health Check
- `GET /health` - API health status

## Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmEmail": "john@example.com"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Access Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (hashed),
  name: String (required),
  avatar: String,
  githubId: String (unique),
  githubUsername: String,
  provider: String (local/github),
  subscription: {
    plan: String (free/starter/monthly/lifetime),
    status: String (active/inactive/cancelled),
    expiresAt: Date
  },
  usage: {
    readmeGenerations: Number,
    monthlyLimit: Number
  },
  role: String (user/admin),
  timestamps: true
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Authentication Rate Limiting**: 5 attempts per 15 minutes
- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Tokens**: Secure token-based authentication
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers protection
- **Input Validation**: Mongoose schema validation

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Rate limiting errors
- Generic server errors

All errors return consistent JSON format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Development

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Project Structure
```
backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── passport.js      # Passport strategies
├── middleware/
│   └── auth.js          # Authentication middleware
├── models/
│   └── User.js          # User model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── users.js         # User management routes
├── .env.example         # Environment template
├── server.js            # Main server file
└── README.md           # This file
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure session cookies
4. Configure proper CORS origins
5. Use HTTPS in production
6. Set up proper logging
7. Configure GitHub OAuth callback URL for production domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details