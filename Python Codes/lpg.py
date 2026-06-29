import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Define relative path to dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data = pd.read_csv(os.path.join(BASE_DIR, "..", "Datasets", "LPG_Statewise_Migration_Dataset_500_Rows.csv"))

print(data.describe())

df = data[['State', 'LPG_Consumption_MMT', 'LPG_Shortage_MMT', 'People_Migrated']]

df.columns = ['state', 'consumption', 'shortage', 'migrated']

state_data = df.groupby('state').sum().reset_index()

print(state_data)

plt.figure(figsize=(12,6))
sns.barplot(x='state', y='shortage', data=state_data)
plt.title("State vs LPG Shortage")
plt.xlabel("State")
plt.ylabel("Total LPG Shortage (MMT)")
plt.xticks(rotation=90)
plt.show()

plt.figure(figsize=(12,6))
sns.barplot(x='state', y='consumption', data=state_data)
plt.title("State vs LPG Consumption")
plt.xlabel("State")
plt.ylabel("Total LPG Consumption (MMT)")
plt.xticks(rotation=90)
plt.show()

plt.figure(figsize=(12,6))
sns.barplot(x='state', y='migrated', data=state_data)
plt.title("State vs People Migrated")
plt.xlabel("State")
plt.ylabel("Total People Migrated")
plt.xticks(rotation=90)
plt.show()