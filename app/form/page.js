// src/app/page.js
'use client';
import React from "react";
import Form from "@/components/Form";
import Link from 'next/link'

function NewTask() {
  const [todos, setTodos] = React.useState([]);

  // Retrieve data from localStorage when component mounts
  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  
  return (
    <div className="wrapper">
      <Link href={{
        pathname: '/'
      }}>
        <button className="button">
            Overview
        </button>
      </Link>
      <Form todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default NewTask;