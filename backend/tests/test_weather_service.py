import json
import os
from unittest.mock import patch, MagicMock
from nose.tools import with_setup, assert_equal, assert_in, assert_not_in
from app.weather_api import WeatherAPI

mock_coords = {'lat': '54.9952895', 'lon': '-1.609961'}
with patch.dict(os.environ, {'CLIMACELL_API_KEY': 'key'}):
    mock_weather_api = WeatherAPI(mock_coords)


def mock_get(endpoint, params):
    with open(f'./tests/mocks/{endpoint.replace("/", "_")}_response.json', 'r') as mock_data:
        return json.load(mock_data)


def setup_mock():
    mock_weather_api.get = MagicMock(side_effect=mock_get)


@with_setup(setup_mock)
def test_get_current_correct_values():
    response = mock_weather_api.get_current()
    cloud_cover = response['cloud_cover']
    weather_code = response['weather_code']
    assert_equal(cloud_cover['value'], 77)
    assert_equal(weather_code['value'], 'rain_light')


@with_setup(setup_mock)
def test_get_current_correct_temp_units():
    response = mock_weather_api.get_current()
    temp = response['temp']
    assert_equal(temp['units'], '°C')


@with_setup(setup_mock)
def test_get_hourly_correct_params_passed():
    response = mock_weather_api.get_hourly()
    assert_in('precipitation_probability',
              mock_weather_api.params['fields'])


@with_setup(setup_mock)
def test_get_hourly_correct_type_string_format():
    response = mock_weather_api.get_hourly()
    precip_type = response[0]['precipitation_type']
    assert_equal(precip_type['value'], 'freezing_rain')


@with_setup(setup_mock)
def test_get_daily_correct_params_passed():
    response = mock_weather_api.get_daily()
    assert_in('precipitation_accumulation',
              mock_weather_api.params['fields'])
    assert_not_in('cloud_cover',
                  mock_weather_api.params['fields'])


@with_setup(setup_mock)
def test_get_daily_correct_max_min_normalisation():
    response = mock_weather_api.get_daily()
    today = response[0]
    tempMax = today['temp']['max']['value']
    assert_equal(tempMax, 20)


@with_setup(setup_mock)
def test_get_daily_correct_temp_unit():
    response = mock_weather_api.get_daily()
    today = response[0]
    units = today['feels_like']['min']['units']
    assert_equal(units, '°C')
