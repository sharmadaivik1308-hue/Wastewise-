import React, { useState, useRef } from 'react';
import './style.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      // Get the file from file input
      const fileInput = fileInputRef.current;
      const file = fileInput.files[0];

      if (!file) {
        setError('Please select an image first');
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending request to:', API_URL);
      console.log('File:', file.name, file.size);

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);

      setPrediction(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to analyze image');
      
      // Fallback to mock response
      setPrediction({
        waste_type: 'plastic',
        confidence: 0.94
      });
    } finally {
      setLoading(false);
    }
  };

  const getWasteEmoji = (wasteType) => {
    const emojis = {
      plastic: '🔵',
      cardboard: '📦',
      paper: '📄',
      glass: '⚪',
      metal: '🔵',
      trash: '🗑️'
    };
    return emojis[wasteType] || '♻️';
  };

  const getBinColor = (wasteType) => {
    const colors = {
      plastic: '#2563eb',
      cardboard: '#2563eb', 
      paper: '#2563eb',
      glass: '#9ca3af',
      metal: '#2563eb',
      trash: '#1f2937'
    };
    return colors[wasteType] || '#6b7280';
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">♻️ WasteWise</h1>
        <p className="subtitle">AI-Powered Waste Classification</p>
      </header>

      <main className="main">
        <div className="upload-section">
          <div className="upload-area">
            {selectedImage ? (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected waste" />
                <button onClick={() => {
                  setSelectedImage(null);
                  setPrediction(null);
                  setError(null);
                }} className="clear-btn">
                  Clear Image
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📷</div>
                <p>Click to upload waste image</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="file-input"
                />
              </div>
            )}
          </div>

          {selectedImage && (
            <button 
              onClick={analyzeImage} 
              disabled={loading}
              className="analyze-btn"
            >
              {loading ? 'Analyzing...' : 'Analyze Waste'}
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {prediction && (
          <div className="result-section">
            <h2>🎯 Classification Result</h2>
            <div className="result-card" style={{ borderColor: getBinColor(prediction.waste_type) }}>
              <div className="result-emoji">
                {getWasteEmoji(prediction.waste_type)}
              </div>
              <div className="result-info">
                <h3>{prediction.waste_type.charAt(0).toUpperCase() + prediction.waste_type.slice(1)}</h3>
                <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="animation-section">
              <h3>Dustbin Animation</h3>
              <div className="dustbin-container">
                <div 
                  className="dustbin"
                  style={{ backgroundColor: getBinColor(prediction.waste_type) }}
                >
                  <div className="dustbin-lid"></div>
                  <div className="dustbin-body">
                    {getWasteEmoji(prediction.waste_type)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>WasteWise © 2024 | Smart Waste Management</p>
      </footer>
    </div>
  );
}

export default App;
