import styled from "styled-components";

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
  return (
    <StyledNavBar>
      <div>Shared Notes</div>
    </StyledNavBar>
  );
}
