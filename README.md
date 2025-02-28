# 🚀 AI Engineer Study Project

This is a study project designed to explore **OpenAI's API**, stock data retrieval from **Polygon.io**, and **backend/frontend communication** using Node.js and Express.

## 📜 Features
- 📊 Fetch real-time **stock market data** from Polygon.io.
- 🧠 Generate AI-powered **stock reports** using OpenAI’s GPT-4.
- 🔄 **Frontend and backend integration** (Node.js, Express, and Fetch API).
- 🛡️ Secure API key storage using **dotenv**.

---

## 📂 Project Structure
```
ai-engineer/
│── backend/                 # Backend (Node.js + Express)
│   ├── server.js            # Express server setup
│   ├── .env                 # Environment variables (API keys)
│── frontend/                # Frontend files
│   ├── index.html           # UI structure
│   ├── index.js             # Handles UI and API calls
│   ├── index.css            # Styling
│   ├── utils/dates.js       # Date handling
│   ├── images/              # UI assets (logos, icons)
│── package.json             # Project metadata
│── README.md                # Project documentation
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/arianefrancaqa/ai-engineer.git
cd ai-engineer
```

### 2️⃣ Install Dependencies
- **Backend (Navigate to `backend/` and install)**
  ```sh
  cd backend
  npm install
  ```
- **Frontend (No installation needed, just open `index.html`)**

### 3️⃣ Set Up Environment Variables
Create a `.env` file in `backend/` and add:
```sh
OPENAI_API_KEY=your-openai-api-key
POLYGON_API_KEY=your-polygon-api-key
PORT=5000
```

### 4️⃣ Start the Backend
```sh
cd backend
node server.js
```
Server runs at **`http://localhost:5000`**.

### 5️⃣ Open the Frontend
Simply open `index.html` in a browser or use **Live Server** in VS Code.

---

## 🔥 How It Works
1. **User enters stock tickers (e.g., `TSLA`)** in the frontend.
2. **Frontend fetches stock data** from the backend (`/stocks/:ticker`).
3. **Backend retrieves stock data** from Polygon.io.
4. **Frontend requests AI analysis** from the backend (`/chat`).
5. **Backend sends data to OpenAI** and returns a response.
6. **AI-generated stock report is displayed** in the frontend.

---

## 🚀 API Endpoints (Backend)
### 1️⃣ Fetch Stock Data
- **GET `/stocks/:ticker`**  
  Fetches stock data for a given ticker from Polygon.io.

### 2️⃣ Generate AI Stock Report
- **POST `/chat`**  
  Sends stock data to OpenAI and returns an AI-generated report.

Example request body:
```json
{
  "messages": [
    { "role": "system", "content": "You are a stock analysis AI." },
    { "role": "user", "content": "Analyze TSLA stock." }
  ]
}
```

---

## ⚠️ Notes & Limitations
- **API keys should NEVER be exposed in frontend code.**
- Free-tier APIs may have **rate limits**.
- **Only GPT-4 is used**, but it can be swapped for other models.
- Backend **must be running** for the frontend to work properly.

---

## 🛠️ Technologies Used
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **APIs**: OpenAI, Polygon.io  
- **Security**: dotenv, CORS  

---

## 📄 License
This project is for educational purposes. Feel free to use it as a reference.  

---

## 👩‍💻 Author
👤 **Ariane França**  
🔗 [GitHub](https://github.com/arianefrancaqa)  

---


