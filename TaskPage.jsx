// import "./Task.css";

import { useNavigate, useParams } from "react-router-dom";
import { getTask, load, save } from "../db";
import { useEffect, useState } from "react";
import "./TaskPage.css";

function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [task, setTask] = useState(getTask(taskId));

  const onCloseClick = () => navigate("/");

  const onTaskUpdate = () => {
    console.log("onTaskUpdate");

    const boards = load();

    // доска, в которой задача
    const board = boards.find((board) =>
      board.issues.find((task) => task.id == taskId)
    );

    // заменяем задачу на новую
    board.issues = board.issues.map((boardTask) => {
      if (boardTask.id == task.id) {
        return task;
      } else {
        return boardTask;
      }
    });

    save(boards);
  };

  useEffect(() => {
    onTaskUpdate();
  }, [task]);

  const taskDescription = () => (
    <>
      <p>{task.description || "This task has no description"}</p>
      <button className="btn" onClick={() => setEditMode(true)}>
        Редактировать
      </button>
    </>
  );

  const taskEdit = () => (
    <>
      <textarea
        value={task.description}
        onInput={(e) => setTask({ ...task, description: e.target.value })}
      ></textarea>
      <div>
        <button className="btn" onClick={() => setEditMode(false)}>
          Ok
        </button>
      </div>
    </>
  );

  return (
    <div className="task-page">
      <div className="task-page__head">
        <h3 className="task-page__header">Task name: {task.name}</h3>
        <div className="task-page__cross" onClick={onCloseClick}></div>
      </div>

      {!editMode && taskDescription()}
      {editMode && taskEdit()}
    </div>
  );
}

export default TaskPage;
