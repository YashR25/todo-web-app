import React, { useState } from "react";
import "./TodoListItem.scss";
import TickIcon from "../TickIcon";
import Modal from "../Modal/Modal";

function TodoListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${task?.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status == 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="TodoListItem">
      <div className="title-container">
        <TickIcon />
        <h4>{task?.title}</h4>
      </div>

      <div className="button-container">
        <div className="button add" onClick={() => setShowModal(true)}>
          Edit
        </div>
        <div className="button edit" onClick={deleteData}>
          Delete
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          mode={"edit"}
          task={task}
          getData={getData}
        />
      )}
    </div>
  );
}

export default TodoListItem;
