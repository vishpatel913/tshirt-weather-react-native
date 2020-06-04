import json
import requests
import os
from urllib.parse import urlencode
from urllib.request import urlretrieve


class WeatherAPI:
    def __init__(self, coords):
        self.api_url_base = 'https://api.climacell.co/v3/weather'
        self.params = {
            'apikey': os.environ['CLIMACELL_API_KEY'],
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
        params['fields'] = ','.join(fields)
        return self.get('forecast/daily',  params)


def geocode_coords(coords):
    URL = "https://geocode.search.hereapi.com/v1/revgeocode"
    location = coords['lat'] + ',' + coords['lon']  # taking user input
    api_key = os.environ['HERE_API_KEY']  # Acquire from developer.here.com
    PARAMS = {'apikey': api_key, 'at': location}
    r = requests.get(url=URL, params=PARAMS)
    data = r.json()
    return data['items'][0]['address']['district']


def calculate_clothing(temp, cloud):
    upper = 4
    lower = 1
    cloudConst = 6 * cloud / 100
    if (temp >= cloudConst + 23):
        upper = 1
        lower = 0
    elif (temp >= cloudConst + 18):
        upper = 1
    elif (temp >= cloudConst + 12):
        upper = 2
    elif (temp >= cloudConst + 6):
        upper = 3
    return {
        "upper": upper,
        "lower": lower,
    }


def noramlise_response(current, hourly, daily):
    data = {'current': current, 'hourly': hourly, 'daily': daily}

    data['current']['precipitation_type']['value'] = data['current']['precipitation_type']['value'].replace(
        ' ', '_')
    clothing = data['clothing'] = calculate_clothing(
        data['current']['temp']['value'], data['current']['cloud_cover']['value'])
    data['current']['clothing_upper'] = {'value': clothing['upper']}
    data['current']['clothing_lower'] = {'value': clothing['lower']}
    deg_unit = '°C'
    for k in ['temp', 'feels_like', 'dewpoint']:
        data['current'][k]['units'] = deg_unit

    for h in data['hourly']:
        del h['lat']
        del h['lon']
        h['precipitation_type']['value'] = h['precipitation_type']['value'].replace(
            ' ', '_')
        h['temp']['units'] = deg_unit
        h['feels_like']['units'] = deg_unit
        h['dewpoint']['units'] = deg_unit
        for k in ['temp', 'feels_like', 'dewpoint']:
            h[k]['units'] = deg_unit
        clothing = data['clothing'] = calculate_clothing(
            h['temp']['value'], h['cloud_cover']['value'])
        h['clothing_upper'] = {'value': clothing['upper']}
        h['clothing_lower'] = {'value': clothing['lower']}

    for d in data['daily']:
        del d['lat']
        del d['lon']
        for key, value in d.items():
            if isinstance(value, list):
                d[key] = {}
                for v in value:
                    if 'min' in v:
                        d[key]['min'] = v['min']
                        d[key]['min']['observation_time'] = v['observation_time']
                    if 'max' in v:
                        d[key]['max'] = v['max']
                        d[key]['max']['observation_time'] = v['observation_time']

                if key in ['temp', 'feels_like']:
                    d[key]['min']['units'] = deg_unit
                    d[key]['max']['units'] = deg_unit

    return data


def main(event, context):
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    weather_api = WeatherAPI(coords)

    data = {}
    current = weather_api.get_current()
    hourly = weather_api.get_hourly()
    daily = weather_api.get_daily()

    data = noramlise_response(current, hourly, daily)
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
