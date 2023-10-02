import React from 'react';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import {FormCv, Resume} from './components';

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Resume/>
        },
        {
            path: "/update",
            element: <FormCv/>
        }
    ]);
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
