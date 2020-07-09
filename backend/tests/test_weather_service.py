import os
import json
from unittest.mock import patch, call, MagicMock
from nose.tools import with_setup, assert_equal, assert_in, assert_not_in, assert_raises
from app.weather_api import WeatherAPI

mock_coords = {'lat': '54', 'lon': '-1.6'}
with patch.dict(os.environ, {'CLIMACELL_API_KEY': 'key'}):
    mock_weather_api = WeatherAPI(mock_coords)


def mock_successful_get(endpoint, params):
    with open(f'./tests/mocks/{endpoint.replace("/", "_")}_response.json', 'r') as mock_data:
        return json.load(mock_data)


def setup_mock():
    mock_weather_api.get = MagicMock(side_effect=mock_successful_get)


def test_throws_error_when_null_coords():
    with patch.dict(os.environ, {'CLIMACELL_API_KEY': 'key'}):
        assert_raises(ValueError, WeatherAPI, {"lat": None, "lon": None})


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
def test_get_hourly_correct_field_params_passed():
    response = mock_weather_api.get_hourly()
    arg1, arg2 = mock_weather_api.get.call_args[0]
    assert_in('precipitation_probability', arg2['fields'])


@with_setup(setup_mock)
def test_get_hourly_correct_type_string_format():
    response = mock_weather_api.get_hourly()
    precip_type = response[0]['precipitation_type']
    assert_equal(precip_type['value'], 'freezing_rain')


@with_setup(setup_mock)
def test_get_hourly_correct_temp_units():
    response = mock_weather_api.get_hourly()
    feels_like = response[0]['feels_like']
    assert_equal(feels_like['units'], '°C')


@with_setup(setup_mock)
def test_get_daily_correct_field_params_passed():
    response = mock_weather_api.get_daily()
    arg1, arg2 = mock_weather_api.get.call_args[0]
    assert_in('precipitation_probability', arg2['fields'])
    assert_in('precipitation_accumulation', arg2['fields'])
    assert_not_in('cloud_cover', arg2['fields'])
    assert_not_in('moon_phase', arg2['fields'])


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


@with_setup(setup_mock)
def test_normalising_min_max_data():
    input = [
        {
            'min': {'value': 12, 'units': 'C'},
            'observation_time': 1000
        },
        {
            'max': {'value': 24, 'units': 'C'},
            'observation_time': 2000
        },
    ]
    expected = {
        'min': {'value': 12, 'units': '°C', 'observation_time': 1000},
        'max': {'value': 24, 'units': '°C', 'observation_time': 2000}
    }
    res = mock_weather_api.normalize_min_max(input, 'temp')

    assert_equal(res, expected)
