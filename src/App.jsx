import { createContext, useContext, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./routs/Login";
import Home from "./routs/Home";
import UserContextProvider from "./Components/UserContextProvider";
import RequireAuth from "./Components/RequireAuth";
import Layout from "./routs/Layout";
import SignUp from "./routs/signUp";
import Notes from "./routs/Notes";
import { editNoteLoader, notesLoader } from "./Util/notesLoader";
import CreateNote from "./routs/createNote";
import EditNote from "./routs/editNote";
import HomeLayout from "./routs/HomeLayout";
import WatchNote from "./routs/WatchNote";
import Redirect from "./routs/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: (
          <RequireAuth>
            {" "}
            <HomeLayout />{" "}
          </RequireAuth>
        ),
        children: [
          {
            path: "/home",
            element: <Navigate to="homePage" replace />,
          },
          {
            path: "homePage",
            element: <Home />,
          },
          {
            path: "/home/notes",
            element: <Notes />,
            loader: notesLoader,
          },

          {
            path: "makenewnote",
            element: <CreateNote />,
          },
          {
            path: "watchnote/:id",
            element: <WatchNote />,
            loader: editNoteLoader,
          },
          {
            path: "changenote/:id",
            element: <EditNote />,
            loader: editNoteLoader,
          },
        ],
      },
      {
        path: "/",
        element: <Navigate to="signUp" />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path:'*',
        element:<Redirect />
      }
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
