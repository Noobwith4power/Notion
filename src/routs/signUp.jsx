import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { User } from "../Util/validation";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../Components/UserContextProvider";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    try {
      const validUser = User.parse({ email, password });

      if (repeatPassword != password) throw new Error("Пароли не совпадают");

      const user = {
        id: uuidv4(),
        email,
        password,
        signedAt: Date.now(),
      };

      fetch(`http://localhost:5001/users`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      userContext.onChange(user);
      navigate("/home");
    } catch (err) {
      if (err instanceof z.ZodError) setErrors(err.format());
      else setErrors({ passError: err.message });
    }
  };
  return (
    <div className=" py-8  h-4/5 flex flex-col place-items-center ">
      <h1 className="text-6xl font-semibold text-rose-500">Sign Up</h1>
      <div className=" my-3 mx-8 w-4/5 flex flex-col  place-items-center ">
        <input
          className=" p-2 ease-in duration-200 focus:w-4/5 text-slate-500 outline-none my-3 w-2/5 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 focus:outline-none focus:border-sky-500 focus:text-rose-500"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors?.email && (
          <div className="text-red-600">{errors?.email?._errors}</div>
        )}
        <input
          className=" p-2 ease-in duration-200 focus:w-4/5 my-3 w-2/5 text-slate-500 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 focus:outline-none focus:border-sky-500 focus:text-rose-500"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors?.password && (
          <div className="text-red-600">{errors?.password?._errors[0]}</div>
        )}
        <input
          className="p-2 ease-in duration-200 focus:w-4/5 my-3 w-2/5  text-slate-500 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 focus:outline-none focus:border-sky-500 focus:text-rose-500"
          type="password"
          placeholder="repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {errors?.passError && (
          <div className="text-red-600">{errors?.passError}</div>
        )}
        <div>
          <button
            onClick={handleSignUp}
            className="overflow-y-hidden overflow-x-hidden font-semibold text-rose-500 border-solid border-2 border-rose-500 rounded-lg p-2 m-5 ease-in duration-200 hover:text-sky-500  hover:border-sky-500 hover:border-4 hover:p-4  hover:font-black "
          >
            Sign Up
          </button>
          <NavLink
            to="/login"
            className="overflow-y-hidden overflow-x-hidden font-semibold text-rose-500 border-solid border-2 border-rose-500 rounded-lg p-3 m-6 ease-in duration-200 hover:border-4 hover:p-5 hover:font-black  hover:text-sky-500  hover:border-sky-500"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}
