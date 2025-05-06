import { Link } from "react-router-dom";
import "./Task.css";

function Task({ task }) {
  return (
    <div className="task">
      {/* <h3> */}
      <Link to={`/tasks/${task.id}`} className="task__name">
        {task.name}
      </Link>
      {/* </h3> */}
      {/* description: {task.description} */}
    </div>
  );
}

export default Task;
