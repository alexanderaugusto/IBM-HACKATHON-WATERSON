import json
import requests
import pandas as pd

INPUT_FILE = "data_alagamento_sp_tidy.csv"
url = "https://photon.komoot.de/api/?q={0}&limit=1"

df = pd.read_csv(INPUT_FILE)

lat = []
lon = []

for line in df.itertuples():
    try:
        query_string = f"{line.rua.replace(' ', '+')}+{line.bairro.replace(' ', '+')}+sao+paulo"
        response = requests.get(url.format(query_string)).json()
        print(json.dumps(response, indent=4))
        print(query_string)
        latitude, longitude = response["features"][0]["geometry"]["coordinates"]
        print(latitude, longitude)
        print()
        lat.append(latitude)
        lon.append(longitude)
    except:
        lat.append("")
        lon.append("")

df["latitude"] = lat
df["longitude"] = lon

print(df)
df.to_csv("data_alagamento_sp_coordenadas.csv")
