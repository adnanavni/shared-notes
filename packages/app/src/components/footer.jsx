import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  background-color: #424133;
  color: #ffffff;
  border-top: 1px solid #000000;
`;

export default function Footer() {
  return <StyledFooter>© Adnan Avni</StyledFooter>;
}
