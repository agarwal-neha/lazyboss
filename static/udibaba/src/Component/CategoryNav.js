import {Navbar, Nav, NavItem} from 'react-bootstrap'
import React,{Component} from 'react'
import styles from './CategoryNav.css'

export default class CategoryNav extends Component {
    render() {
        return(
              <Navbar inverse collapseOnSelect className="categoryNav">
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="#">All Events</NavItem>
                    <NavItem eventKey={2} href="#">Cricket</NavItem>
                    <NavItem eventKey={3} href="#">Football</NavItem>
                    <NavItem eventKey={4} href="#">Table Tennis</NavItem>
                    <NavItem eventKey={5} href="#">Foosball</NavItem>
                    <NavItem eventKey={6} href="#">Poker</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>);
    }
}