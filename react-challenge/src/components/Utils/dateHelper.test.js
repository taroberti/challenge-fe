import { posixToDate, dateToInputDate, inputDateToPosix } from './dateHelper';

it('returns a formatted date when giving posix as parameter', () => {
  const date = posixToDate(Date.parse(new Date(0)));
  expect(date).toBe('01.01.1970');
});

it('returns a formatted date for input fields when giving a date as parameter', () => {
  const formattedDate = dateToInputDate(new Date(0));
  expect(formattedDate).toBe('1970-01-01');
});

it('returns a posix when giving an input date as parameter', () => {
  const posix = inputDateToPosix('1970-01-01');
  const posixTest = Date.parse(new Date(1970, 0, 1));
  expect(posix).toBe(posixTest);
});