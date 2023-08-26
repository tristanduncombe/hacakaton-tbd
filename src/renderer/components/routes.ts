// pages
import { FC } from "react";
import CreateProject from "./Pages/Create Project/CreateProject";
import { HomeProps } from "./Pages/Home/Home";
import Home from "./Pages/Home/Home";
import Import from "./Pages/Import/Import";
import TeamSelection from "./Pages/Team Selection/TeamSelection";

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
    path: "/createproject/import",
    enabled: true,
    component: Import,
  },
  {
    key: "teamselection-route",
    title: "Team Selection",
    path: "/createproject/import/teamselection",
    enabled: true,
    component: TeamSelection,
  },
];
