import {Navbar, Nav, NavItem,Modal,Button, Carousel} from 'react-bootstrap'
import React,{Component} from 'react'
import {postApiRequest,getApiRequest} from '../Utils'
import styles from './ProfileNav.css'

const apiUrl='http://localhost:8000/'
const userdetailsurl = 'http://localhost:8000/profile/'
export class ProfileNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            addPlayerModal:false,
            players: null
            }
    }

    componentDidMount() {
      getApiRequest(apiUrl+'players/',null,this.success,this.errorCallback,null)
    }

    success = (response) => {
      this.setState({players:response})
    }

    createEvent = () => {
      this.setState({showModal: true})
    }

    closeModal = () => {
      this.setState({showModal:false})
    }

    closePlayerModal = () => {
      this.setState({addPlayerModal:false})
    }


    addPlayer = () => {
      this.setState({addPlayerModal:true})
    }

    savePlayer=()=>{
      let data = {name: this.refs.newPlayername.value}
      postApiRequest(apiUrl+'player/',data,()=>{alert('Player added!')},()=>{console.log('error')},null)
    }

    saveEvent = () => {
      let url = apiUrl+'create_event/'
      let data = {'event_name': this.refs.EventName.value,
      'player_1': this.refs.Player1.value,
      'player_2': this.refs.Player2.value,
      'max_bet': this.refs.maxbet.value,
      'min_bet':this.refs.minbet.value,
      'totallimit':this.refs.totallimit.value,
      'startdate':this.refs.startdate.value,
      'enddate':this.refs.enddate.value,
      'event_date':this.refs.event_date.value
      }
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
      console.log(this.state)
      const {showProfile,showHistory,showLandingpage} = this.props
        const navbarInstance = (
              <Navbar className="navbar" inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a className="navbarHeader" onClick={()=>{showLandingpage()}} href="#">UDI BABA</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} onClick={()=>{showProfile()}} href="#">Profile</NavItem>
                    <NavItem eventKey={2} onClick={()=>{showHistory()}} href="#">History</NavItem>
                    <NavItem eventKey={3} onClick={this.createEvent} href="#">Create Event</NavItem>
                    <NavItem eventKey={4} onClick={this.addPlayer} href="#">Add Player</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>);
        return (<div>{navbarInstance}

          <div className='container'>
          <div className='col-md-12'>
          </div> </div>
          <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create An Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <label className="col-md-3">Event Name:</label>
            <div className='col-md-7'>
            <input type="text" name="EventName" ref="EventName" className="form-control"/>
            </div>
            </div>
            <div className="row">
            <label className="col-md-3">Player 1:</label>
            <div className='col-md-7'>
            <select  name="Player1" ref="Player1" className="form-control">
            {this.state.players?this.state.players.map((data,index)=>{
              return <option key={index} value={data.pk}>{data.fields.name}</option>
            }):null}
            </select>
            </div>
            </div>

            <div className="row">
            <label className="col-md-3">Player 2:</label>
            <div className='col-md-7'>
            <select  name="Player2" ref="Player2" className="form-control">
            {this.state.players?this.state.players.map((data,index)=>{
              return <option key={index} value={data.pk}>{data.fields.name}</option>
            }):null}
            </select>
            </div></div>

            <div className="row">
            <label className="col-md-3">Max bet</label>
            <div className='col-md-7'>
            <input type="number" name="maxbet" ref="maxbet" className="form-control"/>
            </div></div>

            <div className="row">
            <label className="col-md-3">Event date:</label>
            <div className='col-md-7'>
            <input type="datetime-local" name="event_date" ref="event_date" className="form-control"/>
            </div>
            </div>

            <div className="row">
            <label className="col-md-3">Min bet</label>
            <div className='col-md-7'>
            <input type="number" name="minbet" ref="minbet" className="form-control"/>
            </div></div>

            <div className="row">
            <label className="col-md-3">Total Limit</label>
            <div className='col-md-7'>
            <input type="number" name="totallimit" ref="totallimit" className="form-control"/>
            </div></div>

            <div className="row">
            <label className="col-md-3">Start date:</label>
            <div className='col-md-7'>
            <input type="datetime-local" name="startdate" ref="startdate" className="form-control"/>
            </div>
            </div>
            <div className="row">
            <label className="col-md-3">End date:</label>
            <div className='col-md-7'>
            <input type="datetime-local" name="enddate" ref="enddate" className="form-control"/>
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveEvent}>Create</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.addPlayerModal} onHide={this.closePlayerModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create An Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <label className="col-md-3">New Player Name:</label>
            <div className='col-md-7'>
            <input type="text" name="newPlayername" ref="newPlayername" className="form-control"/>
            </div>
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.savePlayer}>Create</Button>
            <Button onClick={this.closePlayerModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>)
      
    }
}