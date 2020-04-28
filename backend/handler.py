import json
from app.weather_api import WeatherAPI


def main(event, context):
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    weather_api = WeatherAPI(coords)

    data = {
        'current': weather_api.get('weather'),
        'all': weather_api.get('onecall'),
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(data)
    }

    return response
