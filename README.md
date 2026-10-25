# Portfolio Backend API

A RESTful backend for managing portfolio content, including projects, skills, professional experience, education, contact messages, CV links, and authentication.

## Tech Stack

- Node.js
- Express 5
- MongoDB and Mongoose
- JSON Web Tokens
- bcryptjs
- CORS

## Features

- JWT-based authentication
- Secure password hashing with bcrypt
- Public portfolio content endpoints
- Protected administrative CRUD operations
- Project, skill, experience, and education management
- Contact message management
- English and Japanese CV URL management
- Configurable CORS support

## Requirements

- Node.js 18 or newer
- MongoDB
- npm

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Irfananik/portfolio-backend-2026.git
cd portfolio-backend-2026
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=replace-with-a-strong-secret
CLIENT_URL=http://localhost:5173
```

Never commit `.env` files or production secrets to source control.

## Running the Application

Start the development server with automatic restarts:

```bash
npm run dev
```

Start the server normally:

```bash
npm start
```

The API runs by default at:

```text
http://localhost:5000
```

## API Endpoints

All API routes use the `/api` prefix.

### Health Check

| Method | Endpoint | Authentication |
| --- | --- | --- |
| GET | `/` | Public |

### Authentication

| Method | Endpoint | Authentication |
| --- | --- | --- |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |

Register or log in with:

```json
{
  "username": "admin",
  "password": "your-password"
}
```

Authenticated requests must include:

```http
Authorization: Bearer <jwt-token>
```

### Portfolio Resources

| Resource | Public Operations | Protected Operations |
| --- | --- | --- |
| Projects | `GET /api/projects`, `GET /api/projects/:id` | `POST`, `PUT`, `DELETE` |
| Skills | `GET /api/skills`, `GET /api/skills/:id` | `POST`, `PUT`, `DELETE` |
| Experience | `GET /api/experiences`, `GET /api/experiences/:id` | `POST`, `PUT`, `DELETE` |
| Education | `GET /api/education`, `GET /api/education/:id` | `POST`, `PUT`, `DELETE` |
| Contacts | `GET /api/contacts`, `GET /api/contacts/:id`, `POST` | — |

The `:id` parameter is a MongoDB document ID.

### CV Settings

| Method | Endpoint | Authentication |
| --- | --- | --- |
| GET | `/api/settings/cv` | Public |
| POST | `/api/settings/cv` | Required |

Example request:

```json
{
  "en": "/resume_en.pdf",
  "ja": "/resume_ja.pdf"
}
```

## Project Structure

```text
config/         Database configuration
controllers/    Request handlers
middleware/     Authentication middleware
models/         Mongoose schemas
routes/         Express API routes
utils/          Shared utilities
server.js       Application entry point
```

## Error Responses

Errors are returned as JSON:

```json
{
  "message": "Resource not found"
}
```

Common status codes include `200` for successful requests, `201` for created resources, `400` for invalid input, `401` for authentication failures, `404` for missing resources, and `500` for server errors.

## Production Checklist

- Use a strong, unique `JWT_SECRET`.
- Restrict `CLIENT_URL` to the deployed frontend origin.
- Use HTTPS.
- Secure MongoDB network access.
- Keep environment variables outside source control.
- Protect contact-message administration endpoints before production deployment.

## License

This project is licensed under the ISC license.
