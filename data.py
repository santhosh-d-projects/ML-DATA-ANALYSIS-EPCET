import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


data = pd.read_csv(r"C:\Users\santh\Downloads\archive (2)\covid_19_india.csv")


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