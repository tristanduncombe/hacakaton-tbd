// pages
import CreateProject from "./components/create_project/CreateProject";
import Home from "./components/home/home";
import { FC } from "react";

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
  hideFromHeader?: boolean;
}

export const routes: Array<Route> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: Home,
  },
  {
    key: "createproject-route",
    title: "Create Project",
    path: "/createproject",
    enabled: true,
    component: CreateProject,
  },
];
