import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddChocolate from './Components/Form/AddChocolate.jsx';
import UpdateChoco from './Components/Form/UpdateChoco.jsx';
import Main from './Components/Layout/Main.jsx';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <App></App>,
        loader: ()=>fetch(`http://localhost:5000/data`)
      },
      {
        path: 'newadd',
        element: <AddChocolate></AddChocolate>,
      },
    ]
  }, 
  {
    path: 'update/:id',
    element: <UpdateChoco></UpdateChoco>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
