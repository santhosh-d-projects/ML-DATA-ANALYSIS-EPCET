import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


# Define relative path to dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data = pd.read_csv(os.path.join(BASE_DIR, "..", "Datasets", "Indian_Traffic_Violations.csv"))

print(data.describe())


df = data[['Violation_ID',
           'Violation_Type',
           'Fine_Amount',
           'Location',
           'Date',
           'Time',
           'Vehicle_Type',
           'Driver_Age',
           'Driver_Gender',
           'Penalty_Points']]


df.columns = ['vid',
              'vtype',
              'fine',
              'location',
              'date',
              'time',
              'vehicle',
              'age',
              'gender',
              'points']


print("\nDataset:")
print(df)

graph = df.groupby(['location', 'vtype']).size().reset_index(name='count')

print("\nViolation Count by State and Type:")
print(graph)

plt.figure(figsize=(15, 7))

sns.barplot(
    x='location',
    y='count',
    hue='vtype',
    data=graph
)

plt.title("Traffic Violation Types by State")
plt.xlabel("State")
plt.ylabel("Number of Violations")



plt.show()