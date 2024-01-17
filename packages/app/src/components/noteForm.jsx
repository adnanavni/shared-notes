import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;

export default function NoteForm() {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [collaboratorsInput, setCollaboratorsInput] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    } else {
      let collaborators = [];
      const usernames = collaboratorsInput.split(",");

      try {
        for (const username of usernames) {
          try {
            const res = await axios.get(backendUrl + "/api/user", {
              params: {
                username: username.trim(),
              },
            });

            collaborators.push(res.data._id);
          } catch (error) {
            setError(error.message);
          }
        }

        await axios
          .post(
            backendUrl + "/api/notes",
            {
              title: title,
              content: content,
              collaborators: collaborators,
            },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          )
          .then((res) => {
            setTitle("");
            setContent("");
            setCollaboratorsInput("");
            setError("");
            dispatch({ type: "CREATE_NOTE", payload: res.data });
            console.info(res.data);
          })
          .catch((error) => {
            setError(error);
          });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>Add new note</h3>
      {error && <p>{error.message}</p>}
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
      <input
        id="collaborators"
        type="text"
        placeholder="collaborators"
        onChange={(e) => setCollaboratorsInput(e.target.value)}
        value={collaboratorsInput}
      />
      <button type="submit">Submit</button>
    </StyledForm>
  );
}
