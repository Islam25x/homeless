
# 🏡 Property Rental Platform

Welcome to the **Property Rental Platform** – a full-stack solution designed to seamlessly connect **Landlords** 🧑‍💼 and **Tenants** 👨‍💻, with **Admins** 🛡️ managing the ecosystem. From listing properties to real-time chat and rental proposals, this system streamlines property rentals with ease and efficiency.

## 🚀 Live Demo — Try it Now!
Experience the platform in action:  
- 🌍 **Frontend**: <a href="https://homeless-lovat.vercel.app/" target="_blank" rel="noopener noreferrer">Homeless</a> — Sleek and responsive user interface for tenants and landlords.  
- ⚙️ **API Swagger**: <a href="http://rentmate.runasp.net/swagger" target="_blank" rel="noopener noreferrer">RentMate API</a> — Fully documented and testable REST API.

> 💡 Explore available properties, register as a landlord, or dive into the API right from your browser!

## 🌟 Features

### 👥 Actors
- 🛡️ **Admin**: Oversees the platform, verifies users, and moderates content.
- 🧑‍💼 **Landlord**: Manages property listings and handles rental applications.
- 👨‍💻 **Tenant**: Explores properties, submits proposals, and communicates in real time.

### 🔐 Authentication & Authorization
- Tenants can **browse properties without logging in**, but need to log in to apply or message.
- Admins **approve or reject** landlord registrations and property listings.
- JWT Authentication integrated with Swagger for secure and easy testing.

### 🏠 Property Listings
- Includes 📛 Landlord Name, 🏷️ Title, 📝 Description, 💰 Price, 📍 Location, 🖼️ Images, 👁️ View Count, and 📌 Rental Status.
- Advanced search: filter by **location**, **price**, and more.
- Realtime status updates using **SignalR**.

### 📄 Rental Proposals
- Tenants can **apply for rentals** with documents.
- Save favorite listings 💾.
- Landlords can **review, accept, or reject** proposals.
- A property becomes **unavailable** once rented.

### 💬 Real-Time Communication
- Built-in **chat system using SignalR** for direct messaging between tenants and landlords.
- Comment system for property discussions.

---

## 🧠 Architecture Overview

```
📁 Controllers         --> API endpoints
📁 DTOModels           --> Request/Response models
📁 Data
    ├── Models         --> Entity models
    └── DbContext      --> Database access (Scaffolded using Reverse Engineering)
📁 Extensions          --> JWT + Service registration helpers
📁 Hub                 --> SignalR hub for real-time chat 💬
📁 Repositories        --> Generic Repository pattern for data access
📁 Services            --> Business logic layer
📁 UOF (Unit of Work)  --> Transaction management layer
```

---

## 🛠️ Technologies Used

- **.NET Core** (Web API)
- **Entity Framework Core** with Scaffolded Reverse Engineering
- **SignalR** for real-time features
- **JWT** for secure authentication
- **Swagger** for API documentation and testing
- **SQL Server** for data persistence

---

## 🗂️ Database Schema

Here is the database schema illustrating the relationships between the entities:

<img src="Data/DB%20Schema.png" alt="Database Schema" width="1000"/>

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
