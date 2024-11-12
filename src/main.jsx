import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import ErrorPage from './error-page';
import Projects from './projects';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import LoginPage from './Components/Login/sign-in';
import SignUpPage from './Components/Login/sign-up';

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
    },
    {
        path: "login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "signUp",
        element: <SignUpPage />,
        errorElement: <ErrorPage />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
