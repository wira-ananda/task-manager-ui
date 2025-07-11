# ⚛️ Struktur Folder - React Frontend Task Manager

Struktur folder berikut merupakan representasi dari aplikasi frontend berbasis React.js untuk Task Manager:

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

## 📝 Penjelasan Folder Utama

| Folder / File                     | Fungsi                                                                 |
|----------------------------------|------------------------------------------------------------------------|
| `public/`                        | Berisi file statis seperti HTML utama (`index.html`)                   |
| `src/assets/`                    | Aset statis seperti gambar atau ikon                                   |
| `src/hooks/api/`                 | Kumpulan custom hook untuk komunikasi API backend                      |
| `src/context/`                  | Global context menggunakan React Context API                           |
| `src/middleware/`               | Middleware seperti proteksi route dan konfigurasi Axios                |
| `src/pages/`                    | Halaman-halaman aplikasi yang dipisah berdasarkan fitur (Auth, Home)   |
| `src/utils/`                    | Fungsi pembantu seperti warna atau formatter                          |
| `App.jsx`                       | Komponen root dari React App                                          |
| `main.jsx`                      | Entry point React untuk render ke DOM                                 |
| `tailwind.config.js`            | Konfigurasi Tailwind CSS                                              |
| `vite.config.js`                | Konfigurasi untuk Vite                                                |

---

> Dibuat untuk proyek **Task Manager React + Vite + Tailwind CSS**