import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Container from "@/components/mobx/Leo/Container.tsx";
import MobxKanbanBoardDev from "@/components/mobx/kanban-board/components-dev/KanbanBoard.tsx";
import MobxKanbanBoard from "@/components/mobx/kanban-board/components/KanbanBoard.tsx";
import AppContainer from "@/components/mobx/movie-rate/AppContainer.tsx";
import MovieApp from "@/components/mobx/movie-rate/screen/MovieApp";
import SimpleState from "@/components/mobx/scratch/SimpleState.tsx";
import StateKanbanBoard from "@/components/store/StateKanbanBoard.tsx";
import { store } from "@/redux/store.ts";

import "./App.css";
import KanbanBoard from "./components/origin/KanbanBoard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StateKanbanBoard />,
  },
  {
    path: "/no-state",
    element: <KanbanBoard />,
  },
  {
    path: "/mobx",
    element: <MobxKanbanBoard />,
  },
  {
    path: "/mobx/dev",
    element: <MobxKanbanBoardDev />,
  },
  {
    path: "/roster",
    element: <Container />,
  },
  {
    path: "/movie",
    element: (
      <AppContainer>
        <MovieApp />
      </AppContainer>
    ),
  },
  {
    path: "/simple",
    element: <SimpleState />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
