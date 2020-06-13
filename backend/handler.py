import json
import requests
import os
from app.weather_api import WeatherAPI
from app.geocode import geocode_coords


def buildResponse(code, data, message=""):
    response = {
        'statusCode': code,
        'message': message,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(data)
    }
    return response


def main(event, context):
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    mock_path = './mocks/generatedResponse.json'

    if 'mocks' in params:
        with open(mock_path, 'r') as mock_data:
            print('using mocks')
            return buildResponse(200, json.load(mock_data), 'using mocks')

    weather_api = WeatherAPI(coords)

    data = {}
    data['current'] = weather_api.get_current()
    data['hourly'] = weather_api.get_hourly()
    data['daily'] = weather_api.get_daily()
    data['location'] = geocode_coords(coords)

    if 'export' in params:
        with open(mock_path, 'w') as outfile:
            json.dump(data, outfile)

    return buildResponse(200, data)
