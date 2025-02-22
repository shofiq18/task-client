# Task Management Application

## 📌 Short Description
A real-time **Task Management Application** where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. The application supports authentication via **Firebase Authentication** and stores user data in **MongoDB**. Real-time updates are implemented using **Socket.io**.

## 🚀 Live Demo
[Live Application Link](#) *(Add your live deployed link here)*

## 🛠 Technologies Used
- **Frontend:** React.js (Vite.js), Firebase Authentication, React Beautiful DnD, Tailwind CSS, Socket.io-client
- **Backend:** Node.js, Express.js, MongoDB (Native Driver), Socket.io

## 📦 Dependencies
### **Backend:**
```json
{
  "express": "^4.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "mongodb": "^5.x",
  "socket.io": "^4.x"
}
```

### **Frontend:**
```json
{
  "react": "^18.x",
  "vite": "^4.x",
  "firebase": "^10.x",
  "socket.io-client": "^4.x",
  "react-beautiful-dnd": "^13.x",
  "tailwindcss": "^3.x"
}
```

## 🎯 Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/shofiq18/task-client.git
git clone https://github.com/shofiq18/task-server.git
cd task-management-app
```

### 2️⃣ Setup Backend
```sh
cd backend
npm install
```
Run the backend server:
```sh
nodemon index.js
```

### 3️⃣ Setup Frontend
```sh
cd ../frontend
npm install
```
Run the frontend:
```sh
npm run dev
```

## 🔄 API Endpoints
### **Authentication**
| Method | Endpoint        | Description        |
|--------|---------------|-------------------|
| POST   | `/login`      | User login        |
| POST   | `/register`   | User registration |
| GET    | `/profile`    | Get user profile  |

### **Tasks**
| Method | Endpoint        | Description              |
|--------|----------------|--------------------------|
| POST   | `/tasks`       | Add a new task          |
| GET    | `/tasks`       | Get all user tasks      |
| PUT    | `/tasks/:id`   | Update task details     |
| DELETE | `/tasks/:id`   | Delete a task           |

## 📌 Best Practices Followed
✅ **Code Splitting** – Organized frontend & backend with proper folder structure.
✅ **Real-Time Updates** – Implemented using **Socket.io**.
✅ **Secure Authentication** – Firebase for authentication.
✅ **Optimized Performance** – Used WebSockets instead of polling.
✅ **Minimal & Clean UI** – Built with **Tailwind CSS**.


---
🚀 **Developed with ❤️ by MD. Shofiqul Islam**

