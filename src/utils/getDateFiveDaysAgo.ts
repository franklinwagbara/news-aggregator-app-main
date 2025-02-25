function getDateFiveDaysAgo(): string {
  const date = new Date();
  date.setDate(date.getDate() - 5);
  return date.toISOString().split("T")[0];
}

export default getDateFiveDaysAgo;
