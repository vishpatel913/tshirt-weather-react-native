export const getHoursFromUnix = (time, hour12 = false) => {
  const date = new Date(0);
  date.setUTCSeconds(time);

  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: hour12
  };

  return date.toLocaleString('en-UK', options);
}

export const getLongDateString = (time) => {
  const date = new Date(0);
  date.setUTCSeconds(time);
  return `${date.toDateString()}`;
};

export const getDayOfWeek = (time) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date(0);
  date.setUTCSeconds(time);

  return days[date.getDay()];
}
