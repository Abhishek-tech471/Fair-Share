# Fair Share
# 💸 Fair Share — Expense Sharing Platform

Fair Share is a modern expense-sharing platform that helps users easily split bills, manage group expenses, and track balances with friends, roommates, or groups.
The platform simplifies bill splitting, tracks balances between users, and suggests simplified settlements.

The system is built using a **modern full-stack architecture**:
* **Frontend:-> React + Vite
* **Backend:-> Spring Boot
* **Database:-> PostgreSQL
* **Authentication:-> JWT
* **Charts:-> Recharts

----------------------------------------------------

# 🚀 Features
## Core Features

### 👤 User Authentication
* User registration
* Secure login with JWT authentication
* Protected routes

### 👥 Groups
* Create expense groups
* Add members to groups
* Manage group expenses

### 💳 Expense Management
* Add shared expenses
* Split expenses between multiple users
* Support multiple split methods:
  * Equal
  * Exact amount
  * Percentage

### 📊 Balance Tracking
* Automatic calculation of balances
* View who owes whom
* Track total balance across groups

### 🔄 Debt Simplification
* Smart algorithm to minimize the number of transactions required to settle debts.

### 💰 Settlements
* Record payments between users
* Automatically update balances

### 📜 Activity Feed
* View a timeline of group activity
* Track expense additions and settlements

### 📈 Analytics
* Monthly spending charts
* Group spending insights
* Top spender leaderboard

----------------------------------------------------

# 🏗️ System Architecture
## High-Level Architecture

```
Frontend (React + Vite)
        |
        |
        v
Spring Boot REST API
        |
        |
        v
PostgreSQL Database
```

### Frontend Responsibilities
* UI rendering
* User interaction
* API communication
* Authentication handling

### Backend Responsibilities
* Business logic
* Balance calculation
* Debt simplification algorithm
* Secure authentication
* Database persistence

----------------------------------------------------

# 🧱 Tech Stack Used

## Frontend
* React
* Vite
* React Router
* Axios
* TailwindCSS
* React Query
* Recharts
* Lucide Icons

## Backend
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Hibernate

## Database
* PostgreSQL

----------------------------------------------------

# 📂 Project Structure

## Frontend Structure
```
src
│
├── pages
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── Dashboard.jsx
│   ├── GroupPage.jsx
│   ├── FriendsPage.jsx
│   ├── ActivityPage.jsx
│   └── SettingsPage.jsx
│
├── components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── BalanceSummary.jsx
│   ├── ExpenseList.jsx
│   ├── ExpenseCard.jsx
│   ├── AddExpenseModal.jsx
│   ├── SettlementModal.jsx
│   ├── MembersList.jsx
│   ├── GroupBalances.jsx
│   ├── ActivityFeed.jsx
│   └── AnalyticsCharts.jsx
│
├── context
│   └── AuthContext.jsx
│
├── services
│   └── api.js
│
├── hooks
│
└── utils
```

----------------------------------------------------

# 🔄 User Workflow

### 1️⃣ Landing Page
Users visit the landing page and learn about the platform.

### 2️⃣ Authentication
Users can:
* Sign up
* Log in

### 3️⃣ Dashboard
Users see an overview including:
* Total balance
* Recent expenses
* Activity feed

### 4️⃣ Create Groups
Users create groups such as:
```
Roommates
Trip to Goa
Office Lunch
```

### 5️⃣ Add Expenses
Users add shared expenses including:
* Description
* Amount
* Participants
* Split method

### 6️⃣ View Balances
Users can view:
* Who owes them
* Who they owe

### 7️⃣ Simplify Debts
The system suggests the **minimum number of settlements required**.

### 8️⃣ Settle Payments
Users can record payments to settle debts.

----------------------------------------------------


# 🧮 Debt Simplification Algorithm
To reduce unnecessary transactions, the system calculates net balances and suggests optimized settlements.

Example:
```
A owes B $20
B owes C $20
```

Simplified to:
```
A pays C $20
```

This reduces the number of required transactions.

----------------------------------------------------

# ⚙️ Installation

## Clone the Repository
```
git clone https://github.com/your-username/fair-share.git
cd fair-share
```

----------------------------------------------------

# 🖥️ Running the Frontend
```
cd frontend
npm install
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

----------------------------------------------------

# ⚙️ Running the Backend
```
cd backend
mvn spring-boot:run
```

Backend will run at:
```
http://localhost:8080
```

----------------------------------------------------

# 🗄️ Database Setup
Install PostgreSQL and create a database:
```
CREATE DATABASE fairshare;
```

Update backend configuration:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/splitsmart
spring.datasource.username=your_username
spring.datasource.password=your_password
```

----------------------------------------------------

# 🔌 API Endpoints

## Authentication
```
POST /api/auth/signup
POST /api/auth/login
```

## Groups
```
GET /api/groups
POST /api/groups
POST /api/groups/{id}/members
```

## Expenses
```
POST /api/groups/{groupId}/expenses
GET /api/groups/{groupId}/expenses
```

## Balances
```
GET /api/groups/{groupId}/balances
GET /api/groups/{groupId}/simplify
```

## Settlements
```
POST /api/settlements
```

----------------------------------------------------

# 🌟 Future Improvements
Planned features:
* Real-time updates using WebSockets
* Mobile application
* Receipt scanning using OCR
* AI-powered bill splitting
* Push notifications
* Multi-currency support

----------------------------------------------------

# 🤝 Contributing
Contributions are welcome.
Steps:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a pull request

----------------------------------------------------

# 📄 License
This project is licensed under the MIT License.

----------------------------------------------------

# 👨‍💻 Team Members
1) Divyansh Patel
2) Abhishek Yadav
3) Kush Gupta
4) Sunil Singh

---------------------------------------------------
