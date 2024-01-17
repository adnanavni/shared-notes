import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { StyledButton, StyledForm, StyledInput } from "./loginView";
import { StyledMain } from "./mainView";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password);
  };

  return (
    <StyledMain>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <StyledInput
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <StyledInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <StyledButton disabled={isLoading}>Sign up</StyledButton>
        {error && (
          <div style={{ marginTop: "2rem" }}>{error.response.data.message}</div>
        )}
      </StyledForm>
    </StyledMain>
  );
};

export default Signup;
