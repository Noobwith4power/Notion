import { useContext } from "react";
import { UserContext } from "../Components/UserContextProvider";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);
  const currentDate = new Date(user.signedAt);
  const formattedDate = new Intl.DateTimeFormat("ru-RU").format(currentDate);
  return (
    <div className="h-4/5">
      <h1 className="py-4 text-sky-300 flex place-content-center font-bold text-8xl">
        About me
      </h1>
      <div className=" flex flex-col place-items-center text-sky-500">
        <h3 className="text-3xl"> Email: {user.email}</h3>
        <h3 className="text-3xl"> Date sign up: {formattedDate}</h3>
        <NavLink to={`/home/makenewnote`}>
          <button className="my-3 text-2xl border-2 border-sky-500 p-5 rounded-lg cursor-pointer hover:">
            Make New Note
          </button>
        </NavLink>
      </div>
    </div>
  );
}
