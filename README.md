# Design of a Deep Learning-Based Biomass Calculation for Post-Larval Shrimp Stocking with Feed Optimization System

This repository contains the software components of a Capstone project developed by students of the **Computer Engineering Department**.

---

## 👨‍🔬 Research Team
* **Mervin James Batuhan**
* **Paul Isaiah Cachin**
* **Kazuki Ogata**
* **Ery Jay Pisalbon**
* **Aaron Jonathan Valencia**

---

## 📖 Abstract & Project Scope
This project addresses the challenges of manual post-larval shrimp stocking by implementing a **Deep Learning-based** computer vision system. While the research encompasses hardware and model training, this repository focuses on the **Mobile Application Ecosystem**, which serves as the primary user interface for:
* **Real-time Biomass Calculation:** Automated counting and weighing estimations.
* **Feed Optimization:** Intelligent suggested feeding ratios based on detected biomass.
* **Hardware Synchronization:** Securely linking field machines to user accounts.



---

## 🏗 System Components

### 1. [MobileAppFrontend](./MobileAppFrontend)
A **React Native (Expo)** application designed for portability and ease of use in the field. 
* **Key Tech:** Expo Router, Context API, Axios, react-native-chart-kit.

### 2. [MobileAppBackend](./MobileAppBackend)
A dual-layer service architecture:
* **API Server:** A **Node.js/Express** server managing user authentication (JWT), MongoDB data persistence, and email notification services.
* **Inference Engine:** A **FastAPI** Python server running a custom-trained **YOLO11** model for shrimp detection and biomass logic.

---

## 🛠 Tech Stack Summary
| Domain | Technology |
| :--- | :--- |
| **Deep Learning** | YOLO11, PyTorch, Ultralytics |
| **Mobile UI** | React Native, Expo |
| **Backend API** | Node.js, Express |
| **Database** | MongoDB Atlas |
| **Language** | JavaScript (ES6+), Python |

---

## 🚀 Deployment Instructions

### AI Inference Server
1. Navigate to `MobileAppBackend/`.
2. Run `python model_server.py` (Ensure `YOLOshrimp.pt` is present).

### API Server
1. Navigate to `MobileAppBackend/server/`.
2. Run `npm install` followed by `npm start`.

### Mobile App
1. Navigate to `MobileAppFrontend/`.
2. Run `npm install` followed by `npx expo start`.

---

© 2024-2026 | Computer Engineering Department
