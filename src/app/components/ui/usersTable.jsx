import React from "react";
import PropTypes from "prop-types";

import QualitiesList from "./qualities";
import Bookmark from "../common/bookmark";

import Table from "../common/table";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Professions from "./profession";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleAddBookMark,
  onToggleRemoveBookMark,
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => (
        <Link style={{ textDecoration: "none" }} to={`/users/${user._id}`}>
          {user.name}
        </Link>
      ),
    },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: {
      name: "Профессия",
      component: (user) => <Professions id={user.profession} />,
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    sex: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          user={user}
          onHandleAdd={onToggleAddBookMark}
          onHandleRemove={onToggleRemoveBookMark}
        />
      ),
    },
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleAddBookMark: PropTypes.func.isRequired,
  onToggleRemoveBookMark: PropTypes.func.isRequired,
};
export default UsersTable;
