import {Navbar, Nav, NavItem,Modal,Button} from 'react-bootstrap'
import React,{Component} from 'react'
import ProfilePage from './ProfilePage'
import BetHistory from './betHistory'
import {postApiRequest} from '../Utils'

const apiUrl='https://localhost:8000/'

export class ProfileNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showProfile: true,
            showModal: false
        }
    }

    showProfile = () => {
        this.setState({showProfile: true})
    }

    showHistory = () => {
        this.setState({showProfile: false})
    }

    createEvent = () => {
      console.log("bc")
      this.setState({showModal: true})
    }

    closeModal = () => {
      this.setState({showModal:false})
    }

    saveEvent = () => {
      let url = apiUrl+'create_event'
      let data = {'event_name': this.refs.EventName.value,
      'player_1': this.refs.Player1.value,
      'player_2': this.refs.Player2.value,
      'max_bet': this.refs.maxbet.value,
      'min_bet':this.refs.minbet.value,
      'totallimit':this.refs.totallimit.value,
      'startdate':this.refs.startdate.value,
      'enddate':this.refs.enddate.value
      }
      console.log(data)
      postApiRequest(url,data,this.saveEventcallback,this.errorCallback,null)
    }

    errorCallback = (err) => {
      console.log("Error:",err)
      this.closeModal()
    }

    saveEventcallback = (response) => {
      alert("Event created")
      this.closeModal()
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
                    <NavItem eventKey={3} onClick={this.createEvent} href="#">Create Event</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>);
        return (<div>{navbarInstance}
          <div className='container'>
          <div className='col-md-12'>
          {this.state.showProfile ? <ProfilePage /> : <BetHistory/> }
          </div> </div>
          <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create An Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <label className="col-md-3">Event Name:</label>
            <input type="text" name="EventName" ref="EventName" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">Player 1:</label>
            <input type="text" name="Player1" ref="Player1" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">Player 2:</label>
            <input type="text" name="Player2" ref="Player2" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">Max bet</label>
            <input type="number" name="maxbet" ref="maxbet" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">Min bet</label>
            <input type="number" name="minbet" ref="minbet" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">Total Limit</label>
            <input type="number" name="totallimit" ref="totallimit" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">Start date:</label>
            <input type="datetime-local" name="startdate" ref="startdate" className="col-md-7"/>
            </div>
            <div className="row">
            <label className="col-md-3">End date:</label>
            <input type="datetime-local" name="enddate" ref="enddate" className="col-md-7"/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveEvent}>Create</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
          </div>)
    }
}