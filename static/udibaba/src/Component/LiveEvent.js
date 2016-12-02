import {Navbar, Nav, NavItem} from 'react-bootstrap'
import React,{Component} from 'react'
import styles from './LiveEvent.css'

export default class LiveEvent extends Component {
    render() {
      return (
        <div className="card">
          <h4 className="card-title">Cricket: Veg vs Non Veg</h4>
          <br/>
          Enter the bet amount
          <input className="betamount" type="text" name="betamount"></input>
          <br/><br/>
          <img className="card-img-top" width="100" height="100" src="https://www.hashedin.com/img/about_us/leader/sripathi_krishnan.jpg"/> 
          <img className="card-img-top vs" width="50" height="50" src="data:image/png;base64,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"/>
          <img className="card-img-top faceOff" width="100" height="100" src="https://www.hashedin.com/img/about_us/leader/himanshu_varshaney.jpg"/>
        <div className="card-block">
          <a className="bet1 btn btn-primary" href="#">Bet on Sripathi</a>
          <a className="bet2 btn btn-primary" href="#">Bet on Himanshu</a>
        </div>
        </div>
      );
    }
}