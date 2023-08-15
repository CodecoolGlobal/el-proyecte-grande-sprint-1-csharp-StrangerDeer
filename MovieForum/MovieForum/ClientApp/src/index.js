import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import AddNewMovie from "./components/AddNewMovie";
import MovieDetails from "./components/MovieDetails";
import UserProfile from "./components/UserProfile";

import './custom.css'
import EditMovieDetails from "./components/EditMovieDetails";




const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


const router = createBrowserRouter([{
    path: "/",
    element: <NavMenu/>,
    children:[
        {
            path:"/",
            element: <Home />
        },
        {
            path:"/add-new-movie",
            element: <AddNewMovie />
        },
        {
            path:"/movie/:id",
            element: <MovieDetails/>
        },
        {
            path:"/user/:username",
            element: <UserProfile/>
        }
    ],
}
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
