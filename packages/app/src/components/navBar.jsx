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
  background-color: #fff;
  border-bottom: 1px solid #000000;
`;

export default function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <StyledNavBar>
      <Link to="/">
        <h1>Shared Notes</h1>
      </Link>
      <nav>
        {user && (
          <div>
            <span>{user.user.username}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </StyledNavBar>
  );
}
