import React,{Component} from 'react'
import {ProfileNav} from '../Component/ProfileNav.js'
import CategoryNav from '../Component/CategoryNav.js'
import LiveEvent from '../Component/LiveEvent.js'
import {getApiRequest} from '../Utils'
import styles from './homepageContainer.css'
import {Navbar, Nav, NavItem,Modal,Button} from 'react-bootstrap'

const url = 'http://localhost:8000/get_events/'
export class HomepageContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        response: null
      }
    }
    componentDidMount() {
      getApiRequest(url,null,this.success,this.errorCallback,null)
    }
    success = (response) => {
      this.setState({response:response})
    }
    errorCallback = (err) => {
      console.log("eror")
    }
   
    render() {
       return (
       	<div>
          <ProfileNav/><div className='row'>
          {
            this.state.response ? this.state.response.map((data,index)=>{
              return <div className='col-md-4'><LiveEvent key={index} placebet={this.placebet} event={data}/></div>
            }):null
          }
          </div>
        </div>
        );
    }
}