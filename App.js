// import { useState } from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import TaskPage from "./pages/TaskPage";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <BrowserRouter>
//       <>
//         <nav>
//           <Link className="link" to="/products">
//             Продукты
//           </Link>
//           <Link className="link" to="/product-categories">
//             Категории продуктов
//           </Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<TaskPage />} />
//         </Routes>
//       </>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useRef, useContext } from "react";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TaskPage from "./pages/TaskPage";
import BoardsPage from "./pages/BoardsPage";
import { BoardsContext } from "./BoardsContextProvider";
import UserMenu from "./components/UserMenu";

function App() {
  const { boards } = useContext(BoardsContext);

  return (
    <div className="App">
      <header className="header">
        <h1 className="boards-page__h">Awesome Kanban Board</h1>
        <UserMenu></UserMenu>
      </header>

      <main className="main">
        <Router>
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="/tasks/:taskId" element={<TaskPage />} />
          </Routes>
        </Router>
      </main>

      <footer className="footer">
        <span className="boards-page__tasks-count">
          Active tasks: {boards[0].issues.length}
        </span>
        <span className="boards-page__tasks-count">
          Finised tasks: {boards[3].issues.length}
        </span>
      </footer>
    </div>
  );
}

export default App;
