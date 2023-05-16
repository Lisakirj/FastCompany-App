import React, { useEffect } from "react";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/paginations";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { useStateIfMounted } from "use-state-if-mounted";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfessionsList,
  getProfessionsLoading,
} from "../../../store/profession";
import { getCurrentUser, getUsers } from "../../../store/users";
import { updateUser } from "../../../store/users";
import { getCurrentUserData } from "../../../store/users";

const UsersListPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers());
  const currentUserId = useSelector(getCurrentUser());
  const currentUser = useSelector(getCurrentUserData());
  const profLoading = useSelector(getProfessionsLoading());
  const professions = useSelector(getProfessionsList());
  const [searchUser, setSearchUser] = useStateIfMounted("");
  const [selectedProf, setSelectedProf] = useStateIfMounted("");
  const [currentPage, setCurrentPage] = useStateIfMounted(1);
  const [sortedBy, setSortBy] = useStateIfMounted({
    path: "name",
    order: "asc",
  });
  const pageSize = 6;

  const handleToggleAddBookMark = (id) => {
    const bookmarkedUserId = users.find((u) => u._id === id)._id;
    const newUsers = { ...currentUser };
    if (!currentUser.bookmarks) newUsers.bookmarks = [];
    newUsers.bookmarks = [...newUsers.bookmarks, bookmarkedUserId];
    dispatch(updateUser(newUsers));
  };
  const handleToggleRemoveBookMark = (id) => {
    const NewbookmarkedUserIds = currentUser.bookmarks
      ? currentUser.bookmarks.filter((b) => b !== id)
      : [];
    const newUsers = { ...currentUser };
    newUsers.bookmarks = NewbookmarkedUserIds;
    dispatch(updateUser(newUsers));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchUser]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchUser("");
  };
  const handleChange = ({ target }) => {
    setSelectedProf("");
    setSearchUser(target.value);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users.length !== 0) {
    const filterUsers = (users) => {
      const filteredUsers = searchUser
        ? users.filter((user) =>
            user.name.toUpperCase().includes(searchUser.toUpperCase())
          )
        : selectedProf
        ? users.filter((user) => user.profession === selectedProf._id)
        : users;
      return filteredUsers.filter((u) => u._id !== currentUserId);
    };

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(
      filteredUsers,
      [sortedBy.path],
      [sortedBy.order]
    );
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf(undefined);
    };

    return (
      <div className="d-flex">
        {professions && !profLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button
              className="btn btn-secondary m-2"
              onClick={() => clearFilter()}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <input
            name="search"
            type="search"
            placeholder="Search..."
            value={searchUser}
            onChange={handleChange}
            className="form-control me-2 bg-light"
          />
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortedBy}
              onToggleAddBookMark={handleToggleAddBookMark}
              onToggleRemoveBookMark={handleToggleRemoveBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
  return "Loading...";
};
export default UsersListPage;
