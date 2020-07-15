import setup

import json
import os
import logging

from app.weather_api import WeatherAPI
from app.geocode import geocode_coords
from app.response import build_response
from app.error import ErrorWithCode

import boto3

s3 = boto3.resource("s3")


def main(event, context):
    params = event["queryStringParameters"]

    if not all(c in params for c in ["lat", "lon"]):
        logging.error("Coordinates not supplied")
        return build_response(400, {"message": "Coordinates required"})

    coords = {"lat": params["lat"], "lon": params["lon"]}

    if "mocks" in params:
        key = f'mock_response_{params["mocks"]}.json'
        try:
            obj = s3.Object(bucket_name=os.environ["S3_BUCKET"], key=key)
            mock_data = obj.get()["Body"].read().decode("utf-8")
        except BaseException:
            return build_response(404, {"message": "Mock key does not exist"})

        return build_response(200, json.loads(mock_data))

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
        key = f'mock_response_{params["export"]}.json'
        s3.Object(bucket_name=os.environ["S3_BUCKET"], key=key).put(
            Body=(bytes(json.dumps(data).encode("UTF-8")))
        )

    return build_response(200, data)
