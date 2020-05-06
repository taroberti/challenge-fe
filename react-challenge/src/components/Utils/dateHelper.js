// Receives a posix date and returns it on the format dd.mm.yyyy
const posixToDate = posixDate => {
  const date = new Date(posixDate);

  let month = date.getMonth() + 1;
  month = (month < 10) ? `0${ month }` : month;

  let day = date.getDate();
  day = (day < 10) ? `0${ day }` : day;

   return `${ day }.${ month }.${ date.getFullYear() }`;
}

// Receives a Date and returns it on the format yyyy-mm-dd which is the way html input supports it.
const dateToInputDate = date => {
  let month = date.getMonth() + 1;
  month = (month < 10) ? `0${ month }` : month;

  let day = date.getDate();
  day = (day < 10) ? `0${ day }` : day;

   return `${ date.getFullYear() }-${ month }-${ day }`;
}

// Receives a date on the format yyyy-mm-dd and returns a posix date.
const inputDateToPosix = date => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);

  return Date.parse(new Date(year, (month - 1), day));
}

export { posixToDate, dateToInputDate, inputDateToPosix };