import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import ErrorPage from './error-page';
import Projects from './projects';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />
    },
    {
        path: "projects",
        element: <Projects />,
        errorElement: <ErrorPage />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
