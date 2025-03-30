// src/components/TODOList.jsx
import React from "react";

function TODOList({ todos, setTodos }) {
    return (
      <>
        <ol className="todo_list">
          {todos && todos.length > 0 ? (
            todos?.map((item, index) => <Item key={index} item={item} todos={todos} setTodos={setTodos} />)
          ) : (
            <p>There a currently no tasks.</p>
          )}
        </ol>
      </>
    );
  }
  export default TODOList;

function Item({ item, todos, setTodos }) {
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef(null); 
     
    const completeTodo = () => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id
            ? { ...todo, is_completed: !todo.is_completed }
            : todo
        )
      );

      // Update localStorage after marking todo as completed
      const updatedTodos = JSON.stringify(todos);
      localStorage.setItem("todos", updatedTodos);
    };

    const handleEdit = () => {
      setEditing(true);
    };

    React.useEffect(() => {
      if (editing && inputRef.current) {
        inputRef.current.focus();
        // position the cursor at the end of the text
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
      }
    }, [editing]);

    const handleInputSubmit = (event) => {
      event.preventDefault();
      const updatedTodos = JSON.stringify(todos);
      localStorage.setItem("todos", updatedTodos);
      setEditing(false);
    };

    const handleInputBlur = () => {
      // Update localStorage after editing todo
      const updatedTodos = JSON.stringify(todos);
      localStorage.setItem("todos", updatedTodos);
      setEditing(false);
    };

    const handleInputChange = (e) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id ? { ...todo, title: e.target.value } : todo
        )
      );
    };

    const handleDelete = () => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
      // Update localStorage after deleting todo
      const updatedTodos = JSON.stringify(
        todos.filter((todo) => todo.id !== item.id)
      );
      localStorage.setItem("todos", updatedTodos);
    };

    return (
      <li id={item?.id} className="todo_item">
        {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            <div className={item.is_completed ? "completed" : "notCompleted"}>{item.is_completed ? <>&#x2713;</> : <></>}</div>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
              {item?.title}
            </p>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
              {item?.time}
            </p>
          </button>
          <div className="todo_items_right">
              <button onClick={handleEdit}>
                <span className="visually-hidden">Edit</span>
                Edit
              </button>
              <button onClick={handleDelete}>
                <span className="visually-hidden">Delete</span>
                Delete
              </button>
          </div>
        </>
      )}
      </li>
    );
  }