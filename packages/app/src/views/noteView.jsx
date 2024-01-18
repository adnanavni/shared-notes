import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { StyledForm, StyledInput, StyledButton } from "./loginView";
import { StyledMain } from "./mainView";
import { StyledTextArea } from "../components/noteForm";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const NoteView = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [collaboratorNames, setCollaboratorNames] = useState([]);
  const [collab, setCollab] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${backendUrl}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setNote(result.data);
      setTitle(result.data.title);
      setContent(result.data.content);
      setLoading(false);

      const collaboratorIDs = result.data.collaborators;
      const usernames = [];
      for (let i = 0; i < collaboratorIDs.length; i++) {
        try {
          const userResult = await axios.get(`${backendUrl}/api/user`, {
            params: {
              id: collaboratorIDs[i],
            },
          });
          usernames.push(userResult.data.name);
        } catch (error) {
          console.error(error);
        }
      }
      setCollaboratorNames(usernames.join(", "));
    };

    if (user) {
      fetchData();
    }
  }, [id, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let collaborators = [];
      if (collaboratorNames !== "") {
        const usernames = collaboratorNames.split(",");

        for (const username of usernames) {
          try {
            const res = await axios.get(backendUrl + "/api/user", {
              params: {
                username: username.trim(),
              },
            });
            console.info(res.data);

            collaborators.push(res.data._id);
            console.log(collaborators);
          } catch (error) {
            console.error(error);
          }
        }
        setCollab(collaborators);
      }
    } catch (error) {
      console.error(error);
    }

    const updatedNote = {
      title,
      content,
      collaborators: collab,
    };

    try {
      await axios.patch(`${backendUrl}/api/notes/${id}`, updatedNote, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      alert("Note updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update note");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>No note found</div>;
  }

  return (
    <StyledMain>
      <StyledForm style={{ marginTop: "5rem" }} onSubmit={handleSubmit}>
        <label>Title</label>
        <StyledInput
          type="text"
          placeholder={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content</label>
        <StyledTextArea
          placeholder={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Collaborators</label>
        <StyledInput
          type="text"
          placeholder={collaboratorNames}
          onChange={(e) => setCollaboratorNames(e.target.value)}
        />
        <StyledButton type="submit">Save</StyledButton>
      </StyledForm>
    </StyledMain>
  );
};

export default NoteView;
