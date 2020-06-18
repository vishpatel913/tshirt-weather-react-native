import { PermissionsAndroid } from 'react-native';

export const toTitleCase = (string: string) =>
  string
    .split(/\s|-|_/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

export const roundValue = (value: number | string, sf = 2) =>
  typeof value === 'number' && value !== 100 && value > 0
    ? Math.ceil(parseFloat(value.toPrecision(sf)) * 1000) / 1000
    : value;

export const requestLocationPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          "T-Shirt Weather needs access to your device's " +
          'geolocation so that you can see your local weather.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Location services');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
