const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    if (lastOne === 1) return "человек тусанет";
    return "человек тусанет";
  };
  return (
    <div className="d-inline-flex p-2 justify-content-center ">
      <h2 className="align-items-center ">
        <span
          className={
            "badge w-100% " + (length > 0 ? "bg-primary" : "bg-danger")
          }>
          {length > 0
            ? `${length + " " + renderPhrase(length)} с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
    </div>
  );
};
export default SearchStatus;
