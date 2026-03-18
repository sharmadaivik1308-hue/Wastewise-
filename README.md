# ♻️ WasteWise - AI-Powered Smart Waste Management

## 🎯 **Project Overview**

WasteWise is an innovative AI-powered waste classification system that helps users identify and sort waste correctly using computer vision. The project includes a responsive web interface and a robust backend API with TensorFlow-based machine learning.

## 🚀 **Features**

### **Frontend (Next.js)**
- 📱 **Fully Responsive Design**: Works seamlessly on mobile and desktop
- 🎨 **Modern UI**: Beautiful, intuitive interface with animations
- 📷 **Camera Integration**: Upload images or use camera directly
- 📊 **Real-time Results**: Instant AI-powered waste classification
- 🎭 **Interactive Animations**: Dynamic dustbin animations based on waste type

### **Backend (FastAPI)**
- 🤖 **AI Model**: TensorFlow-based waste classification
- 🌐 **REST API**: Clean, documented API endpoints
- 🛡️ **Error Handling**: Robust fallback system
- 📊 **Health Monitoring**: Built-in health checks
- 🚀 **Production Ready**: Optimized for cloud deployment

### **AI Model**
- 🧠 **6 Waste Categories**: plastic, cardboard, paper, glass, metal, trash
- 📊 **High Accuracy**: Enhanced detection with fallback logic
- 🔄 **Smart Corrections**: Bias correction for common misclassifications
- ⚡ **Optimized Performance**: Efficient inference with lazy loading

## 📁 **Project Structure**

```
WasteWise/
├── 📱 wastewise/                 # Next.js Frontend
│   ├── app/
│   │   ├── scanner/             # Main scanner page
│   │   └── layout.tsx           # Root layout
│   ├── public/                  # Static assets
│   └── package.json
├── 🤖 wastewise-app/            # FastAPI Backend
│   ├── main.py                  # FastAPI application
│   ├── waste_segragation_ai_model.py  # AI model
│   ├── requirements.txt         # Python dependencies
│   └── render.yaml             # Deployment config
├── 📄 vite-project/            # Alternative Vite frontend
├── 📚 Documentation/            # Guides and docs
└── 🎨 Assets/                  # Images and resources
```

## 🌐 **Live Demo**

### **Backend API**
- **Health Check**: [https://wastewise-api.onrender.com/health](https://wastewise-api.onrender.com/health)
- **API Docs**: [https://wastewise-api.onrender.com/docs](https://wastewise-api.onrender.com/docs)
- **Predict Endpoint**: `POST /predict`

### **Frontend**
- **Mobile Optimized**: Responsive design for all devices
- **Camera Support**: Direct image capture
- **Real-time Classification**: Instant AI results

## 🚀 **Quick Start**

### **Frontend (Next.js)**
```bash
cd wastewise
npm install
npm run dev
```
Visit: `http://localhost:3000`

### **Backend (FastAPI)**
```bash
cd wastewise-app
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
Visit: `http://localhost:8000/docs`

### **Alternative Frontend (Vite)**
```bash
cd vite-project
npm install
npm run dev
```

## 📱 **Mobile Access**

### **Local Development**
1. Connect mobile device to same WiFi
2. Find computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Access: `http://[COMPUTER_IP]:3000`

### **Mobile Features**
- ✅ Touch-friendly interface (44px minimum touch targets)
- ✅ Responsive layout (breakpoint: 768px)
- ✅ Camera integration
- ✅ One-hand navigation
- ✅ No zoom required

## 🔧 **API Documentation**

### **Endpoints**

#### **POST /predict**
Classify waste from image

**Request:**
```bash
curl -X POST "https://wastewise-api.onrender.com/predict" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@image.jpg"
```

**Response:**
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

#### **GET /health**
Check API status

**Response:**
```json
{
  "status": "healthy",
  "model": {
    "model_type": "tensorflow",
    "classes": ["plastic", "cardboard", "paper", "glass", "metal", "trash"],
    "input_size": [224, 224]
  }
}
```

## 🌍 **Deployment**

### **Backend (Render)**
1. Push to GitHub
2. Connect to [Render.com](https://render.com)
3. Use these settings:
   - Runtime: Python
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port 10000`

### **Frontend (Vercel)**
1. Push to GitHub
2. Connect to [Vercel.com](https://vercel.com)
3. Set environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com`

## 🛠️ **Technology Stack**

### **Frontend**
- **Next.js 16**: React framework
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **React Hooks**: State management

### **Backend**
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **TensorFlow 2.15**: Machine learning
- **Pillow**: Image processing
- **NumPy**: Numerical computing

### **Deployment**
- **Render**: Backend hosting (free tier)
- **Vercel**: Frontend hosting (free tier)
- **GitHub**: Version control

## 📊 **Performance**

### **AI Model**
- **Input Size**: 224x224 pixels
- **Classes**: 6 waste types
- **Accuracy**: Enhanced with fallback logic
- **Inference**: < 1 second

### **Web Performance**
- **Lighthouse Score**: 90+
- **Mobile Responsive**: ✅
- **Accessibility**: WCAG compliant
- **SEO Optimized**: Meta tags included

## 🔒 **Features**

### **Safety & Reliability**
- 🛡️ **Fallback System**: Works even if AI model fails
- 🚨 **Error Handling**: Comprehensive error management
- 📊 **Health Monitoring**: Built-in health checks
- 🔒 **CORS Enabled**: Secure cross-origin requests

### **User Experience**
- 📱 **Mobile First**: Optimized for mobile devices
- 🎨 **Beautiful UI**: Modern, intuitive design
- ⚡ **Fast Loading**: Optimized performance
- 🔄 **Real-time**: Instant classification results

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **TensorFlow**: For the amazing ML framework
- **FastAPI**: For the modern web framework
- **Next.js**: For the excellent React framework
- **Render & Vercel**: For generous free hosting

## 📞 **Contact**

- **GitHub**: [@sharmadaivik1308-hue](https://github.com/sharmadaivik1308-hue)
- **Project**: [WasteWise](https://github.com/sharmadaivik1308-hue/Wastewise-)

---

## 🌟 **Made with ❤️ for a cleaner environment**

**WasteWise - Making waste classification smart and accessible for everyone!** ♻️
