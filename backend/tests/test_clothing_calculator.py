from nose.tools import assert_true, eq_
import unittest
from app.clothing import calculate_clothing


def test_clothing_calculations():
    temp = 23
    cloud = 23
    clothing_json = calculate_clothing(temp, cloud)
    eq_(clothing_json, {"upper": 1, "lower": 1})


def test_clothing_no_params():
    temp = 23
    cloud = None
    clothing_json = calculate_clothing(temp, cloud)
    eq_(clothing_json, {"upper": 1, "lower": 0})
