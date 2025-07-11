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

### 🔧 Backend (`task-manager-api`)

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

Note: Folder terpisah antara frontend dan backend, lakukan satu persatu dan ikuti instruksi dibawah ini.

## 🔜 Setup Frontend

1. Buka Terminal, lalu masukkan
```bash
git clone https://github.com/kamu/task-manager-ui.git
cd task-manager-ui
npm install
```

📌 Setelah berhasil, struktur folder frontend akan jadi seperti ini:
```
project-root/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── hooks/
│   │   ├── api/
│   │   │   ├── useAuth.js
│   │   │   ├── useProject.js
│   │   │   ├── useProjectUser.js
│   │   │   ├── useTasks.js
│   │   │   └── useUser.js
│   ├── context/
│   │   └── useGlobalContext.jsx
│   ├── middleware/
│   │   ├── axiosInstance.js
│   │   ├── errorMiddleware.js
│   │   └── protectedRoute.jsx
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── Home/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProjectFormComponent.jsx
│   │   │   └── ProjectListComponent.jsx
│   │   └── Project/
│   │       ├── ProjectDetailPage.jsx
│   │       └── TaskListComponent.jsx
│   ├── utils/
│   │   └── palette.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```
---
## 🔙 Setup Backend

1. Buka Terminal dengan tab baru, lalu masukkan
```bash
git clone https://github.com/wira-ananda/task-manager-api-1.git
cd task-manager-api-1
npm install
```

📌 Setelah berhasil terinstall, struktur folder backend akan jadi seperti ini
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

2. Buat file dengan nama `.env`, lalu isi dengan ini:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
NODE_ENV=development
JWT_SECRET=wiraananda007
```
---
## 🔙 Setup Database

1. Buka MongoDB Compass, lalu klik 'CONNECT' pada 'localhost:27017'

![Tampilan MongoDB Compass](./public//gambar-readme-1.png)

---
## 🔙 Running Program

1. (Running Frontend) Buka Terminal dengan tab baru, lalu masukkan
```bash
cd task-manager-ui
npm run dev
```

2. (Running Backend) Buka Terminal dengan tab baru, lalu masukkan
```bash
cd task-manager-api-1
npm run seed
npm run dev
```

3. Buka http://localhost:5173/ di chrome

4. Data sudah ada saat menjalankan seeder (npm run seed), data usernya sendiri yaitu:
> username : user  
> email : user@gmail.com  
> password : qazwsx


5. 'LOGIN' dan fitur website nya pun sudah bisa diakses.
