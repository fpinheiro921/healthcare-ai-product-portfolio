# AI Scoring Algorithms Study Guide
## Healthcare AI Product Portfolio

This document explains the mathematical foundations, training processes, and clinical logic behind the three AI models in the healthcare AI portfolio.

---

## Table of Contents
1. [HeartGuide AI - Heart Disease Prediction](#heartguide-ai)
2. [BreathEasy AI - Asthma Exacerbation Prediction]  
3. [GlucoWise AI - Glucose Level Prediction]
4. [Key Differences Between Models]
5. [Common ML Concepts Explained]
6. [Clinical Validation & Feature Importance]

---

## HeartGuide AI - Heart Disease Prediction

### Overview
- **Problem**: Binary classification - predict heart disease (yes/no)
- **Algorithm**: Logistic Regression with preprocessing pipeline
- **Accuracy**: 85% (from trained model)
- **Key Features**: 11 clinical variables from UCI Heart Disease dataset

### Mathematical Foundation

#### Step 1: Training Data Generation
```python
# Generated 1,000 synthetic patient records
Features:
- Age: Uniform 28-78 years
- Sex: M/F (equal probability)  
- ChestPainType: TA, ATA, NAP, ASY
- RestingBP: Normal(130, 20) mmHg
- Cholesterol: Normal(240, 50) mg/dL
- FastingBS: 0/1 (20% elevated)
- RestingECG: Normal, ST, LVH
- MaxHR: Normal(140, 25) bpm
- ExerciseAngina: Y/N
- Oldpeak: Exponential(1) mm
- ST_Slope: Up, Flat, Down
```

#### Step 2: Risk Score Construction (Label Generation)
Each patient receives a composite risk score based on clinical evidence:

**HIGH WEIGHT (3 points):**
- **Silent Ischemia (ASY)**: Most dangerous - no pain despite disease. >70% of ASY patients have confirmed disease
- **Exercise Angina**: Chest pain during exertion indicates significant coronary stenosis

**MODERATE WEIGHT (2 points):**
- Age > 55, Resting BP > 140, FastingBS elevated, MaxHR < 120, ST Depression > 1.5mm, Flat ST slope

**LOW WEIGHT (1 point):**
- Male sex, Cholesterol > 280 mg/dL

**Formula:**
```
risk_score = sum(clinical_weights) + noise ~ N(0, 2)
```

#### Step 3: Sigmoid Probability Transformation
```
P(HeartDisease) = 1 / (1 + exp(-(risk_score - 8)))
```

**Why sigmoid centered at 8?**
- Patient needs multiple risk factors to reach 50% probability
- Example: Age > 55 (2) + ASY chest pain (3) + Exercise angina (3) = 8 → 50% probability
- Mirrors clinical reality where single risk factor rarely confirms disease

**Score examples:**
- Score = 4 → P = 1.8%
- Score = 8 → P = 50.0% 
- Score = 12 → P = 98.2%

#### Step 4: Model Training Pipeline
```python
# Scikit-learn Pipeline
Pipeline(steps=[
    ('preprocessor', ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(drop='first'), categorical_features)
        ]
    )),
    ('classifier', LogisticRegression())
])
```

**Key preprocessing steps:**
1. **StandardScaler**: Normalizes numerical features to zero mean, unit variance
2. **OneHotEncoder**: Converts categorical to binary indicators, drops one category to avoid multicollinearity
3. **Train/Test Split**: 80/20 stratified split (800 train, 200 test)

**Logistic Regression Math:**
```
z = β₀ + β₁·Age_scaled + β₂·BP_scaled + ... + βₙ·ST_Slope_Flat
P(disease) = σ(z) = 1 / (1 + e^(-z))
```

### Feature Importance (Trained Model)
- Chest Pain Type: 17.1% (highest - validates 3-point weight)
- Age: 16.4% (validates 2-point weight)
- Exercise Angina: 12.3% (validates 3-point weight)
- Resting BP: 11.9%
- ST Depression: 11.2%
- Max Heart Rate: 8.5%
- Cholesterol: 7.9%
- Fasting Blood Sugar: 6.3%
- ST Slope: 4.3%
- Sex: 2.0%
- Resting ECG: 2.0%

**Validation**: Learned importance aligns with clinical scoring weights, confirming the model learned the clinical signal.

---

## BreathEasy AI - Asthma Exacerbation Prediction

### Overview
- **Problem**: Binary classification - predict asthma exacerbation (yes/no)
- **Algorithm**: Random Forest Classifier (100 trees, depth=8)
- **Accuracy**: 76%
- **Key Features**: 11 clinical + environmental variables

### Mathematical Foundation

#### Step 1: Training Data Generation
```python
# Generated 1,000 synthetic asthma patient records
Features:
- Age: Uniform 5-75 years (wide range reflects all age groups)
- PeakFlow: Normal(400, 80) L/min (mixed-severity adult population)
- SymptomScore: Uniform 0-10 scale
- MedicationAdherence: 0/1 (70% adherent)
- AirQuality: Good/Moderate/Poor
- Pollen: Low/Medium/High
- Temperature: Normal(20, 8) °C
- Humidity: Normal(60, 15) %
- RecentInfection: 0/1 (20% infected)
- StressLevel: Uniform 1-10 scale
- SleepQuality: Uniform 1-10 scale
```

#### Step 2: Risk Score Construction (Label Generation)
Each patient receives a composite risk score based on respiratory medicine evidence:

**HIGH WEIGHT (3 points):**
- **Peak Flow < 350 L/min**: Below 80% of personal best = Yellow Zone approaching Red Zone
- **Symptom Score > 5/10**: Inadequately controlled asthma per GINA guidelines
- **Recent Infection**: #1 trigger for exacerbations (~80% of acute episodes)

**MODERATE WEIGHT (2 points):**
- Poor Air Quality (AQI > 100), High Pollen, Medication Non-Adherence

**LOW WEIGHT (1 point):**
- Cold Weather (<10°C), High Humidity (>75%), High Stress, Poor Sleep

**Formula:**
```
risk_score = sum(clinical_weights) + noise ~ N(0, 2)
```

#### Step 3: Sigmoid Probability Transformation
```
P(Exacerbation) = 1 / (1 + exp(-(risk_score - 6)))
```

**Why sigmoid centered at 6?**
- Lower than HeartGuide (8) because asthma exacerbations can be triggered by fewer factors
- Example: Recent infection (3) + Low PEF (3) = 6 → 50% probability
- Reflects clinical reality where viral infection + airway obstruction is often sufficient

**Score examples:**
- Score = 2 → P = 1.8%
- Score = 6 → P = 50.0%
- Score = 10 → P = 98.2%
- Score = 14 → P = 99.97%

#### Step 4: Model Training Pipeline
```python
# Random Forest Classifier Pipeline
LabelEncoder()  # Converts categorical to ordinal
RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
```

**Key differences from HeartGuide:**
1. **LabelEncoder instead of OneHotEncoder**: Random Forests can handle ordinal encodings
2. **Non-linear model**: Captures interactions between features (cold weather alone mild, but cold + infection + low PEF = dangerous)
3. **Ensemble voting**: Final prediction = majority vote across 100 trees

**Random Forest Math (simplified):**
```
Tree₁ votes: Exacerbation=1 (PEF<350 AND Infection=1)
Tree₂ votes: Exacerbation=0 (Symptoms<3 AND AQI=Good)
...
Final = mode(Tree₁, Tree₂, ..., Tree₁₀₀)
P(exacerbation) = fraction of trees voting "1"
```

### Feature Importance (Trained Model)
- Peak Flow: 20.0% (highest - validates 3-point weight)
- Symptom Score: 13.9% (validates 3-point weight)
- Humidity: 10.5%
- Temperature: 9.2%
- Age: 8.9%
- Recent Infection: 8.4%
- Sleep Quality: 6.4%
- Stress Level: 6.3%
- Pollen: 5.8%
- Air Quality: 5.5%
- Medication Adherence: 5.1%

**Validation**: PeakFlow and SymptomScore dominate, matching 3-point clinical weights. Continuous features rank higher than categorical because Random Forest can exploit fine-grained thresholds.

---

## GlucoWise AI - Glucose Level Prediction

### Overview
- **Problem**: Regression - predict continuous glucose level in mg/dL (70-300 range)
- **Algorithm**: Random Forest Regressor (100 trees, depth=10)
- **Performance**: MAE = 11.96 mg/dL, R² = 0.882
- **Key Features**: 8 metabolic + behavioral variables

### Mathematical Foundation

#### Step 1: Training Data Generation
```python
# Generated 1,000 synthetic diabetes patient records
Features:
- Age: Uniform 25-75 years
- BMI: Normal(28, 5) kg/m² (overweight average in diabetic population)
- CarbohydrateIntake: Uniform 30-200 grams (keto to high-carb meals)
- PhysicalActivity: Low/Moderate/High
- MedicationAdherence: 0/1 (80% adherent)
- StressLevel: Uniform 1-10 scale
- SleepHours: Normal(7, 1.5) hours
- BaselineGlucose: Normal(120, 30) mg/dL (pre-diabetic to diabetic range)
```

#### Step 2: Glucose Formula Construction (Label Generation)
Unlike HeartGuide/BreathEasy (binary), GlucoWise predicts continuous values using an additive model:

```python
glucose = BaselineGlucose
    + (CarbohydrateIntake - 100) × 0.5
    + (Age - 50) × 0.3
    + (BMI - 25) × 1.5
    + isLowActivity × 15
    + isHighActivity × (-10)
    + (1 - MedicationAdherence) × 25
    + StressLevel × 2
    + (7 - SleepHours) × 3
    + noise ~ N(0, 10)
# clipped to [70, 300] mg/dL
```

**Clinical rationale for coefficients:**

**STRONGEST ELEVATORS:**
- **Carbohydrate Intake: (carbs - 100) × 0.5 mg/dL**: Primary dietary driver. 100g reference = moderate meal. At 200g = +50 mg/dL. Conservative coefficient accounts for mixed meals with fat/protein slowing absorption.
- **Medication Non-Adherence: +25 mg/dL**: Based on clinical data showing missed metformin increases fasting glucose by 20-30 mg/dL within 24h. Binary step function (0 or 25).
- **Sedentary Lifestyle: +15 mg/dL**: Physical inactivity reduces GLUT4 expression, impairing glucose uptake. Studies show 10-20 mg/dL increase on sedentary days.

**MODERATE FACTORS:**
- **BMI: (BMI - 25) × 1.5 mg/dL**: Each BMI unit above 25 adds 1.5 mg/dL. At BMI 35 = +15 mg/dL. Reflects established BMI-insulin resistance relationship.
- **Sleep Deficit: (7 - sleep_hours) × 3 mg/dL**: Each hour below CDC minimum adds 3 mg/dL. One night of 4h sleep can increase insulin resistance by 25%.
- **Stress: stress_level × 2 mg/dL**: Cortisol promotes hepatic gluconeogenesis. At stress level 10 = +20 mg/dL.

**MINOR FACTORS:**
- **High Physical Activity: -10 mg/dL**: Exercise increases GLUT4 expression and insulin-independent glucose uptake.
- **Age: (age - 50) × 0.3 mg/dL**: Beta-cell function declines after 50. 75-year-old = +7.5 mg/dL over reference.

#### Step 3: Regression vs Classification
**Classification (HeartGuide/BreathEasy):**
- Output: 0 or 1
- Metric: Accuracy (% correct)
- Loss: Cross-entropy

**Regression (GlucoWise):**
- Output: 70-300 mg/dL
- Metric: MAE, R²
- Loss: Mean Squared Error

**Why regression?** Knowing glucose will be "187 mg/dL" (regression) is more useful than knowing it will be "high" (classification) for precise insulin/carb dosing.

**Performance metrics:**
- **MAE = 11.96 mg/dL**: Average prediction error. CGM devices have ~9 mg/dL error, so model is clinically comparable.
- **R² = 0.882**: Model explains 88.2% of glucose variability. Remaining 11.8% = noise, unmeasured factors, individual physiology.

#### Step 4: Model Training Pipeline
```python
# Random Forest Regressor Pipeline
LabelEncoder()  # PhysicalActivity: High=0, Low=1, Moderate=2
RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
```

**Key differences:**
1. **Regression trees**: Split on thresholds that minimize Mean Squared Error (MSE) within leaf nodes
2. **Averaging not voting**: Final prediction = average of all 100 tree predictions
3. **Deeper trees (depth=10)**: Regression needs finer granularity for continuous values

**Random Forest Regressor Math:**
```
Tree₁ predicts: glucose = 165 mg/dL
Tree₂ predicts: glucose = 172 mg/dL
Tree₃ predicts: glucose = 158 mg/dL
...
Final = mean(Tree₁, Tree₂, ..., Tree₁₀₀) = 163 mg/dL
```

### Feature Importance (Trained Model)
- Baseline Glucose: 49.5% (highest)
- Carbohydrate Intake: 33.9% (second highest)
- BMI: 4.7%
- Medication Adherence: 3.7%
- Stress Level: 2.4%
- Sleep Hours: 2.2%
- Age: 2.0%
- Physical Activity: 1.7%

**Key insight**: Baseline glucose (49.5%) + carbohydrate intake (33.9%) = 83.4% of glucose variability. This validates the meal-photo prediction approach — knowing baseline and what they eat predicts most of the response.

---

## Key Differences Between Models

| Aspect | HeartGuide AI | BreathEasy AI | GlucoWise AI |
|--------|---------------|---------------|--------------|
| **Problem Type** | Binary Classification | Binary Classification | Regression |
| **Algorithm** | Logistic Regression | Random Forest Classifier | Random Forest Regressor |
| **Output** | 0/1 (disease yes/no) | 0/1 (exacerbation yes/no) | 70-300 mg/dL |
| **Performance** | 85% accuracy | 76% accuracy | MAE 11.96, R² 0.882 |
| **Key Features** | 11 clinical variables | 11 clinical + environmental | 8 metabolic + behavioral |
| **Preprocessing** | StandardScaler + OneHotEncoder | LabelEncoder | LabelEncoder |
| **Model Complexity** | Linear (weighted sum + sigmoid) | Non-linear (decision trees) | Non-linear (decision trees) |
| **Sigmoid Center** | 8 (requires multiple factors) | 6 (fewer factors trigger) | N/A (regression) |
| **Ensemble Method** | Single model | 100 trees (majority vote) | 100 trees (average) |
| **Tree Depth** | N/A | 8 | 10 |

---

## Common ML Concepts Explained

### 1. Synthetic Data Generation
**Why use synthetic data?**
- Real patient data is protected by HIPAA/GDPR
- Allows controlled experiments with known ground truth
- Enables reproducible demonstrations

**How it works:**
- Define realistic distributions for each feature
- Apply clinical rules to generate target labels
- Add noise to simulate real-world variability

### 2. Sigmoid Function
**Formula:** `σ(x) = 1 / (1 + e^(-x))`

**Properties:**
- Maps any real number to (0, 1) range
- Creates smooth S-curve transition
- Used for probability output in classification

**Clinical interpretation:**
- Low scores → near-zero probability
- High scores → near-100% probability
- Around threshold → ~50% probability (uncertainty zone)

### 3. Random Forest Ensemble
**Concept:** Multiple decision trees trained on different data subsets

**Benefits:**
- Reduces overfitting (averaging smooths noise)
- Captures non-linear interactions
- Provides feature importance metrics

**Classification vs Regression:**
- Classification: Majority vote across trees
- Regression: Average prediction across trees

### 4. Feature Importance
**Classification (Gini Impurity):**
- Measures how much each feature reduces impurity in splits
- Higher importance = more useful for making correct predictions

**Regression (Mean Decrease in MSE):**
- Measures how much each feature reduces prediction error
- Higher importance = more useful for accurate predictions

### 5. Preprocessing Pipelines
**StandardScaler:**
- Normalizes numerical features to zero mean, unit variance
- Critical for algorithms using gradient optimization (Logistic Regression)

**OneHotEncoder:**
- Converts categorical to binary indicators
- Drops one category to avoid multicollinearity

**LabelEncoder:**
- Converts categorical to ordinal integers
- Works for tree-based algorithms that split on thresholds

---

## Clinical Validation & Feature Importance

### Validation Strategies
1. **Cross-validation with clinical weights**: Learned importance should align with clinical evidence
2. **Threshold selection**: Sigmoid centers reflect clinical reality (multiple factors needed for disease)
3. **Performance metrics**: Choose metrics relevant to clinical use (accuracy for screening, MAE for dosing)

### Clinical Interpretation
**HeartGuide:**
- Top features (ChestPainType, Age, ExerciseAngina) match 3-point clinical weights
- Validates that model learned clinically meaningful patterns

**BreathEasy:**
- PeakFlow and SymptomScore dominate, matching 3-point clinical weights
- Continuous features rank higher due to fine-grained thresholds

**GlucoWise:**
- Baseline + Carbohydrates = 83.4% of variance
- Validates meal-photo prediction approach

### Why This Matters for Employers
1. **Technical depth**: Demonstrates understanding of ML algorithms, preprocessing, and evaluation
2. **Clinical relevance**: Shows ability to translate medical knowledge into technical implementations
3. **Practical thinking**: Synthetic data generation, noise modeling, and realistic constraints
4. **Communication skills**: Complex concepts explained clearly with clinical context
5. **End-to-end thinking**: From data generation through deployment and validation

---

## Quick Reference for Interviews

### HeartGuide AI
- **Problem**: Heart disease prediction (binary classification)
- **Algorithm**: Logistic Regression with StandardScaler + OneHotEncoder
- **Key insight**: Silent ischemia (ASY) is most dangerous - no pain but high disease risk
- **Clinical validation**: Feature importance matches 3-point clinical weights

### BreathEasy AI  
- **Problem**: Asthma exacerbation prediction (binary classification)
- **Algorithm**: Random Forest Classifier (100 trees, depth=8)
- **Key insight**: Viral infections are #1 trigger for exacerbations
- **Clinical validation**: PeakFlow and SymptomScore dominate as expected

### GlucoWise AI
- **Problem**: Glucose level prediction (regression)
- **Algorithm**: Random Forest Regressor (100 trees, depth=10)
- **Key insight**: Baseline glucose + carbohydrate intake explain 83.4% of variability
- **Clinical validation**: Validates meal-photo prediction approach for diabetes management

### Common Themes
- **Two-stage pipeline**: Synthetic data generation → ML model training
- **Clinical grounding**: All weights and coefficients based on medical evidence
- **Realistic constraints**: Noise modeling, feature distributions, performance targets
- **Comprehensive explanation**: Math, training, validation, and clinical interpretation

---

*This study guide covers the technical and clinical foundations of the AI scoring algorithms. Use it to prepare for technical interviews and to demonstrate your understanding of healthcare AI implementation.*
