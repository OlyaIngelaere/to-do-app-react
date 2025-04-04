// src/app/page.js
'use client';
import React from "react";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";
import Link from 'next/link'

function Home() {
  const [todos, setTodos] = React.useState([]);

  // Retrieve data from localStorage when component mounts
  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const todos_completed = todos.filter(
    (todo) => todo.is_completed === true
  ).length;
  const total_todos = todos.length;
  
  return (
    <div className="wrapper">
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Link href={{
        pathname: '/form'
      }}>
        <button className="button">
            <span className="visually-hidden">Submit</span>
            +
        </button>
      </Link>
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default Home;