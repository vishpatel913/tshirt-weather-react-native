import requests
import os


def geocode_coords(coords):
    URL = "https://geocode.search.hereapi.com/v1/revgeocode"
    location = coords["lat"] + "," + coords["lon"]  # taking user input
    api_key = os.environ["HERE_API_KEY"]  # Acquire from developer.here.com
    PARAMS = {"apikey": api_key, "at": location}
    r = requests.get(url=URL, params=PARAMS)
    data = r.json()
    return data["items"][0]["address"]["district"]
