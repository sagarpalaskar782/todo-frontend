import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LogIn } from './component/LogIn';
import { SignUp } from './component/SignUp';
import { Home, homeLoader } from './component/Home';
import { UpdateTask } from './component/UpdateTask';
import { AddTask } from './component/AddTask';
import { Layout } from './component/LayOut';
import ErrorBoundary from './component/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  { element: <LogIn />, path: "/login" },
  { element: <SignUp />, path: "/signUp" },
  {
    element: <Layout />,
    children: [
      { element: <Home />, path: "/", loader: homeLoader },
      { element: <Home />, path: "/home", loader: homeLoader },
      { element: <UpdateTask />, path: "/updateTask" },
      { element: <AddTask />, path: "/addTask" }
    ],
  },

])
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
