import "./TasksBlock.css";
import Task from "./Task";
import { useState } from "react";

function TasksBlock({ board, taskCreate, prevBoard, taskRemove }) {
  // console.log("board", board);

  // функция - устанавливает  значение переменной
  // const [переменная, функция] = useState(начальное значение переменной)
  const [isCreate, setIsCreate] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  // Нажали кнопку «+ Add card»
  // → появилось поле для редактирования
  // → ввели название
  // → нажали кнопку «Submit» — задача появилась в бэклоге
  // (при условии, что название введено).

  const [textArea, setTextArea] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const onAddCardClick = () => {
    setIsCreate(true);
  };
  const onSubmitClick = () => {
    // если название не введено
    // if (textArea === "") return;
    if (taskTitle === "") return;

    // добавить задачау в бэклог
    taskCreate(board, taskTitle, textArea);
    // сбрасываем значение в текстареи
    setTextArea("");
    setTaskTitle("");
    // cкрываем текстарею
    setIsCreate(false);
  };

  const onTextAreaInput = (e) => {
    // то что введено в textarea
    const value = e.target.value;

    setTextArea(value);
  };

  const onTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const prevTasks = () =>
    prevBoard ? (
      <>
        {!isRemoveOpen && (
          <button
            onClick={() => setIsRemoveOpen(true)}
            className="tasks-block__btn"
          >
            + Add card
          </button>
        )}
        {isRemoveOpen && (
          <select
            onInput={(e) => {
              // при выборе - переместить задачу из предыдущей доски в эту
              taskRemove({
                from: prevBoard,
                to: board,
                task: prevBoard.issues.find(
                  (issue) => issue.id == e.target.value
                ),
              });

              // cкрываем выбор задачи
              setIsRemoveOpen(false);
            }}
          >
            <option></option>
            {prevBoard.issues.map((issue, idx) => (
              <option key={issue.id} value={issue.id}>
                {issue.name}
              </option>
            ))}
          </select>
        )}
      </>
    ) : (
      ""
    );

  const tasks = () =>
    board
      ? board.issues.map((issue, idx) => <Task key={idx} task={issue}></Task>)
      : "";

  // cоздание задачи в backlog
  const createTaskButton = () =>
    taskCreate && (
      <>
        {!isCreate && (
          <button onClick={onAddCardClick} className="tasks-block__btn">
            + Add card
          </button>
        )}
        {isCreate && (
          <>
            <input onInput={onTitleChange} className="tasks-block__input" />
            <textarea
              onInput={onTextAreaInput}
              className="tasks-block__textarea"
            ></textarea>
            <div>
              <button onClick={onSubmitClick} className="tasks-block__btn">
                Submit
              </button>
            </div>
          </>
        )}
      </>
    );

  console.log(board);

  return (
    <div className="tasks-block">
      <h1 className="tasks-block__title">{board?.title}</h1>
      <div className="tasks-block__tasks">{tasks()}</div>

      {/* <Task text="test 2"></Task> */}
      {/* <Task text="test 3"></Task> */}

      {createTaskButton()}

      {prevTasks()}
    </div>
  );
}

export default TasksBlock;
