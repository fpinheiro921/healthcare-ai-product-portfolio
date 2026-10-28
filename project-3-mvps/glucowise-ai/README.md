<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GlucoWise AI

**Intelligent Diabetes Management & Lifestyle Coaching Platform**

GlucoWise AI is a comprehensive digital health solution designed to help patients with Type 2 Diabetes manage their glucose levels through AI-powered insights, meal planning, and medication tracking. It features a **personalized Meal Prediction Simulator** that uses clinical data to forecast glucose responses.

## 🚀 Live Demo

**Production**: [https://glucowise-n8bumzr26-franciscos-projects-73f8717a.vercel.app](https://glucowise-n8bumzr26-franciscos-projects-73f8717a.vercel.app)

## 📄 Clinical Documentation
> **Medical Logic Verified**: This application implements the **Smart Bolus Logic** (Carbs/ICR + Correction) vs. Omada's coaching model.
>
> 👉 [**View Full Product Requirements (PRD)**](../../project-2-prd/GlucoWise-AI-PRD.md)


## 🏗️ Architecture
**Safety First**: A physics-based metabolic engine validates all meal inputs before prediction.

```mermaid
graph TD
    Meal[Meal Input] --> Physics[⚛️ Metabolic Physics]
    Physics -- Carbs > 75g --> Severe[🔴 Severe Spike Warning]
    Physics -- Fiber > 10g --> Moderate[🟡 Moderate Spike]
    Physics -- Low Load --> Stable[🟢 Stable Prediction]
    Stable --> AI[Glucose Prediction Engine]
```

## 🧪 Testing
Run metabolic safety tests with:
```bash
npm test
```

## ✨ Key Features

### 1. **AI Meal Predictor** ⭐ NEW
- **Interactive Simulation**: Visualize how different meals and insulin doses affect glucose levels over time.
- **Personalized Metabolism**: Uses a "Metabolic Resistance Score" derived from a Logistic Regression model trained on real diabetes data (`diabetes.csv`).
- **PK/PD Modeling**: Simulates glucose absorption and insulin action curves based on clinical pharmacokinetics.
- **Actionable Insights**: Provides immediate feedback on potential spikes or hypoglycemia risks.

### 2. **Smart Glucose Tracking**
- Real-time glucose monitoring visualization
- Estimated A1C calculation
- Trend analysis (Daily/Weekly)

### 3. **Lifestyle Management**
- **Food Logger**: Track meals and nutritional content
- **Medication Adherence**: Log insulin and oral medications
- **AI Coach**: Chat interface for personalized health advice (powered by Gemini)

## 🧠 Machine Learning

### Patient Profiler Model

The Meal Predictor uses a **Logistic Regression** model trained on the [Pima Indians Diabetes Dataset](https://www.kaggle.com/uciml/pima-indians-diabetes-database) to estimate a patient's insulin resistance level.

**Training Script**: `ml-pipeline/train_glucose_model.py`

```bash
# Train the model
py ml-pipeline/train_glucose_model.py
```

**Model Performance**:
- Accuracy: ~75% (Diabetes Classification)
- Used to derive a probability score (0-1) that scales the glucose spike amplitude in the simulator.

**Key Features**:
- Glucose, BMI, Age, Insulin, BloodPressure

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

## 📁 Project Structure

```
glucowise-ai/
├── components/
│   ├── PatientDashboard.tsx
│   ├── MealPredictor.tsx  ⭐ NEW
│   ├── GlucoseChart.tsx
│   ├── FoodLogger.tsx
│   └── AIChatInterface.tsx
├── ml-pipeline/
│   └── train_glucose_model.py    # Model training script
├── App.tsx
├── types.ts
└── README.md
```

## 📝 License

MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built by Francisco Pinheiro** | [LinkedIn](https://linkedin.com/in/fmmpinheiro) | [Portfolio](https://portfolio-website-franciscos-projects-73f8717a.vercel.app)
