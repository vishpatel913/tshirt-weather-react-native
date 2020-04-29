import json
from app.weather_api import WeatherAPI


def main(event, context):
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    weather_api = WeatherAPI(coords)

    current = weather_api.get('weather')
    data = weather_api.get('onecall')

    data['country'] = current['sys']['country']
    data['location'] = current['name']
    data['current']['temp_max'] = current['main']['temp_max']
    data['current']['temp_min'] = current['main']['temp_min']

    response = {
        "statusCode": 200,
        "body": json.dumps(data)
    }

    return response
