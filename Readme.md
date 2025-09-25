# Dermatouch Assignment

This repository contains two parts of the assignment:

1. **Backend** – A Node.js + TypeScript based backend project.
2. **Mobile App** – A React Native app built with TypeScript.

Due to bandwidth constraints, I could not complete all features end-to-end.  
However, almost all screens are covered with UI and navigation.

---

## ✅ Completed Work

### Backend (Node.js + Express + TypeScript)

- Backend project initialized
- Express + TypeScript setup done
- Project structured for further development (APIs for auth, products, orders, cart)

### Mobile App (React Native + TypeScript)

- **Project structure** with `navigation`, `screens`, `services`, and `redux`
- **Redux Toolkit** setup for state management
- **Navigation flow** implemented (Auth stack + App stack)
- **Authentication**: login & signup flow (working with dummy details)
- **Product List Screen**: displays dummy products with categories
- **Cart Screen**: displays dummy products in cart
- **Checkout Flow**: UI implemented (dummy flow)
- **Profile/Orders Screen**: displays dummy past orders
- **Attractive UI** with modern styling across screens

---

## ❌ Pending / Not Fully Implemented

- Search functionality (currently UI only)
- Add to Cart functionality (currently UI + dummy state)
- Checkout integration with backend/payment (currently dummy flow)
- Backend APIs for authentication, products, cart, and orders
- Database integration (PostgreSQL/SQLite)

---

## 🚀 Approach to Completion (Next Steps)

If I had more time, I would:

- Implement backend APIs (login, fetch products, place orders) with JWT authentication
- Connect frontend with backend APIs for real data
- Add persistent cart state & order storage
- Integrate Razorpay sandbox for payment
- Add basic admin panel for product CRUD

---

## ⚠️ Note

I have **covered almost all required screens with UI** and ensured navigation + Redux state scaffolding is in place.  
The app demonstrates my ability to structure, design, and set up flows — the missing parts are primarily API integration due to bandwidth constraints.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend (Mobile)**: React Native, TypeScript, Redux Toolkit, React Navigation

---

## Run Instructions

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   npm install
3. Start the server
   npm run dev

###Mobile App

1. Navigate to the mobile app folder:
   cd ReactNativeApp
2. Install Dependencies
   npm install
3. Run the app
   npm run android
   or
   npm run ios
