const formatDate = posixDate => {
  const date = new Date(posixDate);

  let month = date.getMonth() + 1;
  month = (month < 10) ? `0${ month }` : month;

  let day = date.getDate();
  day = (day < 10) ? `0${ day }` : day;

   return `${ day }.${ month }.${ date.getFullYear() }`;
}

export default formatDate;