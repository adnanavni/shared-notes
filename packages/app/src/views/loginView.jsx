import styled from "styled-components";
import { StyledMain } from "./mainView";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledInput = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #000000;
  border-radius: 0.5rem;
  width: 15rem;
  text-align: center;
  background-color: #fffef3;

  &:focus {
    outline: none;
    background-color: #424133;
    color: white;
  }
`;

export const StyledButton = styled.button`
  background-color: #c3c19d;
  font-family: "Roboto Mono", monospace;
  border: none;
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #424133;
    color: white;
  }
`;

const StyledSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: #000000;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <StyledMain>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <StyledInput
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
        <StyledInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />

        <StyledButton disabled={isLoading}>Login</StyledButton>
        <StyledSignUpWrapper>
          <p>Don't have an account?</p>
          <StyledLink to="/signup">Sign up here!</StyledLink>
        </StyledSignUpWrapper>
        {error && (
          <div style={{ marginTop: "2rem" }}>{error.response.data.message}</div>
        )}
      </StyledForm>
    </StyledMain>
  );
};

export default Login;
