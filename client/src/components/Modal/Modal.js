import React, { useState } from "react";
import "./Modal.scss";
import { useCookies } from "react-cookie";

function Modal({ mode, setShowModal, task, getData }) {
  const editMode = mode == "edit" ? true : false;
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [data, setData] = useState({
    user_email: editMode ? task?.user_email : cookie.Email,
    title: editMode ? task?.title : "",
    progress: editMode ? task?.progress : "",
    date: editMode ? new Date(task?.date) : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Hurrah! Worked");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status == 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <div
            onClick={() => setShowModal(false)}
            style={{ cursor: "pointer" }}
          >
            X
          </div>
        </div>
        <form action="">
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            type="text"
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            id="range"
            type="range"
            required
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            type="submit"
            className={`button ${mode}`}
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;
