export const notesLoader = async () => {
  const response = await fetch(`http://localhost:5001/notes`);
  const data = await response.json();

  const userId = localStorage.getItem("userId");
  const notes = data.filter((note) => note.userId === userId);

  return { notes };
};

export const editNoteLoader = async ({ params: { id } }) => {
  const response = await fetch(`http://localhost:5001/notes/${id}`);

  const note = await response.json();
  return { note };
};
