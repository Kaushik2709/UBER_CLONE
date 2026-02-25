# Uber Clone

A full-stack uber clone application with a React frontend and Node.js/Express backend.

## Project Structure

```
UBER_CLONE/
├── Backend/          # Node.js/Express server
└── Frontend/         # React application
```

## Backend

A Node.js/Express backend with Prisma ORM for database management.

### Features
- User authentication and authorization
- Captain (driver) management
- User and captain authentication middleware
- Database services and controllers

### Tech Stack
- Node.js
- Express.js
- Prisma ORM
- JWT authentication

### Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure your database in `.env` file

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000` (or your configured port)

## Frontend

A React application built with Vite for fast development and optimized production builds.

### Features
- User login and signup
- Captain login and signup
- Protected routes for authenticated users and captains
- Location search panel
- Responsive design

### Tech Stack
- React 18
- Vite
- Context API for state management
- CSS for styling

### Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:5173` (or your configured port)

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `POST /api/users/logout` - Logout user

### Captain Routes
- `POST /api/captains/register` - Register a new captain
- `POST /api/captains/login` - Login captain
- `GET /api/captains/profile` - Get captain profile (protected)
- `POST /api/captains/logout` - Logout captain

## Authentication

The application uses JWT-based authentication with the following flow:
- User/Captain registers with credentials
- Backend validates and returns JWT token
- Token is stored in frontend (localStorage/session)
- Token is sent with each request in Authorization header
- Backend middleware validates token for protected routes

## Database Models

- **User** - Regular user/passenger model
- **Captain** - Driver model
- **BlacklistToken** - Stores invalidated tokens

## Getting Started

1. Clone the repository
2. Set up the Backend (see Backend section above)
3. Set up the Frontend (see Frontend section above)
4. Ensure both services are running
5. Navigate to `http://localhost:5173` to access the application

## Development

### Backend Development
```bash
cd Backend
npm run dev  # For development with auto-reload
```

### Frontend Development
```bash
cd Frontend
npm run dev
```

## Building for Production

### Backend
```bash
cd Backend
npm run build
```

### Frontend
```bash
cd Frontend
npm run build
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

- Ensure both Backend and Frontend are running
- Check that ports 5000 (Backend) and 5173 (Frontend) are available
- Verify database connection in Backend
- Clear browser cache if issues persist

## License

MIT License

## Support

For issues and questions, please contact the development team.
