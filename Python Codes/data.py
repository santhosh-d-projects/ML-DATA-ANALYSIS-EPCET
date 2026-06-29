import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


# Define relative path to dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data = pd.read_csv(os.path.join(BASE_DIR, "..", "Datasets", "covid_19_india.csv"))


df = data[["State/UnionTerritory", "Deaths"]]


df.columns = ["state", "deaths"]


df["deaths"] = pd.to_numeric(df["deaths"], errors="coerce")


df = df.groupby("state", as_index=False)["deaths"].max()


df = df.sort_values(by="deaths", ascending=False)


plt.figure(figsize=(15, 8))
sns.barplot(x="state", y="deaths", data=df,hue="state")

plt.title("COVID-19 Deaths by State")
plt.xlabel("State")
plt.ylabel("Deaths")
plt.xticks(rotation=90)

plt.tight_layout()
plt.show()