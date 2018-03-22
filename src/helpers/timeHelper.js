export const getHoursFromUnix = (time, hour12 = false) => {
  const date = new Date(0);
  date.setUTCSeconds(time);

  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: hour12
  };

  var times = date.toLocaleTimeString('en-UK', options).split(':');
  var formattedTime = times[0] + ':' + times[1];

  return formattedTime;
}

export const getLongDateString = (time) => {
  const date = new Date(0);
  date.setUTCSeconds(time);
  const d = date.toDateString().split(' ');
  const formattedDate = `${d[0]}, ${d[2]} ${d[1]} ${d[3]}`
  return formattedDate;
};

export const getDayOfWeek = (time) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date(0);
  date.setUTCSeconds(time);

  return days[date.getDay()];
}
