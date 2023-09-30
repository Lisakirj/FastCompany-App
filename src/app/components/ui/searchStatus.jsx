import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    const lastTwo = Number(number.toString().slice(-2));
    if (lastTwo >= 10 && lastTwo <= 20) return "людей тусане";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "людини тусануть";
    if (lastOne === 1) return "людина тусане";
    return "людей тусане";
  };
  return (
    <h3>
      Сьогодні ввечері:
      <span
        className={
          "ms-2 badge w-100% " + (length > 0 ? "bg-primary" : "bg-danger")
        }>
        {length > 0
          ? `${length + " " + renderPhrase(length)} з тобою 💃🪩🕺`
          : "ніхто з тобою не затусить 😟"}
      </span>
    </h3>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};
export default SearchStatus;
