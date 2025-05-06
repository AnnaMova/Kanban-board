const dataMock = [
  {
    title: "Backlog",
    issues: [
      // {
      //   id: "12345",
      //   name: "Sprint bugfix",
      //   description: "‘Fix all the bugs’",
      // },
    ],
  },
  {
    title: "Ready",
    issues: [
      // {
      //   id: "2",
      //   name: "Sprint bugfix",
      //   description: "test 123",
      // },
    ],
  },
  {
    title: "In Progress",
    issues: [
      // {
      //   id: "2",
      //   name: "Sprint bugfix",
      //   description: "test 123",
      // },
    ],
  },
  {
    title: "Finished",
    issues: [
      // {
      //   id: "2",
      //   name: "Sprint bugfix",
      //   description: "test 123",
      // },
    ],
  },
];

// delete localStorage.boards;
export const save = (boards) => {
  localStorage.boards = JSON.stringify(boards);
};

export const load = () => {
  if (localStorage.boards) {
    console.log(1, JSON.parse(localStorage.boards));

    return JSON.parse(localStorage.boards);
  } else {
    console.log(2);
    return dataMock;
  }
};
export const getTask = (taskId) => {
  const boards = load();

  // доска, в которой задача
  const board = boards.find((board) =>
    board.issues.find((task) => task.id == taskId)
  );

  const task = board.issues.find((task) => task.id == taskId);

  return task;
};
