import { AddNewMovie } from "./components/AddNewMovie";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { MovieDetails } from "./components/MovieDetails";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/add-new-movie',
    element: <AddNewMovie />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: ':id',
    element: <MovieDetails />
  }
];

export default AppRoutes;
