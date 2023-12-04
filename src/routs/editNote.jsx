import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import NotesLayout from "./NotesLayout";

export default function EditNote() {
  const { note } = useLoaderData();
  const [name, setName] = useState(note.name);
  const [text, setText] = useState(note.text);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEdit = async () => {
    if (/^\s*$/.test(name)) {
      setError("Название не может быть пустым");
      return;
    }
    const updateNote = {
      id: note.id,
      userId: note.userId,
      name,
      text,
      date: note.date,
    };
    await fetch(`http://localhost:5001/notes/${note?.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    await fetch(`http://localhost:5001/notes`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateNote),
    });
    navigate("/home/notes");
  };

  return (
    <NotesLayout
      buttonName={"edit"}
      handleButtonClick={handleEdit}
      name={name}
      text={text}
      setText={setText}
      setName={setName}
      read={false}
      error={error}
    />
  );
}
