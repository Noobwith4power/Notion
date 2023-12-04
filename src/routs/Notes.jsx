import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { Suspense } from "react";

export default function Notes() {
  const navigate = useNavigate();
  const { notes } = useLoaderData();

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/notes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    navigate(`/home/notes`);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=" flex flex-col gap-5  items-center">
        <h1 className="text-5xl font-semibold text-rose-500">Notes</h1>
        <Link to={`/home/makenewnote`}>
          <button className="border-2 rounded-md border-rose-500 text-rose-500 p-3">
            Create New Note
          </button>
        </Link>
        {notes.length != 0 ? (
          <div>
            {notes.map((note) => (
                <div
                  className="mt-5 p-3 text-slate-500 w-full border-2 rounded-lg border-rose-500 bg-slate-800"
                  key={note.id}
                >
                  <div className=" flex flex-row justify-between">
                     <Link to={`/home/watchnote/${note.id}`}>
                    <h1 className="text-2xl">{note.name}</h1>
                       </Link>
                    <div className="flex flex-row">
                      <button
                        onClick={() => navigate(`/home/changenote/${note.id}`)}
                      >
                        <h3>✒</h3>
                      </button>
                      <button onClick={() => handleDelete(note.id)}>
                        <h3>🪣</h3>
                      </button>
                    </div>
                  </div
                  <Link to={`/home/watchnote/${note.id}`}>
                  <div className="flex flex-row ">
                    <h2 className="text-xl pr-1">{note.text}</h2>
                    <h2 className="text-xl">
                      {new Intl.DateTimeFormat("ru-RU").format(
                        new Date(note.date)
                      )}
                    </h2>
                  </div>
                     </Link>
                </div>
              
            ))}
          </div>
        ) : (
          <div className="text-rose-500">No notes available.</div>
        )}
      </div>
    </Suspense>
  );
}
