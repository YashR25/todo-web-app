import "./App.scss";
import { useEffect, useState } from "react";
import TodoListItem from "./components/todo-list-item/TodoListItem";
import ListHeader from "./components/list-header/ListHeader";
import Auth from "./components/authorization/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [tasks, setTasks] = useState();
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const authToken = cookie.AuthToken;

  const userEmail = cookie.Email;

  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`
    );
    const todos = await response.json();
    setTasks(todos);
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="App">
      <div className="todo-list-container">
        {!authToken && <Auth />}
        {authToken && (
          <div>
            <ListHeader getData={getData} />
            <p>Welcome back {userEmail}</p>
            {sortedTasks?.map((task) => {
              return (
                <TodoListItem key={task.id} task={task} getData={getData} />
              );
            })}
            <p>Created by yash</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
