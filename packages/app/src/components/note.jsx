import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";
import { useNotesContext } from "../hooks/useNotesContext";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #000000;
  border-radius: 0.5rem;
  margin: 1rem;
  background-color: #fff;
`;

const Note = ({ note }) => {
  const { dispatch } = useNotesContext();

  const handleClick = async () => {
    try {
      const response = await axios.delete(
        backendUrl + "/api/notes/" + note._id
      );
      if (response.status === 200) {
        dispatch({ type: "DELETE_NOTE", payload: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledNote>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </p>
      <button onClick={handleClick}>Delete</button>
    </StyledNote>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
};

export default Note;
