import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BackHistoryButton = () => {
  const history = useHistory();

  return (
    <button className="btn btn-primary mt-2" onClick={() => history.goBack()}>
      <i className="bi bi-caret-left">Back</i>
    </button>
  );
};

export default BackHistoryButton;
