import "../App.css";
import { useState } from "react";
const TodoItems = ({
  todo,
  isCompleted,
  id,
  updateTodo,
  deleteTodo,
  setData,
}) => {
  // 수정 중인지? 수정중인지 아닌지 값을 보관
  const [isEdit, setIsEdit] = useState(false);
  // textarea의 input을 핸들링 (수정 상태일 떄)  // 초기값을 기본 값으로 세팅
  const [localContent, setLocalContent] = useState(todo);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleQuitEdit = () => {
    // 수정 상태에서 나간다.
    setIsEdit(false);
    setLocalContent(todo);
  };

  const handleEdit = () => {
    updateTodo(id, localContent, isCompleted);
    toggleIsEdit();
  };

  const eventhandler = (e) => {
    setLocalContent(e.target.value);
    if (e.target.name === "check") {
      setData({
        isCompleted: true,
      });
      updateTodo(id, localContent, isCompleted);
    }
  };
  return (
    <div className="TodoItems">
      <li>
        <label>
          <input
            name="check"
            type="checkbox"
            value={isCompleted}
            onChange={eventhandler}
          />
          {isEdit ? (
            <>
              <input
                id="newtodo"
                value={localContent}
                onChange={eventhandler}
              />
            </>
          ) : (
            <span>{todo}</span>
          )}
        </label>
        {isEdit ? (
          <>
            <button onClick={handleEdit} data-testid="submit-button">
              제출
            </button>
            <button onClick={handleQuitEdit} data-testid="cancel-button">
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" onClick={handleEdit}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => deleteTodo(id)}>
              삭제
            </button>
          </>
        )}
      </li>
    </div>
  );
};
export default TodoItems;
