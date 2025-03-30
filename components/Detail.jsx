
function Detail({ todo }) {
    return (
      <div className="form">
        <p><b>Title:</b> {todo?.title}</p>
        <p><b>Description:</b> {todo?.text}</p>
        <p><b>Time:</b> {todo?.time}</p>
        <div className={todo?.is_completed ? "completed" : "notCompleted"}>{todo?.is_completed ? <>&#x2713;</> : <></>}</div>
      </div>
    );
  }
  export default Detail;