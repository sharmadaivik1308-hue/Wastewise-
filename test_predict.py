import requests
import json
import base64

# Create a small dummy image in base64
dummy_image = b'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

data = {
    'image': dummy_image.decode('utf-8')
}

print("Sending request to /predict...")
try:
    response = requests.post('http://127.0.0.1:5000/predict', json=data)
    print(response.status_code)
    try:
        print(response.json())
    except:
        print(response.text)
except Exception as e:
    print("Error:", e)
