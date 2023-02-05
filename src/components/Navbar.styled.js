import styled from "styled-components";

const NavbarStyled = styled.div`
  .navbar-avatar svg {
    display: inline-block;
    margin-left: 2px;
    max-height: 25px;
    max-width: 25px;
    height: 1.5em;
    color: rgb(29, 155, 240);
    fill: currentcolor;
    vertical-align: text-bottom;
    position: relative;
  }

  .navbar-avatar svg {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  svg:not(:root) {
    overflow-clip-margin: content-box;
    overflow: hidden;
  }

  .navbar-avatar img {
    margin-right: 0.5rem;
  }
`;

export default NavbarStyled;
