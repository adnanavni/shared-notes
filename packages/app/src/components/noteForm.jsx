import styled from "styled-components";
import { StyledForm, StyledInput, StyledButton } from "../views/loginView";
import axios from "axios";
import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const StyledTextArea = styled.textarea`
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #000000;
  border-radius: 0.5rem;
  width: 15rem;
  height: 10rem;
  text-align: center;
  background-color: #fffef3;

  &:focus {
    outline: none;
    background-color: #424133;
    color: white;
  }
`;

const StyledLabel = styled.label`
  text-align: center;
`;

export default function NoteForm() {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [collaboratorsInput, setCollaboratorsInput] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!title || !content) {
      setError("Title and content are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorCollab = false;

    if (!validateForm()) {
      return;
    } else {
      try {
        let collaborators = [];
        if (collaboratorsInput.length > 0) {
          const usernames = collaboratorsInput.split(",");

          for (const username of usernames) {
            try {
              const res = await axios.get(backendUrl + "/api/user", {
                params: {
                  username: username.trim(),
                },
              });
              collaborators.push(res.data._id);
            } catch (error) {
              setError(error.response.data);
              errorCollab = true;
            }
          }
        }

        if (errorCollab) {
          return;
        } else {
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
              alert("Note created successfully");
              navigate("/");
            })
            .catch((error) => {
              setError(error);
              alert("Note creation failed");
            });
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Add new note</h2>
      {error && <p>{error.message}</p>}
      <StyledInput
        id="title"
        type="text"
        placeholder="title*(20)"
        onChange={(e) => setTitle(e.target.value)}
        maxLength={20}
      />
      <StyledTextArea
        id="content"
        placeholder="content*(200)"
        onChange={(e) => setContent(e.target.value)}
        maxLength={200}
      />
      <StyledLabel htmlFor="collaborators">
        In case of multiple users, <br /> use comma to separate usernames
      </StyledLabel>
      <StyledInput
        id="collaborators"
        type="text"
        placeholder="collaborators"
        onChange={(e) => setCollaboratorsInput(e.target.value)}
      />
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}
