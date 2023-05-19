function dateFormat(unix) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(unix);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month = months[date.getMonth()];
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${day} ${month}, ${hour}:${minutes}`;
}

export default dateFormat;
