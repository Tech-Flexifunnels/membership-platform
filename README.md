
# Membership Platform - React Frontend

This project is a modern, responsive frontend for a membership platform, rebuilt with React, Vite, and Tailwind CSS. It includes all student-side features, such as course browsing, video playback, progress tracking, and user profile management.

## Features

- **Authentication**: Secure login with email and password.
- **Dashboard**: A personalized dashboard displaying all enrolled courses.
- **Course Details**: A dedicated page for each course with a video player, lesson list, and progress tracking.
- **User Profile**: A page for users to view their profile information.
- **Responsive Design**: Fully responsive layout that works on all devices.
- **Modern Tech Stack**: Built with React, Vite, Tailwind CSS, and React Query for a fast and efficient user experience.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/membership-platform.git
   cd membership-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build, run:

```bash
npm run build
```

The optimized and minified files will be generated in the `dist` directory.

## Project Structure

```
/src
|-- components/
|   |-- common/      # Reusable components (Button, Input, etc.)
|   |-- course/      # Course-related components
|   |-- layout/      # Layout components (Header, Footer)
|   `-- profile/     # Profile-related components
|-- context/         # React Context for state management
|-- data/            # Mock data
|-- hooks/           # Custom React hooks
|-- pages/           # Main pages (Login, Dashboard, etc.)
|-- utils/           # Utility functions and constants
|-- App.jsx          # Main App component with routing
|-- index.css        # Global CSS styles
`-- main.jsx         # Application entry point
```

## Learn More

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)

