## **🤖 ai-Talks-MERN-Project**

**ai-Talks** is a full-stack AI-powered chat application built with the MERN stack. It allows users to register, log in, interact with an AI assistant, and view their recent AI conversations. The backend securely manages authentication and interfaces with Nebius AI, while the frontend offers a smooth and modern user experience using React, Redux, and Tailwind CSS.

---

## **🌟 Features**

- 🔐 JWT-based authentication with secure cookies  
- 🧠 AI-generated responses using Nebius AI (Qwen2.5-Coder-7B)  
- 📚 Chat history (last 5 prompts) per user  
- ⚙️ Protected routes & secure API  
- 🎨 Framer Motion animations  
- 📦 Fully responsive and production-ready  

---

## **🛠️ Tech Stack**

### **🔗 Frontend:**
- React.js  
- Redux Toolkit  
- React Router  
- Axios  
- Tailwind CSS  
- Framer Motion  
- React Hot Toast  

### **🔧 Backend:**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT for authentication  
- cookie-parser & bcrypt  
- dotenv  

### **🤖 AI:**
- [Nebius AI Studio](https://yandex.com/cloud/en/docs/nebius/studio/)  
- Model used: `Qwen/Qwen2.5-Coder-7B`  

---

## **📁 Project Structure**

```
ai-Talks-MERN-Project/
├── client/               # Frontend
│   ├── src/
│   │   ├── features/     # Redux slices (auth, feedback)
│   │   ├── pages/        # HomePage, DashboardPage, HistoryPage, SignupPage, LoginPage
│   │   ├── utils/        # Axios config
│   │   └── main.jsx      # App entry
│   └── public/           # Static assets
├── server/               # Backend
│   ├── controllers/      # auth.controller.js, feedback.controller.js
│   ├── models/           # user.model.js, feedback.model.js
│   ├── middlewares/      # auth.middleware.js
│   ├── routes/           # auth.routes.js, feedback.routes.js
│   ├── utils/            # JWT token & cookie helper
│   ├── config/           # connectToDB.js
│   └── index.js          # Main Express server file
├── .env                  # Environment variables
├── .gitignore
├── README.md             # You're here!
```

---

## **⚙️ How It Works**

1. **User Signup/Login**  
   - On signup/login, the server verifies credentials and generates a JWT stored in an `HttpOnly` cookie.

2. **Protected Routes**  
   - All routes like `/dashboard` and `/feedback/history` are guarded using JWT-based middleware.

3. **AI Chat**  
   - Authenticated users send prompts to `/api/feedback/`.  
   - The server hits Nebius AI's endpoint and returns a short, clear response.

4. **Chat History**  
   - The backend stores the last 5 conversations per user and fetches them via `/api/feedback/history`.

---

## **📦 Installation & Setup**

### **🔑 Prerequisites**
- Node.js (v18+)  
- MongoDB Atlas account  
- Nebius AI API key  

---

### **📥 Clone and Install**

```bash
# Clone the repo
git clone https://github.com/your-username/ai-Talks-MERN-Project.git
cd ai-Talks-MERN-Project
```

### **🖥 Backend Setup**
```bash
cd server
npm install
```

Create a `.env` file in `/server/`:

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEBIUS_API_KEY=your_nebius_api_key
NODE_ENV=development
```

Run server:

```bash
npm run dev
```

### **💻 Frontend Setup**
```bash
cd ../client
npm install
npm run dev
```

🔗 Ensure both frontend and backend are running simultaneously in development.

---

## **🚀 Production Build & Deployment**

```bash
# Build frontend
cd client
npm run build

# Move to backend
cd ../server
npm start
```

The Express server will now serve both:

- `/api/...` → your backend routes  
- `client/dist/index.html` → the frontend app  

---

## **🔐 API Endpoints**

| Method | Route                   | Access  | Description                       |
|--------|-------------------------|---------|-----------------------------------|
| POST   | /api/auth/signup        | Public  | Register a new user               |
| POST   | /api/auth/login         | Public  | Log in with email/password        |
| POST   | /api/auth/logout        | Private | Log out and clear auth cookie     |
| GET    | /api/auth/              | Private | Get current authenticated user    |
| POST   | /api/feedback/          | Private | Submit a prompt and get AI reply  |
| GET    | /api/feedback/history   | Private | Get last 5 feedbacks by user      |

---

## **🧪 AI Model Details**

- **Provider:** Nebius AI  
- **Model:** Qwen2.5-Coder-7B  
- **Behavior:** Short, accurate responses (no markdown, no roleplay)

---
