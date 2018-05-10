export const getHoursFromUnix = (time, hour12 = false) => {

  const date = new Date(0);
  date.setUTCSeconds(time);
  let options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: hour12
  };
  let t = date.toLocaleTimeString('en-UK', options).split(':');

  return `${t[0]}:${t[1]}`;
}

export const getLongDateString = (time) => {

  const date = new Date(0);
  date.setUTCSeconds(time);
  const d = date.toDateString().split(' ');

  return `${d[0]} ${d[2]} ${d[1]} ${d[3]}`;
};

export const getDayOfWeek = (time, short = false) => {

  const days = short
  ? ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']
  : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date(0);
  date.setUTCSeconds(time);

  return days[date.getDay()];
}
