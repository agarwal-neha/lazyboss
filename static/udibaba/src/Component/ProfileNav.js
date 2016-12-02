import {Navbar, Nav, NavItem} from 'react-bootstrap'
import React,{Component} from 'react'


export class ProfileNav extends Component {
    render() {
        const navbarInstance = (
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">UDI_BABA</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="#">Profile</NavItem>
                    <NavItem eventKey={2} href="#">History</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>);
        return (<div>{navbarInstance}</div>)
    }
}