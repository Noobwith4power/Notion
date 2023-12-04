import React, { useContext, useState } from "react";
import { z } from "zod";
import { User } from "../Util/validation";
import { UserContext } from "../Components/UserContextProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validError, setValidError] = useState(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogin() {
    try {
      const user = User.parse({
        email,
        password,
      });
      setValidError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidError(err.format());
      }
    }
    const query = new URLSearchParams({
      email,
      password,
    }).toString();
    fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          console.log(user);
          userContext.onChange(user);
          navigate("/home");
        } else {
          setError("User not found");
        }
      });
  }

  return (
    <div className=" py-8 h-4/5  mx-auto place-items-center  flex flex-col gap-5 w-4/5">
      <h1 className=" text-6xl font-semibold text-rose-500">Login</h1>
      <input
        className=" p-2 text-slate-500 outline-none my-3 w-2/5 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 ease-in duration-200 focus:outline-none focus:border-sky-500 focus:text-rose-500 focus:w-4/5"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {validError?.email && (
        <div className="text-red-500">
          {validError?.email?._errors.join(",")}
        </div>
      )}
      <input
        className=" p-2 text-slate-500 outline-none  w-2/5 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 ease-in duration-200 focus:w-4/5 focus:outline-none focus:border-sky-500 focus:text-rose-500"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {validError?.password && (
        <div className="text-red-500">
          {validError?.password?._errors.join(",")}
        </div>
      )}
      <button
        className="w-2/5 hover:text-sky-500  hover:border-sky-500 overflow-y-hidden overflow-x-hidden font-semibold text-rose-500 border-solid border-2 border-rose-500 rounded-lg p-2 m-5 ease-in duration-200 hover:border-4 hover:p-4  hover:font-black "
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}
