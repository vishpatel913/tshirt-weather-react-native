import json
import unittest
from app.clothing import calculate_clothing

import unittest


class TestHandlerMethods(unittest.TestCase):
    def test_clothing_calculations(self):
        temp = 23
        cloud = 23
        clothing_json = calculate_clothing(temp, cloud)
        self.assertEqual(clothing_json,
                         {'upper': 1, 'lower': 1})


if __name__ == '__main__':
    unittest.main()
