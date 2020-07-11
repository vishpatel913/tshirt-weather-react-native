import setup

import json
import os
import logging
import uuid
import decimal

from app.weather_api import WeatherAPI
from app.response import build_response
from app.error import ErrorWithCode

import boto3

dynamodb = boto3.resource("dynamodb")


def main(event, context):
    params = event["queryStringParameters"]
    data = json.loads(event["body"])
    coords = {"lat": params["lat"], "lon": params["lon"]}
    table = dynamodb.Table(os.environ["DYNAMODB_TABLE"])

    weather_api = WeatherAPI(coords)
    res = weather_api.get_current()

    if "upper" not in data:
        logging.error("Validation Failed")
        raise ErrorWithCode("Upper clothing missing", 422)

    item = {
        "id": str(uuid.uuid1()),
        "temp": res["temp"]["value"],
        "feels_like": res["feels_like"]["value"],
        "wind_speed": res["wind_speed"]["value"],
        "visibility": res["visibility"]["value"],
        "dewpoint": res["dewpoint"]["value"],
        "humidity": res["humidity"]["value"],
        "pressure": res["baro_pressure"]["value"],
        "precipitation": res["precipitation"]["value"],
        "cloud_cover": res["cloud_cover"]["value"],
        "clothing_class": data["upper"],
    }
    if "lower" in data:
        item["clothing_class_lower"] = data["lower"]

    dynamo_item = json.loads(json.dumps(item), parse_float=decimal.Decimal)
    table.put_item(Item=dynamo_item)

    return build_response(200, item)
