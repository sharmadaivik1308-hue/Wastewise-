# WasteWise — Complete Setup Guide (Windows)

## Prerequisites

| Tool       | Required Version | Check Command        |
|------------|------------------|----------------------|
| Python     | **3.10 or 3.11** | `python --version`   |
| Node.js    | **18+**          | `node --version`     |
| npm        | **9+**           | `npm --version`      |
| Git        | any              | `git --version`      |

> ⚠️ **TensorFlow only supports Python 3.10 and 3.11 on Windows.** If you have 3.12+, install 3.11 from [python.org](https://www.python.org/downloads/release/python-3119/).

---

## Step 1: Set Up the Python Backend

Open **PowerShell** or **Command Prompt** and run:

```powershell
# Navigate to the backend folder
cd "c:\Users\Daivik Sharma\OneDrive\Desktop\final copy(1)\prototype1\hack garbage\wastewise-app"

# Create a virtual environment (use py -3.11 if you have multiple Python versions)
python -m venv venv

# Activate the virtual environment
.\venv\Scripts\Activate

# Install all Python dependencies
pip install -r requirements.txt
```

### Verify TensorFlow installed correctly:
```powershell
python -c "import tensorflow as tf; print(tf.__version__)"
```
You should see something like `2.15.0` or `2.16.x`.

### Start the backend:
```powershell
python api.py
```

Expected output:
```
🚀 WasteWise Flask backend starting on http://localhost:5000
   Health check: http://localhost:5000/health
```

### Test it:
Open your browser to **http://localhost:5000/health** — you should see:
```json
{"message":"WasteWise Flask backend is running","status":"ok"}
```

---

## Step 2: Set Up the Next.js Frontend

Open a **second terminal** (keep the backend running):

```powershell
# Navigate to the frontend folder
cd "c:\Users\Daivik Sharma\OneDrive\Desktop\final copy(1)\prototype1\hack garbage\wastewise"

# Install Node.js dependencies
npm install
```

### Start the frontend:
```powershell
npm run dev
```

Expected output:
```
   ▲ Next.js 16.x.x
   - Local:   http://localhost:3000
```

---

## Step 3: Test the Full App

1. Open **http://localhost:3000** in your browser — the home/landing page should load
2. Click **"Start Scanning"** or go to **http://localhost:3000/scanner**
3. Allow camera access when prompted
4. Point camera at any waste item and click the **📷 capture button**
5. The app will:
   - Run AI inference (client-side TF.js, or Flask backend as fallback)
   - Automatically redirect you to the **result page** with the waste type, bin, and confidence
6. If the scan fails, you'll see a **"Scan failed. Please try again."** error message

---

## Running Both Servers Together

You need **two terminals** running simultaneously:

| Terminal | Command                        | URL                    |
|----------|--------------------------------|------------------------|
| Terminal 1 (Backend)  | `python api.py`      | http://localhost:5000  |
| Terminal 2 (Frontend) | `npm run dev`        | http://localhost:3000  |

---

## Troubleshooting

### TensorFlow won't install
- Make sure you're using **Python 3.10 or 3.11** (not 3.12+)
- Try: `pip install tensorflow==2.15.0`

### "Module not found" errors in Python
- Make sure the virtual environment is activated: `.\venv\Scripts\Activate`
- Verify: `pip list | findstr tensorflow`

### Camera not working
- Make sure you're on **localhost** (not an IP address) — browsers block camera on non-HTTPS non-localhost
- Close any other app using the camera (Zoom, Teams, etc.)

### Frontend can't connect to backend
- Both servers must be running at the same time
- Backend must be on port **5000**, frontend on port **3000**
- Check backend health: http://localhost:5000/health

### "Scan failed. Please try again."
- If TF.js model files aren't in `public/model/`, the app falls back to the Flask backend
- Make sure the Flask backend is running on port 5000
