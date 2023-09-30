const centerColumn = (column) => {
  return column === "completedMeetings" ||
    column === "bookmark" ||
    column === "rate"
    ? "text-center"
    : "";
};

export default centerColumn;
