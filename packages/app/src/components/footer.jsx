import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  background-color: #fff;
  border-top: 1px solid #000000;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <div>footer</div>
    </StyledFooter>
  );
}
