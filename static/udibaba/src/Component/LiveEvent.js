import React,{Component} from 'react'
import styles from './LiveEvent.css'
import {Form,FormGroup,Col,FormControl,ControlLabel,Checkbox,Navbar, Nav, NavItem,Modal,Button} from 'react-bootstrap'
import moment from 'moment'
import {postApiRequest,getApiRequest} from '../Utils'

const url='http://localhost:8000/place/'
export default class LiveEvent extends Component {
  constructor(props){
    super(props)
    this.state={
      placebetmodal: false,
      updateresult: false
    }
  }

    placebet = () => {
      this.setState({placebetmodal:true})
    }
    closeModal = ()=>{
            this.setState({placebetmodal:false})
    }
    closeupdateModal=()=>{
      this.setState({updateresult:false})
    }
    updateStatus=()=>{
      this.setState({updateresult:true})
    }
    success = (response)=>{
      console.log("response")
      alert("Bet placed")
    }
    error =()=>{
      console.log("error")
    }
    saveUpdatedresult=()=>{
      let data={event_id:this.props.event.id,
        player_id:this.refs.winner.value}
       postApiRequest('http://localhost:8000/update_result/',data,()=>{alert("Winner updated")},()=>{console.log("Error")},null) 
      this.closeupdateModal()
    }
    saveBet = ()=> {
      let data = {amount:this.refs.amount.value,
        player_id:this.refs.player.value,
        event_id:this.props.event.id,
        return_rate:1.8
      }
      postApiRequest(url,data,this.success,this.error,null)
      this.closeModal()
    }
    render() {
      console.log(this.props.event)
      return (
        <div className="card">
          <h4 className="card-title">{this.props.event.name}</h4>
          <FormGroup>
          <ControlLabel>Start Time</ControlLabel>
          <FormControl.Static>
          {moment(this.props.event.start_date).format('MM-DD-YYYY')}&nbsp;{moment(this.props.event.start_date).format('LT')}
          </FormControl.Static>
          </FormGroup>
          <FormGroup>
          <ControlLabel>End Time</ControlLabel>
          <FormControl.Static>
          {moment(this.props.event.end_date).format('MM-DD-YYYY')}&nbsp;{moment(this.props.event.end_date).format('LT')}
          </FormControl.Static>
          </FormGroup>
          <FormGroup>
          <ControlLabel>Max Bet</ControlLabel>
          <FormControl.Static>
          {this.props.event.max_bet}
          </FormControl.Static>
          </FormGroup>
          <FormGroup>
          <ControlLabel>Min Bet</ControlLabel>
          <FormControl.Static>
          {this.props.event.min_bet}
          </FormControl.Static>
          </FormGroup>
          <FormGroup>
          <ControlLabel>Organizer</ControlLabel>
          <FormControl.Static>
          {this.props.event.organizer.username}
          </FormControl.Static>
          </FormGroup>
          <br/><br/>
        <div className="card-block">
          <a className="bet1 btn btn-primary" href="#" onClick={this.placebet}> Place Bet</a>
          <a className="bet1 btn btn-primary" href="#" onClick={this.updateStatus}> Enter Result</a>
        </div>
        <Modal show={this.state.placebetmodal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Place a Bet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <label className="col-md-3">Choose player</label>
            <div className='col-md-7'>
            <select ref='player'>
            {this.props.event?this.props.event.players.map((data,i)=>{
              return <option key={i} value={data.id}>{data.name}</option>
            }):null}
            </select>
            </div>
            </div>
            <div className="row">
            <label className="col-md-3">Enter amt</label>
            <div className='col-md-7'>
            <input type='number' ref='amount' />
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveBet}>Placebet</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        
        </Modal><Modal show={this.state.updateresult} onHide={this.closeupdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Place a Bet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <label className="col-md-3">Choose Winner player</label>
            <div className='col-md-7'>
            <select ref='winner'>
            {this.props.event?this.props.event.players.map((data,i)=>{
              return <option key={i} value={data.id}>{data.name}</option>
            }):null}
            </select>
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveUpdatedresult}>Save</Button>
            <Button onClick={this.closeupdateModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        </div>
      );
    }
}