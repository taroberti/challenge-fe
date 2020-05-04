const posixToDate = posixDate => {
  const date = new Date(posixDate);

  let month = date.getMonth() + 1;
  month = (month < 10) ? `0${ month }` : month;

  let day = date.getDate();
  day = (day < 10) ? `0${ day }` : day;

   return `${ day }.${ month }.${ date.getFullYear() }`;
}

const dateToInputDate = date => {
  let month = date.getMonth() + 1;
  month = (month < 10) ? `0${ month }` : month;

  let day = date.getDate();
  day = (day < 10) ? `0${ day }` : day;

   return `${ date.getFullYear() }-${ month }-${ day }`;
}

const inputDateToPosix = date => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);

  return Date.parse(new Date(year, (month - 1), day));
}

export { posixToDate, dateToInputDate, inputDateToPosix };