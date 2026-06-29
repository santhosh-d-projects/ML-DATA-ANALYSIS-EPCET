import os
import pandas as pd
import matplotlib.pyplot as plt

# Define relative path to dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data = pd.read_excel(os.path.join(BASE_DIR, "..", "Datasets", "Cancer_Statewise_Dataset_500_Rows.xlsx"))

df = data[['State', 'Cured_Cases', 'Deaths']]

state_data = df.groupby('State').sum().reset_index()

state_data.plot(
    x='State',
    y=['Cured_Cases', 'Deaths'],
    kind='bar',
    figsize=(14,6)
)

plt.title("State vs Cured Cases and Deaths")
plt.xlabel("State")
plt.ylabel("Number of Patients")
plt.xticks(rotation=90)

plt.show()