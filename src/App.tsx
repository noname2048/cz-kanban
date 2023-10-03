import Container from "@/components/mobx/Leo/Container.tsx";
import AppContainer from "@/components/mobx/movie-rate/AppContainer.tsx";
import SimpleState from "@/components/mobx/scratch/SimpleState.tsx";
import StateKanbanBoard from "@/components/store/StateKanbanBoard.tsx";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import KanbanBoard from "./components/origin/KanbanBoard.tsx";
import MobxKanbanBoard from "@/components/mobx/kanban-board/components-dev/KanbanBoard.tsx";
import MovieApp from "@/components/mobx/movie-rate/screen/MovieApp";

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
