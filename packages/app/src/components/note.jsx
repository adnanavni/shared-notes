import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StyledNote = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  width: 20rem;
  min-height: 12rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 0.1px solid #000000;
  box-shadow: 0 0 0.75rem 0.1rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Styledh3 = styled.h3`
  overflow: hidden;
`;

const StyledParagraph = styled.p`
  height: 3rem;
  width: 80%;
  overflow: hidden;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
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

const StyledSpan = styled.span``;

const Note = ({ note }) => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [author, setAuthor] = useState("");

  const handleClick = async () => {
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
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await axios.get(backendUrl + "/api/user/", {
        params: { id: note.author },
      });
      if (response.status === 200) {
        setAuthor(response.data.username);
      }
    };
    fetchAuthor();
  });

  return (
    <StyledNote>
      {note.author !== user.user._id && (
        <StyledParagraph>{author}</StyledParagraph>
      )}
      <Styledh3>{note.title}</Styledh3>
      <StyledParagraph>{note.content}</StyledParagraph>
      <StyledButtonWrapper>
        <StyledSpan>
          {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
        </StyledSpan>
        <StyledButton onClick={handleClick}>Delete</StyledButton>
      </StyledButtonWrapper>
    </StyledNote>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
};

export default Note;
