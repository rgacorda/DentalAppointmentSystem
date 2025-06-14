```markdown
# 🦷 Dental Appointment System

A full-stack dental clinic appointment management system built with the **SERN stack** (Sequelize, Express, React, Node.js), styled using **Tailwind CSS**, and structured with the **MVC (Model-View-Controller)** pattern for clean separation of concerns.

This system allows patients to book appointments, and admins/dentists to manage scheduling, availability, and patient records.

---

## 🧩 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **Database**: MySQL (via Sequelize ORM)
- **Architecture**: MVC pattern
- **API Communication**: Axios

---

## 🚀 Features

### 🧑‍⚕️ For Dentists/Admins
- Manage available time slots
- View and confirm/reject patient appointments
- Maintain patient records and appointment history
- Role-based dashboard access

### 🧑‍💻 For Patients
- Register and log in
- Browse available slots
- Book, reschedule, or cancel appointments
- View appointment history

---

## 📁 Project Structure

### Backend (MVC - Express + Sequelize)
```
---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MySQL
- Yarn or npm

---

### 1️⃣ Backend Setup

```bash
npm install
````

Create a `.env` file:

```env
PORT=5000
DB_NAME=dental_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

Run development server:

```bash
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app should now be running at
🔗 `http://localhost:3000`

---

## 🔐 Authentication & Roles

* JWT-based auth (HTTP-only cookie or header)
* Role-based access:

  * `admin`: Full access
  * `dentist`: Manage appointments and patients
  * `patient`: Book/view appointments

---


## 📬 Contact

📧 rgacorda.the2nd@gmail.com


```

