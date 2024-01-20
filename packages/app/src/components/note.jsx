/* eslint-disable react/prop-types */
import styled from "styled-components";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StyledNote = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  width: 20rem;
  min-height: 12rem;
  max-height: 20rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 0.1px solid #000000;
  box-shadow: 0 0 0.75rem 0.1rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  background-color: #2;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  height: 10%;
  font-weight: bold;
`;

const StyledContent = styled.div`
  width: 80%;
  height: 80%;
  overflow: hidden;
  word-wrap: break-word;
  margin: 0.25rem;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10%;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
`;

const StyledButton = styled.button`
  background-color: #c3c19d;
  font-family: "Roboto Mono", monospace;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #424133;
    color: white;
  }
`;

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

const Note = ({ note }) => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  let timestamp;

  const handleEditClick = () => {
    navigate(`/note/${note._id}`);
  };

  const handleClick = async () => {
    const userResponse = confirm("Are you sure you want to delete this note?");
    if (!userResponse) return;
    else {
      try {
        const response = await axios.delete(
          backendUrl + "/api/notes/" + note._id,
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        );
        if (response.status === 200) {
          dispatch({ type: "DELETE_NOTE", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (note.author !== user.user._id) {
      const fetchAuthor = async () => {
        const response = await axios.get(backendUrl + "/api/user/", {
          params: { id: note.author },
        });
        if (response.status === 200) {
          setAuthor(response.data.name);
        }
      };
      fetchAuthor();
    }
  });

  if (note.updatedAt > note.createdAt) {
    timestamp = note.updatedAt;
  } else {
    timestamp = note.createdAt;
  }

  return (
    <StyledNote>
      {note.author !== user.user._id && (
        <span>
          <u>{author}</u>
        </span>
      )}
      <StyledTitle>{note.title}</StyledTitle>
      <StyledContent>
        <p>{note.content}</p>
      </StyledContent>
      <StyledButtonWrapper>
        <span>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={handleClick}>Delete</Button>
        </div>
      </StyledButtonWrapper>
    </StyledNote>
  );
};

export default Note;
