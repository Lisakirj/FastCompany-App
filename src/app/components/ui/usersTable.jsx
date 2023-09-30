import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Table from "../common/table";
import QualitiesList from "./qualities";
import Profession from "./profession";
import Bookmark from "../common/bookmark";

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
      name: "Ім'я",
      component: (user) => (
        <Link style={{ textDecoration: "none" }} to={`/users/${user._id}`}>
          {user.name}
        </Link>
      ),
    },
    qualities: {
      name: "Якості",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: {
      name: "Професія",
      component: (user) => <Profession id={user.profession} />,
    },

    completedMeetings: { path: "completedMeetings", name: "Зустрівся, разів" },
    rate: { path: "rate", name: "Оцінка" },
    bookmark: {
      path: "bookmark",
      name: "Обране",
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
