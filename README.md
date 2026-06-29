# 🤖 ML Data Analysis — EPCET

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.0%2B-150458?logo=pandas&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-3.7%2B-11557c)
![Seaborn](https://img.shields.io/badge/Seaborn-0.12%2B-4c72b0)

**Python data analysis projects developed as part of the AIML Assignment at EPCET.**

[📊 Projects](#-projects-included) • [🚀 How to Run](#-how-to-run) • [📦 Datasets](#-datasets) • [👨‍💻 Author](#-author)

</div>

---

## 📌 Project Overview

This repository contains **multiple Python data analysis projects** developed as part of an AI/ML Assignment. Each project performs real-world data analysis using **Pandas**, **Matplotlib**, and **Seaborn** — covering Indian datasets on COVID-19, LPG consumption, cancer statistics, and traffic violations.

---

## 🛠️ Technologies Used

| Tool | Purpose |
|------|---------|
| **Python 3.10+** | Core programming language |
| **Pandas** | Data loading, cleaning & aggregation |
| **NumPy** | Numerical operations |
| **Matplotlib** | Bar charts and static visualizations |
| **Seaborn** | Statistical data visualization |
| **OpenPyXL** | Reading `.xlsx` Excel files |

---

## 📊 Projects Included

### 1. 🦠 COVID-19 Data Analysis — `data.py`

**Dataset:** `covid_19_india.csv`

| Analysis Performed |
|--------------------|
| Date-wise filtering of COVID-19 records |
| Top states ranked by total deaths |
| Death trend analysis per state |
| Bar chart visualization (Seaborn) |

---

### 2. 🔥 LPG Statewise Migration Analysis — `lpg.py`

**Datasets:** `LPG_Statewise_Migration_Dataset_500_Rows.csv`, `India_lpg_dataset.csv`

| Analysis Performed |
|--------------------|
| State vs LPG Consumption (MMT) |
| State vs LPG Shortage (MMT) |
| State vs Total People Migrated |
| Three separate bar chart visualizations |

---

### 3. 🏥 Cancer Statewise Analysis — `cancer.py`

**Dataset:** `Cancer_Statewise_Dataset_500_Rows.xlsx`

| Analysis Performed |
|--------------------|
| State vs Cured Cancer Cases |
| State vs Cancer Deaths |
| Combined: State vs Cured Cases and Deaths |
| Grouped bar chart visualization |

---

### 4. 🚦 Indian Traffic Violations Analysis — `driving.py`

**Dataset:** `Indian_Traffic_Violations.csv`

| Analysis Performed |
|--------------------|
| Violation Type vs Fine Amount |
| State vs Total Traffic Violations |
| State vs Violation Type breakdown |
| Multi-hue bar chart (Seaborn) |

---

## 📦 Datasets

| File | Description | Source |
|------|-------------|--------|
| `covid_19_india.csv` | COVID-19 state-wise deaths & cases | [Kaggle](https://www.kaggle.com/datasets/sudalairajkumar/covid19-in-india) |
| `covid_19_india.xlsx` | Same data in Excel format | [Kaggle](https://www.kaggle.com/datasets/sudalairajkumar/covid19-in-india) |
| `Indian_Traffic_Violations.csv` | Indian traffic violation records | [Kaggle](https://www.kaggle.com) |
| `India_lpg_dataset.csv` | India state-wise LPG data | [Kaggle](https://www.kaggle.com) |
| `LPG_Statewise_Migration_Dataset_500_Rows.csv` | LPG & migration data (500 rows) | 🔧 Synthetically generated |
| `Cancer_Statewise_Dataset_500_Rows.xlsx` | Cancer cured/deaths by state | 🔧 Synthetically generated |

> 🔧 = Synthetic datasets generated for academic/assignment purposes.

---

## 🚀 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/santhosh-d-projects/ML-DATA-ANALYSIS-EPCET.git
cd ML-DATA-ANALYSIS-EPCET

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run any script
python data.py       # COVID-19 Analysis
python lpg.py        # LPG Migration Analysis
python cancer.py     # Cancer Analysis
python driving.py    # Traffic Violations Analysis
```

---

## 📁 Repository Structure

```
ML-DATA-ANALYSIS-EPCET/
│
├── data.py                                      # COVID-19 data analysis
├── lpg.py                                       # LPG statewise migration analysis
├── cancer.py                                    # Cancer statewise analysis
├── driving.py                                   # Indian traffic violations analysis
│
├── covid_19_india.csv                           # Dataset - COVID-19
├── covid_19_india.xlsx                          # Dataset - COVID-19 (Excel)
├── LPG_Statewise_Migration_Dataset_500_Rows.csv # Dataset - LPG migration
├── India_lpg_dataset.csv                        # Dataset - India LPG
├── Cancer_Statewise_Dataset_500_Rows.xlsx       # Dataset - Cancer
├── Indian_Traffic_Violations.csv                # Dataset - Traffic violations
│
├── assignment.pdf                               # Assignment screenshots (documentation)
├── requirements.txt                             # Python dependencies
└── README.md
```

---

## 📚 Libraries Used

```
pandas >= 2.0.0
matplotlib >= 3.7.0
seaborn >= 0.12.0
numpy >= 1.24.0
openpyxl >= 3.1.0
```

---

## 👨‍💻 Author

| Field | Details |
|-------|---------|
| **Name** | Santhosh D |
| **GitHub** | [@santhosh-d-projects](https://github.com/santhosh-d-projects) |
| **Repository** | [ML-DATA-ANALYSIS-EPCET](https://github.com/santhosh-d-projects/ML-DATA-ANALYSIS-EPCET) |
| **Institution** | EPCET |

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

</div>
