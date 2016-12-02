import {Navbar, Nav, NavItem} from 'react-bootstrap'
import React,{Component} from 'react'


export class ProfileNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showProfile: true
        }
    }

    showProfile = () => {
        this.setState({showProfile: true})
    }

    showHistory = () => {
        this.setState({showProfile: false})
    }

    render() {
        const navbarInstance = (
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">UDI BABA</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} onClick={this.showProfile} href="#">Profile</NavItem>
                    <NavItem eventKey={2} onClick={this.showHistory} href="#">History</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>);
        return (<div>{navbarInstance}</div>)
    }
}