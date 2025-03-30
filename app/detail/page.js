// src/app/page.js
'use client';
import React from "react";
import Detail from "@/components/Detail";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function DetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [todos, setTodos] = React.useState([]);
  const todo = todos.filter((todo) => todo.id === id)[0];
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
      <Detail todo={todo} />
    </div>
  );
}
export default DetailPage;