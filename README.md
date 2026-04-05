# 💸 Finance Dashboard UI

A clean, responsive and interactive finance dashboard built to help users track and understand their financial activity.
This project focuses on **UI design, state management, and user experience**, simulating a real-world dashboard without backend dependency.

---

## 🚀 Live Demo: 

## 📂 Repository: https://github.com/Hrisshhii/finance-dashboard

---

## 🧠 Overview

This dashboard allows users to:

* View financial summaries
* Explore and manage transactions
* Understand spending patterns through visualizations
* Interact with role-based UI (Viewer/Admin)

The goal was to build a **simple yet intuitive interface** that demonstrates strong frontend fundamentals and thoughtful design decisions.

---

## ✨ Features

### 📊 Dashboard Overview

* Summary cards for:

  * Total Balance
  * Income
  * Expenses
* 📈 Balance trend visualization (line chart)
* 🥧 Spending breakdown (category-based chart)

---

### 💳 Transactions Section

* Transaction table with:

  * Date
  * Category
  * Type (income/expense)
  * Amount
* Features:

  * 🔍 Search by category
  * 🎯 Filter (income/expense)
  * ↕️ Sorting (date/amount)
  * ✏️ Inline editing (Admin only)
  * ❌ Delete transactions (Admin only)
  * ➕ Add new transactions

---

### 🔐 Role-Based UI (Simulated)

* **Viewer**
  * Read-only access
* **Admin**
  * Can add, edit and delete transactions

Role can be switched using a dropdown for demonstration.

---

### 📊 Insights Section

Provides useful financial insights:
* Highest spending category
* Monthly spending comparison
* Most frequent spending category
* Total monthly spending
* Average expense

---

### 🌙 Dark Mode

* Toggle between light and dark themes
* Theme preference stored using localStorage
* Fully styled for both modes

---

### 💾 Data Persistence

* Transactions and role are stored in **localStorage**
* Data persists across page refresh

---

### 📥 Export Functionality

* Export all transactions as a CSV file
* Enables quick data sharing and analysis

---

### 📱 Responsive Design

* Fully responsive across:
  * Mobile
  * Tablet
  * Desktop
* Collapsible sidebar for better UX
* Mobile-friendly navigation

---

## 🛠️ Tech Stack

* **React (Vite)**
* **TypeScript**
* **Tailwind CSS v4**
* **Recharts** (for data visualization)
* **Context API** (state management)
* **Lucide Icons**

---

## 🧩 Architecture & Approach

### 1. Component-Based Structure

The application is divided into modular components:

* Dashboard
* Transactions
* Insights
* UI (Layout, Sidebar, etc.)

This improves scalability and maintainability.

---

### 2. State Management

Used **React Context API** to manage:
* Transactions data
* User role
* UI state
Chosen for simplicity and to avoid unnecessary complexity like Redux.

---

### 3. Data Handling

* Used **mock data** to simulate real-world usage
* Implemented CRUD operations:
  * Add
  * Edit
  * Delete
* Applied filtering, sorting, and searching on frontend

---

### 4. UX Decisions

* Inline editing for faster interaction
* Role-based UI to simulate real applications
* Clean spacing and visual hierarchy
* Meaningful insights instead of just raw data

---

### 5. Dark Mode Implementation

* Implemented using Tailwind v4 custom variant
* Theme toggled via `document.documentElement.classList`
* Persisted using localStorage

---

### 6. Responsiveness Strategy

* Mobile-first layout
* Adaptive grids and flexible components
* Collapsible sidebar for smaller screens

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd finance-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

---

## 🔮 Future Improvements

* Backend integration (API + database)
* Authentication system
* Advanced analytics and reports
* Pagination for large datasets
* Multi-user support
* Real-time updates

---

## 📌 Key Highlights

* Clean and intuitive UI design
* Thoughtful UX decisions
* Fully responsive layout
* Real-world feature simulation (RBAC, persistence, export)
* Strong focus on maintainability and structure

---

## 🙌 Final Note

This project was built with a focus on **clarity, usability, and clean architecture**, rather than overcomplicating features.
It reflects how I approach building real-world frontend applications.

---
