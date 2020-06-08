import json
import requests
import os
from app.weather_api import WeatherAPI
from app.geocode import geocode_coords


def main(event, context):
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    weather_api = WeatherAPI(coords)

    data = {}
    data['current'] = weather_api.get_current()
    data['hourly'] = weather_api.get_hourly()
    data['daily'] = weather_api.get_daily()
    data['location'] = geocode_coords(coords)

    if 'export' in params:
        with open('../src/services/weather/mocks/tempGeneratedResponse.ts', 'w') as outfile:
            outfile.write('export default ')
        with open('../src/services/weather/mocks/tempGeneratedResponse.ts', 'a') as outfile:
            json.dump(data, outfile)

    response = {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(data)
    }

    return response
