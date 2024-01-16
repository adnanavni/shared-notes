import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNotesContext } from "../hooks/useNotesContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;

export default function NoteForm() {
  const { dispatch } = useNotesContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    } else {
      try {
        await axios
          .post(backendUrl + "/api/notes", {
            title: title,
            content: content,
          })
          .then((res) => {
            setTitle("");
            setContent("");
            setError("");
            dispatch({ type: "CREATE_NOTE", payload: res.data });
            console.info(res.data);
          })
          .catch((error) => {
            setError(error);
          });
      } catch (error) {
        console.info(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>Add new note</h3>
      {error && <p>{error}</p>}
      <input
        id="title"
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        id="content"
        placeholder="note"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button type="submit">Submit</button>
    </StyledForm>
  );
}
