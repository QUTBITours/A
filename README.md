# QT Holidays Management Application

A comprehensive travel services management application built with React, Firebase, and Tailwind CSS.

## Features

- User authentication with Firebase
- Dashboard with service overview
- Service tracking for:
  - Flight Bookings
  - Hotel Reservations
  - Car Rentals
  - Visa Applications
  - Foreign Exchange
  - Tour Packages
  - Train Bookings
  - Vajabhat
- Real-time data synchronization with Firebase
- Financial summary and analytics
- Data export to Excel
- Responsive design for all devices

## Setup and Deployment

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### GitHub Pages Deployment

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/qtholidays-app"
   ```

2. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Firebase Integration

The application uses Firebase for authentication and data storage. The Firebase configuration is already set up in the project.

## Project Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - React context providers
- `/src/firebase` - Firebase configuration and utility functions
- `/src/pages` - Application pages
- `/src/types` - TypeScript type definitions

## Login Credentials

- Email: qtholidays@gmail.com
- Password: Fatema1422

## Technologies Used

- React with TypeScript
- Firebase (Authentication & Firestore)
- Tailwind CSS for styling
- React Router for navigation
- XLSX for data export
- Lucide React for icons