<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# HeartGuide AI

**AI-Powered Clinical Decision Support for Heart Failure Readmission Prevention**

HeartGuide AI is a full-stack healthcare application demonstrating the intersection of clinical medicine, AI/ML engineering, and product design. It features real-time patient monitoring, predictive analytics, and an **interactive AI Risk Simulator** trained on real heart disease data.

## 🚀 Live Demo

**Production**: [https://heartguide-iwtbmeqb3-franciscos-projects-73f8717a.vercel.app](https://heartguide-iwtbmeqb3-franciscos-projects-73f8717a.vercel.app)

## 📄 Clinical Documentation
> **Medical Logic Verified**: This application implements **ACC 2024 Guidelines** for Heart Failure RPM, utilizing "Triangulation Logic" (Weight + Symptoms) to predict readmission risks.
>
> 👉 [**View Full Product Requirements (PRD)**](../../project-2-prd/HeartGuide-AI-PRD.md)


## ✨ Key Features

### 1. **Dual-View Architecture**
- **Patient App**: Mobile-optimized interface for medication tracking, symptom logging, and AI chat
- **Provider Portal**: Clinical dashboard with patient queue, risk stratification, and analytics

### 2. **AI Risk Simulator** ⭐ NEW
- **Interactive "What-If" Analysis**: Adjust clinical parameters (weight, symptoms, medication adherence) and see real-time risk predictions
- **Trained ML Model**: Logistic Regression model trained on 918 heart disease cases (85.3% accuracy)
- **Explainable AI**: Natural language explanations of risk factors and model predictions
- **Clinical Realism**: Based on real heart failure risk factors (weight gain, SOB, medication non-adherence)

### 3. **Real-Time Monitoring**
- Weight trend visualization with threshold alerts
- Medication adherence tracking
- Sodium intake monitoring
- Priority action alerts

### 4. **AI Chat Assistant**
- Gemini-powered conversational interface
- Context-aware responses based on patient data
- Medication reminders and health tips

## 🧠 Machine Learning

### Model Training

The Risk Simulator uses a **Logistic Regression** model trained on the [UCI Heart Disease Dataset](https://archive.ics.uci.edu/ml/datasets/heart+disease).

**Training Script**: `ml-pipeline/train_model.py`

```bash
# Train the model
py ml-pipeline/train_model.py
```

**Model Performance**:
- Accuracy: 85.3%
- Precision (Heart Disease): 90%
- Recall (Heart Disease): 84%

**Key Features**:
- Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope

**Top Risk Factors** (by coefficient magnitude):
1. Flat ST Slope (+1.25)
2. Male Sex (+1.18)
3. Exercise-Induced Angina (+1.09)

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **ML**: Python, scikit-learn, pandas
- **Deployment**: Vercel

## 🏃 Run Locally

**Prerequisites**: Node.js, Python 3.11+

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   - Copy `.env.local` and add your Gemini API key:
     ```
     GEMINI_API_KEY=your_key_here
     ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

4. **Access the app**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Toggle between "Patient App" and "Provider Portal" views

## 📊 Using the Risk Simulator

1. Navigate to **Provider Portal**
2. Select a patient from the queue (e.g., Martha Stuart - 78% baseline risk)
3. Scroll to## 🏗️ Architecture
This system follows the **Sword Intelligence "Safety First"** design pattern. A deterministic guardrail validates all clinical data *before* it reaches the LLM layer.

```mermaid
graph TD
    UserInput[User Vitals Input] --> SafetyGuard[🛡️ Safety Guardrail]
    SafetyGuard -- Critical Risk --> CriticalAlert[🚨 Immediate Red Alert]
    SafetyGuard -- Low/Mod Risk --> LLM[✨ Clinical LLM]
    LLM --> Advice[Personalized Guidance]
    CriticalAlert --> Call[Simulate 911 Call]
```

## 🧪 Testing (Deterministic Safety)
We use **Vitest** to ensure the Safety Guardrail never hallucinates on critical values using `npm test`.

```bash
npm test
```
   - **Missed Medication**: Simulate non-adherence
5. Observe real-time risk score updates and AI explanations

## 📁 Project Structure

```
heartguide-ai/
├── components/
│   ├── patient/          # Patient-facing components
│   ├── provider/         # Provider dashboard components
│   │   ├── ProviderDashboard.tsx
│   │   └── RiskSimulator.tsx  ⭐ NEW
│   ├── AIChatInterface.tsx
│   └── RecentActivityLog.tsx
├── ml-pipeline/
│   └── train_model.py    # Model training script
├── App.tsx               # Main application
├── types.ts              # TypeScript interfaces
└── README.md
```

## 🎯 Product Thinking

This project demonstrates:
- **Clinical Expertise**: Deep understanding of heart failure pathophysiology and risk factors
- **AI/ML Engineering**: End-to-end model training, evaluation, and deployment
- **Product Design**: Interactive features that empower clinical decision-making
- **User Experience**: Dual-view architecture optimized for different user personas

## 📝 License

MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built by Francisco Pinheiro** | [LinkedIn](https://linkedin.com/in/fmmpinheiro) | [Portfolio](https://portfolio-website-franciscos-projects-73f8717a.vercel.app)
