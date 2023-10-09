import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginContext} from "./contexts/LoginContext";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import AddNewMovie from "./components/AddNewMovie";
import MovieDetails from "./components/MovieDetails";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import React, {useState} from "react";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    
    const router = createBrowserRouter([{
        path: "/",
        element: <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
            <NavMenu userObj={userObj}/>
        </LoginContext.Provider>,
        children:[
            {
                path:"/",
                element: <Home setUserObj={setUserObj}/>
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
            },
            {
                path:"/login",
                element: <LoginContext.Provider value={{setLoggedIn}}><Login/></LoginContext.Provider>
            }
        ],
    }
    ]);
    
    return <RouterProvider router={router}/>
}

export default App;
