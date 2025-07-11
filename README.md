# 🧠 Task Manager Project

Aplikasi manajemen tugas berbasis web dengan fitur kolaborasi, pelacakan progres, dan pengelolaan proyek. Backend dibangun dengan Express.js & MongoDB, sedangkan frontend menggunakan React.js dengan Ant Design dan Tailwind CSS.

---

## 📁 Struktur Repositori

- **Frontend (UI):** [task-manager-ui](https://github.com/wira-ananda/task-manager-ui)
- **Backend (API):** [task-manager-api](https://github.com/wira-ananda/task-manager-api-1)

---

## 🚀 Fitur Utama

- ✅ Autentikasi pengguna (login & register)
- 📁 Manajemen proyek
- ✅ Manajemen tugas dalam proyek
- 👥 Penugasan user ke proyek
- 📊 Pelacakan progres user terhadap proyek
- 📈 Statistik proyek berdasarkan task
- 🔍 Filter dan sorting tugas berdasarkan status & prioritas

---

### 🖥️ Frontend (`task-manager-ui`)

- **React.js** – library antarmuka pengguna
- **React Router DOM** – navigasi & routing SPA
- **TanStack React Query** – manajemen state data async
- **Ant Design (antd)** – UI komponen modern & enterprise
- **Tailwind CSS** – utilitas CSS untuk styling cepat
- **Axios** – HTTP client untuk REST API
- **Day.js** – manipulasi tanggal ringan
- **XLSX** – export data ke Excel
- **Iconify & Ant Design Icons** – ikon UI
- **Vite** – dev server dan bundler ultra-cepat

---

## 🛠️ Teknologi yang Digunakan

### 🔧 Backend (`mongo-api`)

- **Node.js** – runtime JavaScript untuk backend
- **Express.js** – web framework minimalis
- **MongoDB** + **Mongoose** – database NoSQL dan ODM
- **JWT (jsonwebtoken)** – otentikasi token
- **bcryptjs** – hashing password
- **dotenv** – manajemen konfigurasi environment
- **cors** – mengizinkan permintaan lintas-origin
- **Nodemon** – pengembangan dengan auto-reload

---

## ⚙️ Cara Menjalankan Proyek

### 🔙 Setup Backend

```bash
git clone https://github.com/kamu/mongo-api.git
cd mongo-api
npm install
npm run dev
```

> Ubah konfigurasi `.env` seperti berikut:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key
```

### 🔜 Setup Frontend

```bash
git clone https://github.com/kamu/task-manager-ui.git
cd task-manager-ui
npm install
npm run dev
```

> Pastikan variabel environment mengarah ke backend:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📌 Struktur Folder Backend (Contoh)

```
mongo-api/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── utils/
├── server.js
└── .env
```

---
