import {Navbar, Nav, NavItem} from 'react-bootstrap'
import React,{Component} from 'react'

export default class HomeNav extends Component {
    render() {
        return (
          <div>
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">LAZYBOSS</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="#">Profile</NavItem>
                    <NavItem eventKey={2} href="#">History</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
          </div>
        );
    }
}