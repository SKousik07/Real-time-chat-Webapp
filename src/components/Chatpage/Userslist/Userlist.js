import React, { useState, useEffect } from "react";
import Listitem from "../Listitem/Listitem";
import "./userlist.css";
import SearchIcon from "@material-ui/icons/Search";
import { useStateValue } from "../../../context";

function Userlist() {
  const [{ usersList, id }, dispatch] = useStateValue();
  const [searchInput, setSearchInput] = useState("");
  const [uList, setuList] = useState([]);
  const selectUser = (sid, sname, sphotoUrl, sabout) => {
    let cid = "";
    if (id > sid) {
      cid = sid + "-" + id;
    } else {
      cid = id + "-" + sid;
    }
    dispatch({
      type: "SET_COMBINED_ID",
      combinedId: cid,
      selectedUser: {
        id: sid,
        name: sname,
        photoUrl: sphotoUrl,
        about: sabout,
      },
    });
  };

  //to set uList after fetching UsersList we cant set at the top because at that time usersList is empty
  useEffect(() => {
    setuList([...usersList]);
  }, [usersList]);

  useEffect(() => {
    setuList(
      searchInput.length === 0
        ? usersList
        : usersList.filter(
            (user) =>
              user.name.trim().toLowerCase().slice(0, searchInput.length) ===
              searchInput.trim()
          )
    );
  }, [searchInput]);

  return (
    <div className="list_contain">
      <div className="list_header">
        <SearchIcon className="search_icon" />
        <input
          type="text"
          className="search_input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="list_panel">
        {uList.map((user) => (
          <Listitem
            key={user.id}
            name={user.name}
            about={user.about}
            photoUrl={user.photoUrl}
            selectUser={selectUser}
            id={user.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Userlist;
