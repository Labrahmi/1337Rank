import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login';
import Callback from './pages/Callback';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/:campus_name/:begin_at",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: '/callback',
    element: <Callback />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
