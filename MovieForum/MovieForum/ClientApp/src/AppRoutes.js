import { AddNewMovie } from "./components/AddNewMovie";
import { Home } from "./components/Home";
import { MovieDetails } from "./components/MovieDetails";
import {NavMenu} from "./components/NavMenu";

const appRoutes = [{
  path: "/",
  element: <NavMenu/>,
  children:[
    {
      path:"/",
      element: <Home />
    },
  ],
}
];

export default appRoutes;
