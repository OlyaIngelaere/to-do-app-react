// src/components/TODOList.jsx
import React from "react";
import Link from 'next/link'

function TODOList({ todos, setTodos }) {
    const [completedFilter, setCompletedFilter] = React.useState(null);
    const filteredTodos = todos.filter((todo) => completedFilter === null || todo.is_completed === completedFilter);
    const toggleCompletedFilter = () => {
      setCompletedFilter(!completedFilter);
    };
    const removeFilters = () => {
      setCompletedFilter(null);
    };
    return (
      <div className="form">
        <div><b>Filter (completed/uncompleted): </b><button className={completedFilter ? "completed" : "notCompleted"} onClick={toggleCompletedFilter}>{completedFilter ? <>&#x2713;</> : <></>}</button></div>
        <button className="button" onClick={removeFilters}>Show all</button>
        <ol className="todo_list">
          {filteredTodos && filteredTodos.length > 0 ? (
            filteredTodos?.map((item, index) => <Item key={index} item={item} todos={todos} setTodos={setTodos} />)
          ) : (
            <p>There a currently no tasks.</p>
          )}
        </ol>
      </div>
    );
  }
  export default TODOList;

function Item({ item, todos, setTodos }) {
    const completeTodo = () => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id
            ? { ...todo, is_completed: !todo.is_completed }
            : todo
        )
      );

      // Update localStorage after marking todo as completed
      const updatedTodos = JSON.stringify(todos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      ));
      localStorage.setItem("todos", updatedTodos);
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
              <Link href={{
                  pathname: '/detail',
                  query: { id: item.id }
                }}>
                <button>
                  <span className="visually-hidden">Detail</span>
                  Detail
                </button>
              </Link>
              <button onClick={handleDelete}>
                <span className="visually-hidden">Delete</span>
                Delete
              </button>
          </div>
      </li>
    );
  }