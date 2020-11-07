import json
import requests
import os
import logging
from functools import reduce
from urllib.parse import urlencode
from .clothing import calculate_clothing
from .error import ErrorWithCode

deg_c_unit = "\u00b0C"


class WeatherAPI:
    def __init__(self, coords):
        if not all(coords.values()):
            raise ValueError("Coordinates required")

        self.base_url = "https://api.climacell.co/v3/weather"
        self.base_params = {
            "apikey": os.environ["CLIMACELL_API_KEY"],
            "lat": coords["lat"],
            "lon": coords["lon"],
            "unit_system": "si",
        }
        self.generic_fields = ["temp", "feels_like", "dewpoint", "humidity",
                               "wind_speed", "wind_direction", "baro_pressure",
                               "precipitation", "precipitation_type", "sunset",
                               "sunrise", "visibility", "moon_phase",
                               "cloud_cover", "weather_code"]
        self.header = {"content-type": "application/json"}

    def get(self, endpoint, params):
        qstr = urlencode(params)
        endpoint = "%s/%s?%s" % (self.base_url, endpoint, qstr)
        response = requests.get(endpoint, headers=self.header)

        if response.status_code != 200:
            raise ErrorWithCode(
                "Failed to connect to ClimaCell API", response.status_code
            )

        return response.json()

    def get_current(self):
        params = self.base_params
        params["fields"] = ",".join(self.generic_fields)
        response = self.get("realtime", params)

        return self.normalize_weather(response)

    def get_hourly(self):
        params = self.base_params
        params["fields"] = ",".join(
            self.generic_fields + ["precipitation_probability"])
        response = self.get("forecast/hourly", params)

        normalized_response = [
            self.normalize_weather(h, hourly=True) for h in response]

        return normalized_response

    def get_daily(self):
        params = self.base_params
        fields = self.generic_fields + [
            "precipitation_probability",
            "precipitation_accumulation",
        ]
        remove_fields = ["dewpoint", "precipitation_type",
                         "cloud_cover", "moon_phase"]
        fields = [f for f in fields if f not in remove_fields]
        params["fields"] = ",".join(fields)
        response = self.get("forecast/daily", params)

        normalized_response = [
            {
                key: self.normalize_min_max(value, key)
                for key, value in d.items()
                if key not in ["lat", "lon"]
            }
            for d in response
        ]

        return normalized_response

    @staticmethod
    def normalize_weather(dict, hourly=False):
        del dict["lat"]
        del dict["lon"]
        dict["precipitation_type"]["value"] = \
            dict["precipitation_type"]["value"].replace(" ", "_")
        for k in ["temp", "feels_like", "dewpoint"]:
            dict[k]["units"] = deg_c_unit
        if hourly:
            dict["precipitation"]["units"] = "mm"

        clothing = calculate_clothing(
            dict["temp"]["value"], dict["cloud_cover"]["value"]
        )
        dict["clothing_upper"] = {"value": clothing["upper"]}
        dict["clothing_lower"] = {"value": clothing["lower"]}

        return dict

    @staticmethod
    def normalize_min_max(value, key):
        if not isinstance(value, list):
            return value

        normalized_dict = {}
        time_key = "observation_time"
        for m in value:
            limit_key = reduce(lambda a, b: a if a !=
                               time_key else b, m.keys())
            if limit_key in m:
                normalized_dict[limit_key] = m[limit_key]
                normalized_dict[limit_key][time_key] = m[time_key]
                if key in ["temp", "feels_like"]:
                    normalized_dict[limit_key]["units"] = deg_c_unit

        return normalized_dict
