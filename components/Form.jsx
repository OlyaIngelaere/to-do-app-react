

function Form({ todos, setTodos }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const text = event.target.text.value;
      const time = event.target.time.value;
      const newTodo = {
        title: title, 
        text: text, 
        time: time, 
        id: self.crypto.randomUUID(), 
        is_completed: false
      };
      // Update todo state
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      // Store updated todo list in local storage
      const updatedTodoList = JSON.stringify([...todos, newTodo]);
      localStorage.setItem("todos", updatedTodoList);
      event.target.reset();
    };
    return (
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="todo">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Write your next task"
          />
        </label>
        <label htmlFor="todo">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Description of the task"
          />
        </label>
        <label htmlFor="todo">
          <input
            type="time"
            name="time"
            id="time"
          />
        </label>
        <button>
            <span className="visually-hidden">Submit</span>
            +
        </button>
      </form>
    );
  }
  export default Form;