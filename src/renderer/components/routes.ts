// pages
import CreateProject from "./Pages/create_project/CreateProject";
import Home from "./Pages/home/home";
import { HomeProps } from "./Pages/home/home";
import { FC } from "react";
import Import from "./Common/import/import";

export interface Route<T = Record<string, unknown>> {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<T>;
  hideFromHeader?: boolean;
}

export const routes: Array<Route<HomeProps>> = [
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
  {
    key: "import-route",
    title: "Import",
    path: "/import",
    enabled: true,
    component: Import,
  },
];
