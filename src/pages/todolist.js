const TodoList = () => {
  return (
    <div>
      <h2>todolist</h2>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 2</span>
        </label>
      </li>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
    </div>
  );
};
export default TodoList;
