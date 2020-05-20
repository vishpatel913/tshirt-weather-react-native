import json
import requests
import os
from urllib.parse import urlencode
from urllib.request import urlretrieve
# import reverse_geocoder as rg


class WeatherAPI:
    def __init__(self, coords):
        self.api_url_base = 'https://api.climacell.co/v3/weather'
        self.params = {
            'apikey': 'dwDaCRiaAN1W81nveL9j1OOTeTMcBfS7',
            'lat': coords['lat'],
            'lon': coords['lon'],
            'unit_system': 'si',
        }
        self.fields = ['temp', 'feels_like', 'dewpoint', 'humidity', 'wind_speed', 'wind_direction',
                       'baro_pressure', 'precipitation', 'precipitation_type', 'sunrise', 'sunset',
                       'visibility', 'cloud_cover', 'moon_phase', 'weather_code']
        self.header = {'content-type': 'application/json'}

    def get(self, endpoint, params):
        qstr = urlencode(params)
        api_url = '{0}/{1}?{2}'.format(self.api_url_base, endpoint, qstr)
        response = requests.get(api_url, headers=self.header)
        response = response.json()
        return response

    def get_current(self):
        params = self.params
        params['fields'] = ','.join(self.fields)
        return self.get('realtime',  params)

    def get_hourly(self):
        params = self.params
        params['fields'] = ','.join(
            self.fields + ['precipitation_probability'])
        return self.get('forecast/hourly',  params)

    def get_daily(self):
        params = self.params
        fields = self.fields + \
            ['precipitation_probability', 'precipitation_accumulation']
        remove = ['dewpoint', 'precipitation_type',
                  'cloud_cover', 'moon_phase']
        for r in remove:
            if r in fields:
                fields.remove(r)
        params['fields'] = ','.join(
            fields)
        return self.get('forecast/daily',  params)


# def geocode_coords(coords):
#     result = rg.search((coords['lat'], coords['lon']))
#     return result[0]['name']


def calculate_clothing(temp, cloud):
    print(temp, cloud)
    upper = 4
    lower = 1
    cloudConst = 6 * cloud
    if (temp >= cloudConst + 23):
        lower = 0
    elif (temp >= cloudConst + 18):
        upper = 1
    elif (temp >= cloudConst + 12):
        upper = 2
    elif (temp >= cloudConst + 6):
        upper = 3
    return {
        "upper": upper,
        "lower": lower
    }


def main(event, context):
    print(event)
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    data = {}
    weather_api = WeatherAPI(coords)
    data['location'] = 'London'  # geocode_coords(coords)
    data['current'] = weather_api.get_current()
    data['hourly'] = weather_api.get_hourly()
    data['daily'] = weather_api.get_daily()
    data['clothing'] = calculate_clothing(
        data['current']['temp']['value'], data['current']['cloud_cover']['value'])

    data['current']['temp_min'] = data['daily'][0]['temp'][0]['min']
    data['current']['temp_max'] = data['daily'][0]['temp'][1]['max']
    data['current']['precipitation_type']['value'] = data['current']['precipitation_type']['value'].replace(
        " ", "_")
    for h in data['hourly']:
        h['precipitation_type']['value'] = h['precipitation_type']['value'].replace(
            " ", "_")
        del h['lat']
        del h['lon']
    for d in data['daily']:
        del d['lat']
        del d['lon']

    if "export" in params:
        with open('../src/services/weather/mocks/tempGeneratedResponse.ts', 'w') as outfile:
            outfile.write("export default ")
        with open('../src/services/weather/mocks/tempGeneratedResponse.ts', 'a') as outfile:
            json.dump(data, outfile)

    response = {
        "statusCode": 200,
        'headers': {'Content-Type': 'application/json'},
        "body": json.dumps(data)
    }

    return response
