try:
    import unzip_requirements
except ImportError:
    pass

import json
import requests
import os
import logging
import uuid
from decimal import Decimal
from app.weather_api import WeatherAPI
from app.geocode import geocode_coords

import boto3
dynamodb = boto3.resource('dynamodb')


def build_response(code, data):
    response = {
        'statusCode': code,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(data)
    }
    return response


def save_current_data(event, context):
    params = event['queryStringParameters']
    data = json.loads(event['body'])
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    weather_api = WeatherAPI(coords)
    res = weather_api.get_current()

#     if 'upper' not in data:
#         logging.error('Validation Failed')
#         raise Exception('Couldn't create the todo item.')
    item = {
        'id': str(uuid.uuid1()),
        'temp': res['temp']['value'],
        'feels_like': res['feels_like']['value'],
        'wind_speed': res['wind_speed']['value'],
        'visibility': res['visibility']['value'],
        'dewpoint': res['dewpoint']['value'],
        'humidity': res['humidity']['value'],
        'pressure': res['baro_pressure']['value'],
        'precipitation': res['precipitation']['value'],
        'cloud_cover': res['cloud_cover']['value'],
        'clothing_class': data['upper'],
    }
    if 'lower' in data:
        item['clothing_class_lower'] = data['lower']

    dynamo_item = json.loads(json.dumps(item), parse_float=Decimal)
    table.put_item(Item=dynamo_item)

    return build_response(200, item)


def main(event, context):
    params = event['queryStringParameters']

    # if all(k not in params for k in ('lat', 'lon')):
    #     logging.error('Coordinates required')
    #     raise Exception('Need the coords, bro.')
    #     return build_response(400, {'message': 'Coordinates required'})

    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    generated_data_path = './data/generated_response.json'

    if 'mocks' in params:
        with open(generated_data_path, 'r') as mock_data:
            print('using mocks')
            return build_response(200, json.load(mock_data))

    weather_api = WeatherAPI(coords)

    data = {}
    data['current'] = weather_api.get_current()
    data['hourly'] = weather_api.get_hourly()
    data['daily'] = weather_api.get_daily()
    data['location'] = geocode_coords(coords)

    if 'export' in params:
        with open(generated_data_path, 'w') as outfile:
            json.dump(data, outfile)

    return build_response(200, data)
