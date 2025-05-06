import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import "./BoardsPage.css";
// import TasksBlock from "./TasksBlock";
import TasksBlock from "../components/TasksBlock";
import { BoardsContext } from "../BoardsContextProvider";
import { save, load } from "../db";

function BoardsPage() {
  const { boards, setBoards } = useContext(BoardsContext);

  const onTaskCreate = (board, taskTitle, textArea) => {
    board.issues.push({
      id: Date.now(),
      name: taskTitle,
      description: textArea,
    });
    // console.log("onn task create", board, boards);

    setBoards([...boards]);

    save(boards);
  };

  // переместить задачу task из доски from в доску to
  const onTaskRemove = ({ from, to, task }) => {
    console.log("from, to, task", from, to, task);
    // удалить задачу из from
    const taskIdx = from.issues.indexOf(task);
    const issues = from.issues.splice(taskIdx, 1);
    // вставить ее в to
    to.issues.push(...issues);
    // сохранить доски
    setBoards([...boards]);
    save(boards);
  };

  return (
    <div className="boards-page">
      <TasksBlock board={boards[0]} taskCreate={onTaskCreate} />
      <TasksBlock
        board={boards[1]}
        prevBoard={boards[0]}
        taskRemove={onTaskRemove}
      />
      <TasksBlock
        board={boards[2]}
        prevBoard={boards[1]}
        taskRemove={onTaskRemove}
      />
      <TasksBlock
        board={boards[3]}
        prevBoard={boards[2]}
        taskRemove={onTaskRemove}
      />
    </div>
  );
}

export default BoardsPage;
