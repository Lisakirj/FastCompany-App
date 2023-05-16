const isOutDated = (date) => {
  if (Date.now() - date > 10 * 60 * 1000) {
    //10 хв
    return true;
  } else return false;
};

export default isOutDated;
