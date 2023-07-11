import React, { useState } from "react";
import "./ListHeader.scss";
import Modal from "../Modal/Modal";
import { useCookies } from "react-cookie";

function ListHeader({ getData }) {
  const [showModal, setShowModal] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const onClose = () => {
    setShowModal(false);
  };
  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="list-header">
      {showModal && (
        <Modal mode="add" setShowModal={setShowModal} getData={getData} />
      )}
      <h1>Make it a good day, start with a to-do list.</h1>
      <div className="button-container">
        <div className="button add-note" onClick={() => setShowModal(true)}>
          Add Note
        </div>
        <div className="button sign-out" onClick={signOut}>
          Signout
        </div>
      </div>
    </div>
  );
}

export default ListHeader;
