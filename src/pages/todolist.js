import { useEffect, useState } from "react";
import axios from "axios";
import TodoItems from "./TodoItems";
import "../App.css";

const TodoList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);

  const [data, setData] = useState({
    id: 0,
    todo: "",
    isCompleted: false,
  });
  const handleChange = (e) => {
    setData({
      [e.target.name]: e.target.value,
    });
  };

  // 할 일 추가
  const addWork = () => {
    axios(
      {
        method: "post",
        url: "https://pre-onboarding-selection-task.shop/todos",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: JSON.stringify({
          todo: data.work,
        }),
      },
      { withCredentials: true }
    ).then((res) => {
      getTodos();
      console.log(res.data);
    });
  };

  // 할 일 조회
  const getTodos = async () => {
    await axios(
      {
        method: "get",
        url: "https://pre-onboarding-selection-task.shop/todos",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
      { withCredentials: true }
    ).then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  };

  // 할 일 수정
  const updateTodo = async (id, todo, isCompleted) => {
    await axios(
      {
        method: "PUT",
        url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: JSON.stringify({
          todo: todo,
          isCompleted: isCompleted,
        }),
      },
      { withCredentials: true }
    ).then((res) => {
      console.log(res.data);
      getTodos();
    });
  };

  // 할 일 삭제
  const deleteTodo = async (id) => {
    await axios(
      {
        method: "delete",
        url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
      { withCredentials: true }
    ).then((res) => {
      console.log(res.data);
      getTodos();
    });
  };

  // const deleteTodo = (targetId) => {
  //   const newTodoList = list.filter((it) => it.id !== targetId);
  //   setList(newTodoList);
  // };
  return (
    <div className="TodoList">
      <input name="work" value={data.work} onChange={handleChange} />
      <button onClick={addWork}>할 일 추가</button>
      <div>
        {list.map((it) => (
          <TodoItems
            key={it.id}
            {...it}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};
export default TodoList;
