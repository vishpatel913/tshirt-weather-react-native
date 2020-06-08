import json
import requests
import os
from urllib.parse import urlencode
from .clothing import calculate_clothing

deg_unit = '\u00b0C'


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
        response = self.get('realtime', params)

        return self.normalize_weather(response)

    def get_hourly(self):
        params = self.params
        params['fields'] = ','.join(
            self.fields + ['precipitation_probability'])
        response = self.get('forecast/hourly', params)

        for h in response:
            del h['lat']
            del h['lon']
            h = self.normalize_weather(h)

        return response

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
        response = self.get('forecast/daily', params)

        for d in response:
            del d['lat']
            del d['lon']
            for key, value in d.items():
                if isinstance(value, list):
                    d[key] = self.normalize_min_max(value)

                    if key in ['temp', 'feels_like']:
                        d[key]['min']['units'] = deg_unit
                        d[key]['max']['units'] = deg_unit

        return response

    @staticmethod
    def normalize_weather(dict):
        dict['precipitation_type']['value'] = dict['precipitation_type']['value'].replace(
            ' ', '_')
        for k in ['temp', 'feels_like', 'dewpoint']:
            dict[k]['units'] = deg_unit

        clothing = calculate_clothing(
            dict['temp']['value'], dict['cloud_cover']['value'])
        dict['clothing_upper'] = {'value': clothing['upper']}
        dict['clothing_lower'] = {'value': clothing['lower']}

        return dict

    @staticmethod
    def normalize_min_max(list):
        dict = {}
        for i in list:
            if 'min' in i:
                dict['min'] = i['min']
                dict['min']['observation_time'] = i['observation_time']
            if 'max' in i:
                dict['max'] = i['max']
                dict['max']['observation_time'] = i['observation_time']

        return dict
