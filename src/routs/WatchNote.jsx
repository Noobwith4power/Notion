import { useLoaderData } from "react-router-dom";
import NotesLayout from "./NotesLayout";

export default function WatchNote() {
  const { note } = useLoaderData();

  return (
    <NotesLayout
      buttonName={"nothing to change"}
      name={note.name}
      text={note.text}
      read={true}
    />
  );
}
