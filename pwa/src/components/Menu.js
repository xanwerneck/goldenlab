import React from "react";
import { faDoorOpen, faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
  Button
} from "shards-react";
import { logout } from "../utils/auth";

export default class Menu extends React.Component {
    
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }
  sair = () => {
      logout()
      this.props.goLogin()
  }

  render() {
    return (
      <Navbar type="dark" expand="md" style={{backgroundColor: "#ffffff"}}>
        <NavbarBrand href="#">
            <img src="/images/logo.jpg" width="65" style={{borderRadius: 10}} />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Button 
        onClick={() => this.sair()}
        style={{backgroundColor: "#ffffff", border: 0}}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{color: "#8C0406", fontSize: 20}} />
        </Button>
      </Navbar>
    );
  }
}