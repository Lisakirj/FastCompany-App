export function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();

  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();
        if (minutesDif >= 0 && minutesDif < 5) return "1 хвилину тому";
        if (minutesDif >= 5 && minutesDif < 10) return "5 хвилин тому";
        if (minutesDif >= 10 && minutesDif < 30) {
          return "10 хвилин тому";
        }
        return "30 хвилин тому";
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getDate()} ${date.toLocaleString("uk", {
      month: "long",
    })}`;
  }
  return (
    date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()
  );
}
