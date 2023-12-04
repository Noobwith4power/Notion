import { Link } from "react-router-dom";

export default function NotesLayout({
  name,
  text,
  setName,
  setText,
  buttonName,
  handleButtonClick,
  read,
  error
}) {
  return (
    <div className=" mt-3 gap-5 flex flex-col items-center">
      <Link to="/home/notes">
        <button className="border-2 rounded-md text-rose-500 border-rose-500 p-2">
          BACK
        </button>
      </Link>
      <input
        readOnly={read}
        className="p-2 text-slate-500 outline-none  w-2/5 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 ease-in duration-200 focus:border-sky-500 focus:text-rose-500"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && (
        <div className="text-rose-500 ">
          {error}
        </div>
      )}

      <textarea
        readOnly={read}
        className="p-2 text-slate-500 outline-none  w-2/5 border-solid border-2 border-rose-500 rounded-lg bg-slate-800 ease-in duration-200 focus:border-sky-500 focus:text-rose-500"
        placeholder="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className=" hover:text-sky-500  hover:border-sky-500  font-semibold text-rose-500 border-solid border-2 border-rose-500 rounded-lg p-2  ease-in duration-200"
        onClick={handleButtonClick}
      >
        {buttonName}
      </button>
    </div>
  );
}
