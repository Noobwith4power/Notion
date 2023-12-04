import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NotesLayout from "./NotesLayout";

export default function CreateNote() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
const [error, setError] = useState(null)
  const handleCreatingNote = async () => {
    if (/^\s*$/.test(name)) {
      setError("Название не может быть пустым или состоять из пробелов");
    }

    const note = {
      id: uuidv4(),
      userId: localStorage.getItem("userId"),
      name: name.trim(),
      text,
      date: Date.now(),
    };

    await fetch(`http://localhost:5001/notes`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  return (
    <NotesLayout
      buttonName={"create"}
      handleButtonClick={handleCreatingNote}
      name={name}
      text={text}
      setText={setText}
      setName={setName}
      read={false}
      error={error}
    />
  );
}
