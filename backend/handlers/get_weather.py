import setup

import json
import logging

from app.weather_api import WeatherAPI
from app.geocode import geocode_coords
from app.response import build_response
from app.error import ErrorWithCode


def main(event, context):
    params = event["queryStringParameters"]

    if not all(c in params for c in ["lat", "lon"]):
        logging.error("Coordinates not supplied")
        return build_response(400, {"message": "Coordinates required"})

    coords = {"lat": params["lat"], "lon": params["lon"]}
    generated_data_path = "./data/generated_response.json"

    if "mocks" in params:
        with open(generated_data_path, "r") as mock_data:
            logging.info("returned mock data")
            return build_response(200, json.load(mock_data))

    weather_api = WeatherAPI(coords)
    data = {"location": coords}

    try:
        data["current"] = weather_api.get_current()
        data["hourly"] = weather_api.get_hourly()
        data["daily"] = weather_api.get_daily()
        data["location"]["name"] = geocode_coords(coords)

    except ErrorWithCode as e:
        logging.error("Unable to fetch weather data")
        return build_response(e.code, {"message": e.message})

    if "export" in params:
        with open(generated_data_path, "w") as outfile:
            json.dump(data, outfile)

    return build_response(200, data)
