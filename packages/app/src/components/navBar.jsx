import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  background-color: #424133;
  color: #ffffff;
  border-bottom: 2px solid #000000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  margin: 1rem;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
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

const StyledSpan = styled.span`
  margin-right: 1rem;
`;

export default function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <StyledNavBar>
        <StyledLink to="/">
          <h1>Shared Notes</h1>
        </StyledLink>

        {user && (
          <div>
            <StyledSpan>{user.user.username}</StyledSpan>
            <StyledButton onClick={handleClick}>Log out</StyledButton>
          </div>
        )}
        {!user && <StyledLink to="/login">Login</StyledLink>}
      </StyledNavBar>
    </header>
  );
}
