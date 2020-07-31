import json
import numpy
import requests
import pandas as pd
from datetime import datetime
from pandas.io.json import json_normalize

WANTED_COLUMNS = ["date", "time", "apparentTemperature", "humidity", "precipIntensity", 
                "precipProbability", "pressure", "temperature", "windBearing", "windGust"]

DARK_SKY_DATA = { 
    # Conta dellipi@gmail.com
    "TOKEN": "8fb2a82154d6f351b911fef45f944245",
    "URLS": {
        # https://api.darksky.net/forecast/[key]/[latitude],[longitude]
        "FORECAST": "https://api.darksky.net/forecast/{0}/{1},{2}?lang=pt&units=si",
        # https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]
        "TIME_MACHINE": "https://api.darksky.net/forecast/{0}/{1},{2},{3}?lang=pt&units=si"
    }
}

NA = numpy.float64(numpy.nan)

def datetime_to_unix(date, time):
    date_time = f"{date}T{time}"
    new_date = datetime.strptime(date_time, "%Y-%m-%dT%H:%M:%S")
    return int(datetime.timestamp(new_date))

def unix_to_datetime(unix):
    return datetime.utcfromtimestamp(unix).strftime("%Y-%m-%d"), datetime.utcfromtimestamp(unix).strftime("%H:%M:%S")

def fahrenheit_to_celsius(temp):
    return (temp - 32) * (5/9)

def pressure_unit_conversion(pres):
    return pres / 1013.25

def _get_json(timestamp, lat, lon):
    token = DARK_SKY_DATA["TOKEN"]
    final_url = DARK_SKY_DATA["URLS"]["TIME_MACHINE"].format(token, lat, lon, timestamp)
    response = requests.get(final_url)
    return response.text

def get_data_timemachine(date, time, lat, lon):

    today = datetime.now().strftime("%Y-%m-%d")

    tidy = {
        "date": [], 
        "time": []
    }

    keys = ["date", "time"]
    block = ["precipType"]

    timestamp = datetime_to_unix(date, time)
    raw_text = _get_json(timestamp, lat, lon)
    raw_data = json.loads(raw_text)

    hourly = raw_data["hourly"]["data"]
    for item in hourly:
        item["date"], item["time"] = unix_to_datetime(int(item["time"]))

    print(hourly)
    return hourly

if __name__ == "__main__":
    get_data_timemachine("2020-01-01", "12:00:00", "-23.4963621", "-46.6220666")

# Sample - Mirante de Santana (SP)
# Latitude: -23.4963621
# Longitude: -46.6220666
# Data: 01/01/2020, 12:00:00

    '''
    df = json_normalize(hourly)

    columns = list(df)
    check = df["date"]

    for column in columns:
        aux_list = df[column]
        if column not in keys and column not in block and column in WANTED_COLUMNS:
            keys.append(column)
            tidy[column] = []

            if "Error" in column:
                for i in range(0, len(tidy["date"])):
                    tidy[column].append(NA)

        if column in keys:
            for i in range(0, len(aux_list)):
                if check[i] != today:
                    tidy[column].append(aux_list[i])

    size = len(tidy["date"])

    for key, val in tidy.items():
        diff = size - len(val)
        for i in range(0, diff):
            val.append(NA)

    columns = ["date", "time", "apparentTemperature", "humidity", "precipIntensity", 
            "precipProbability", "pressure", "temperature", "windBearing", "windGust"]

    new_df = pd.DataFrame.from_dict(tidy)
    print(new_df)'''