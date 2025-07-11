Berikut adalah **kode lengkap file `README.md`** untuk proyek Task Manager milikmu, berdasarkan struktur frontend dan backend yang sudah kamu jelaskan:

```markdown
# 🧠 Task Manager Project

Aplikasi manajemen tugas berbasis web dengan fitur kolaborasi, pelacakan progres, dan pengelolaan proyek. Backend dibangun dengan Express.js & MongoDB, sedangkan frontend menggunakan React.js dengan Ant Design dan Tailwind CSS.

---

## 📁 Struktur Repositori

- **Frontend (UI):** `task-manager-ui`
- **Backend (API):** `mongo-api`

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

### 🔧 Backend (`mongo-api`)

- **Node.js** – runtime JavaScript untuk backend
- **Express.js** – web framework minimalis
- **MongoDB** + **Mongoose** – database NoSQL dan ODM
- **JWT (jsonwebtoken)** – otentikasi token
- **bcryptjs** – hashing password
- **dotenv** – manajemen konfigurasi environment
- **cors** – mengizinkan permintaan lintas-origin
- **Nodemon** – pengembangan dengan auto-reload

#### 📦 Dependencies:

```json
"dependencies": {
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.1.0",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.16.2"
},
"devDependencies": {
  "nodemon": "^3.1.10"
}
```

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

#### 📦 Dependencies:

```json
"dependencies": {
  "@ant-design/icons": "^6.0.0",
  "@iconify/react": "^6.0.0",
  "@tailwindcss/vite": "^4.1.11",
  "@tanstack/react-query": "^5.81.5",
  "antd": "^5.26.4",
  "autoprefixer": "^10.4.21",
  "axios": "^1.10.0",
  "dayjs": "^1.11.13",
  "file-saver": "^2.0.5",
  "postcss": "^8.5.6",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.6.3",
  "tailwindcss": "^4.1.11",
  "xlsx": "^0.18.5"
},
"devDependencies": {
  "@eslint/js": "^9.30.1",
  "@tailwindcss/postcss": "^4.1.11",
  "@types/react": "^19.1.8",
  "@types/react-dom": "^19.1.6",
  "@vitejs/plugin-react": "^4.6.0",
  "eslint": "^9.30.1",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^16.3.0",
  "vite": "^7.0.3"
}
```

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
