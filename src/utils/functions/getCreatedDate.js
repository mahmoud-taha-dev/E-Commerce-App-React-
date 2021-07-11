const getCreatedDate = (dateAndTime) => {
  const date = new Date(`${dateAndTime}`);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${day} / ${month} / ${year}`;
};

export default getCreatedDate;
