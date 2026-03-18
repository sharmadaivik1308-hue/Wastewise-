# 🚀 WasteWise Deployment Guide

## ✅ STEP 2: BACKEND DEPLOYMENT (Render)

### 📁 Files Created:
- `main.py` - FastAPI backend
- `requirements.txt` - Python dependencies  
- `render.yaml` - Render configuration

### 🌐 Deploy to Render:

#### **Method 1: GitHub Integration (Recommended)**
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add FastAPI backend for deployment"
   git push origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `wastewise-app` folder
   - Use these settings:
     ```
     Runtime: Python
     Build Command: pip install -r requirements.txt
     Start Command: uvicorn main:app --host 0.0.0.0 --port 10000
     ```

#### **Method 2: Direct Upload**
1. **Create ZIP file**:
   ```bash
   # Navigate to wastewise-app folder
   cd wastewise-app
   zip -r wastewise-backend.zip .
   ```

2. **Upload to Render**:
   - Go to render.com → "New +" → "Web Service"
   - Choose "Deploy a ZIP file"
   - Upload `wastewise-backend.zip`

### ⚙️ Render Configuration:
```yaml
services:
  - type: web
    name: wastewise-api
    runtime: python
    plan: free
    buildCommand: "pip install -r requirements.txt"
    startCommand: "uvicorn main:app --host 0.0.0.0 --port 10000"
    healthCheckPath: /health
```

### 🔍 Test Backend:
Once deployed, test these endpoints:
- **Health**: `https://your-app.onrender.com/health`
- **Predict**: `https://your-app.onrender.com/predict`
- **Info**: `https://your-app.onrender.com/model-info`

### 📱 Expected Response:
```json
{
  "waste_type": "plastic",
  "confidence": 0.94,
  "bin": "Blue Bin",
  "color": "#2563eb",
  "emoji": "🔵",
  "success": true
}
```

### 🛡️ Features Included:
- ✅ **CORS Enabled**: Allows frontend access
- ✅ **File Upload**: Handles image files
- ✅ **Fallback System**: Works even if AI model fails
- ✅ **Error Handling**: Graceful error responses
- ✅ **Health Check**: Monitoring endpoint
- ✅ **Free Tier Ready**: Optimized for Render free plan

### 🔄 Next Steps:
1. **Deploy backend** to Render
2. **Get backend URL** (e.g., `https://wastewise-api.onrender.com`)
3. **Update frontend** API URL
4. **Deploy frontend** to Vercel

### 📊 Backend Features:
- **FastAPI**: Modern, fast Python web framework
- **CORS**: Allows cross-origin requests
- **File Upload**: Handles image files with validation
- **AI Integration**: Uses your TensorFlow model
- **Fallback System**: Mock predictions if model fails
- **Health Monitoring**: Built-in health checks
- **Error Handling**: Comprehensive error management

### 🚨 Troubleshooting:
- **Build Fails**: Check Python version (use 3.9)
- **Model Loading**: Ensure TensorFlow 2.15.0 compatibility
- **Memory Issues**: Use fallback predictions if model too large
- **CORS Issues**: Already configured with `allow_origins=["*"]`

### 📈 Performance Optimizations:
- **Lazy Loading**: Model loads only when needed
- **Fallback System**: Prevents crashes
- **Error Recovery**: Always returns a response
- **Memory Management**: Optimized for free tier

Your backend will be available at: `https://your-app-name.onrender.com` 🚀
