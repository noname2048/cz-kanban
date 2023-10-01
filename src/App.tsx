import Container from "@/components/mobx/Leo/Container.tsx";
import StateKanbanBoard from "@/components/store/StateKanbanBoard.tsx";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import KanbanBoard from "./components/origin/KanbanBoard.tsx";
import MobxKanbanBoard from "./components/mobx/KanbanBoard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <KanbanBoard />,
  },
  {
    path: "/state",
    element: <StateKanbanBoard />,
  },
  {
    path: "/mobx",
    element: <MobxKanbanBoard />,
  },
  {
    path: "/roster",
    element: <Container />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
