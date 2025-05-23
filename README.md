
# 🏡 Property Rental Platform

Welcome to the **Property Rental Platform** – a full-stack solution designed to seamlessly connect **Landlords** 🧑‍💼 and **Tenants** 👨‍💻, with **Admins** 🛡️ managing the ecosystem. From listing properties to real-time chat and rental proposals, this system streamlines property rentals with ease and efficiency.

### 👥 Collaborator

- 🧑‍💻 **GitHub**: <a href="https://github.com/Osama1010C" target="_blank" rel="noopener noreferrer">Osama Ahmed</a> — Backend developer  
- 📂 **Backend Project Repository**: <a href="https://github.com/Osama1010C/RentMate.git" target="_blank" rel="noopener noreferrer">RentMate API Repo</a> — Source code.


## 🚀 Live Demo — Try it Now!

- 🌍 **Frontend**: [Homeless (Vercel)](https://homeless-lovat.vercel.app/)
- ⚙️ **API Swagger**: [RentMate API](http://rentmate.runasp.net/swagger)

> 💡 Explore available properties, register as a landlord, or dive into the API right from your browser!

---

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

## 🧾 Frontend Folder Structure

```
📁 src/
│
├── 📁 components/
│   ├── 📁 Account/           # User profile view/edit
│   ├── 📁 AddProperties/     # Property creation form
│   ├── 📁 Admin/             # Admin panel for managing users/properties
│   ├── 📁 Chat/              # Real-time chat using SignalR
│   ├── 📁 Footer/            # Site-wide footer
│   ├── 📁 Headers/           # Site-wide headers/navigation
│   ├── 📁 Home/              # Homepage & landing layout
│   ├── 📁 LoginSystem/       # Login/Register/Logout logic
│   ├── 📁 MyProperties/      # Landlord's property management dashboard
│   ├── 📁 PendingRentals/    # Admin view for pending rental approvals
│   ├── 📁 RentalsDetails/    # Property detail view
│   ├── 📁 Saved/             # Tenant's saved properties
│   ├── 📁 SearchResult/      # Property search results
│   └── 📁 RTK/               # Redux Toolkit (RTK Query) for API calls
│
├── 📁 types/                 # TypeScript interfaces & models
├── 📁 utils/                 # Utility functions (e.g. image helpers)
├── App.tsx                  # Main app component
├── index.tsx                # ReactDOM render entry
├── App.css / index.css      # Global styles
```

## 🧱 Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | React, RTK Query, Bootstrap          |
| Backend   | ASP.NET Core Web API, SignalR        |
| Database  | SQL Server + EF Core                 |
| Auth      | JWT                                  |
| Docs      | Swagger                              |
| Hosting   | Vercel (Frontend) + Azure/IIS (API)  |

---

### 🚀 Frontend Technologies

- ⚛️ React + TypeScript
- 🧠 Redux Toolkit + RTK Query
- 🎨 Bootstrap (Responsive UI)
- 🧪 React Testing Library
- 🖼️ Image Upload + Preview (Base64)
- 🌐 Routing via React Router

---

## 🛠️ Backend Technologies

- **.NET Core** (Web API)
- **Entity Framework Core** with Scaffolded Reverse Engineering
- **SignalR** for real-time features
- **JWT** for secure authentication
- **Swagger** for API documentation and testing
- **SQL Server** for data persistence

---

## 🧪 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in watch mode.

### `npm run build`
Builds the app for production in the `build` folder.

### `npm run eject`
Copies all config files and dependencies so you can customize the build setup.

---

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)
- [SignalR Docs](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)
- [JWT Guide](https://jwt.io/introduction/)
- [Swagger Documentation](https://swagger.io/docs/)
