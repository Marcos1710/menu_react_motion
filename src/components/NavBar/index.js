import React from "react";

import { Container, DropdownStyles } from "./style";
import { DropdowOption, DropdownProvider, DropdownRoot } from "../Dropdown";
import { Products, Developers, Company } from "../Content";

function NavBar() {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <DropdowOption
                name="Produtos"
                content={Products}
                backgroundHeight={286}
              />
            </li>
            <li>
              <DropdowOption
                name="Desenvolvedores"
                content={Developers}
                backgroundHeight={167}
              />
            </li>
            <li>
              <DropdowOption
                name="Empresa"
                content={Company}
                backgroundHeight={215}
              />
            </li>
          </ul>
        </Container>
        <DropdownRoot />
      </DropdownStyles>
    </DropdownProvider>
  );
}

export default NavBar;
