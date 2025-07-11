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
## 🛠️ Teknologi yang Digunakan

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

Note: Folder terpisah antara frontend dan backend, lakukan satu persatu dan ikuti dibawah ini.

--

### 🔙 Setup Backend

Buka Terminal, lalu masukkan

```bash
git clone https://github.com/wira-ananda/task-manager-api-1.git
cd task-manager-api-1
npm install
npm run dev
```

Setelah berhasil terinstall, struktur folder akan jadi seperti ini

```
project-root/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   ├── projectUserController.js
│   ├── taskController.js
│   ├── userController.js
│   └── userProjectProgressController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── Project.js
│   ├── ProjectUser.js
│   ├── Task.js
│   ├── User.js
│   └── UserProjectProgress.js
├── node_modules/
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── projectUserRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── utils/
│   └── calculateProgress.js
├── .env (BUAT BARU, PASTIKAN PATH/LOKASI NYA SESUAI)
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```
> buat file dengan nama `.env`, lalu isi dengan ini:

```
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
NODE_ENV=development
JWT_SECRET=wiraananda007
```

--

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
