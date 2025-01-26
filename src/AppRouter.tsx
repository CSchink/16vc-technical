import { BrowserRouter, Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Layout from "./components/common/layout";
import { ReactNode } from "react";

const TaskView = loadable(() => import("./components/tasks/task-view"));

type RouteMapper = {
  path: string;
  component: ReactNode;
  key: string;
};

export default function Router() {
  const allowedRoutes: RouteMapper[] = [
    {
      path: "/",
      component: <TaskView />,
      key: "/",
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {allowedRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              element={<Layout>{route.component}</Layout>}
              key={route.key}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
