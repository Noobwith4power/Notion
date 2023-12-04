import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Components/UserContextProvider";
import { NavLink } from "react-router-dom";

export default function HomeLayout() {
  const { user } = useContext(UserContext);
  return (
    <div className="h-4/5">
      <header className="py-4 text-sky-500">
        <div className=" mx-20 flex flex-row justify-between text-sky-500">
          <div className="text-rose-500">Hello, {user.email}</div>
          <div className="justify-evenly">
            <NavLink
              to={`/home`}
              className={({ isActive }) =>
                isActive ? "text-rose-500 pr-3" : "text-sky-500"
              }
            >
              About me
            </NavLink>
            <NavLink
              to={`/home/notes`}
              className={({ isActive }) =>
                isActive ? "text-rose-500 pr-3 " : "text-sky-500 pr-3"
              }
            >
              Notes
            </NavLink>
            <NavLink to={`/login`}>Log Out</NavLink>
          </div>
        </div>
      </header>
      <hr className="box-content border-2  border-rose-500" />
      <Outlet></Outlet>
    </div>
  );
}
