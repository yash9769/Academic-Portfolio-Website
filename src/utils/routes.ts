import { createBrowserRouter } from "react-router";
import { Root } from "../components/Root";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Publications } from "../pages/Publications";
import { Patents } from "../pages/Patents";
import { Research } from "../pages/Research";
import { Teaching } from "../pages/Teaching";
import { Team } from "../pages/Team";
import { Awards } from "../pages/Awards";
import { Contact } from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "publications", Component: Publications },
      { path: "patents", Component: Patents },
      { path: "research", Component: Research },
      { path: "teaching", Component: Teaching },
      { path: "team", Component: Team },
      { path: "awards", Component: Awards },
      { path: "contact", Component: Contact },
    ],
  },
]);
