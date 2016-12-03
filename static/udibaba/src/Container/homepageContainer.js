import React,{Component} from 'react'
import {ProfileNav} from '../Component/ProfileNav.js'
import CategoryNav from '../Component/CategoryNav.js'
import LiveEvent from '../Component/LiveEvent.js'
import {getApiRequest} from '../Utils'
import styles from './homepageContainer.css'
import ProfilePage from '../Component/ProfilePage'
import BetHistory from '../Component/betHistory'
import {Navbar, Nav, NavItem,Modal,Button,Carousel} from 'react-bootstrap'

const url = 'http://localhost:8000/get_events/'
const userdetailsurl = 'http://localhost:8000/profile/'
export class HomepageContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        response: null,
        showProfile:false,
        showHistory:false,
      }
    }

    showProfile=()=>{
      this.setState({showProfile:true,
        showHistory:false})
    }
    showHistory=()=>{
      this.setState({showProfile:false,
        showHistory:true})
    }
    showLandingpage=()=>{
      this.setState({showProfile:false,
        showHistory:false})
    }
    componentDidMount() {
      getApiRequest(url,null,this.success,this.errorCallback,null)
      getApiRequest(userdetailsurl,null,this.suck,this.errorCallback,null)
    }
    suck = (response)=>{
      this.setState({userDetails:response})
    }
    success = (response) => {
      this.setState({response:response})
    }
    errorCallback = (err) => {
      console.log("eror")
    }
   
    render() {
      const carouselInstance = (
        <Carousel>
          <Carousel.Item>
            <img width={1000} height={100} alt="1000x300" src="https://www.hashedin.com/img/about_us/pic@2x.jpg"/>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={1000} height={100} alt="1000x300" src="https://www.hashedin.com/img/about_us/pic@2x.jpg"/>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={1000} height={100} alt="1000x300" src="https://www.hashedin.com/img/about_us/pic@2x.jpg"/>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        );
       return (
       	<div>
          <ProfileNav showHistory={this.showHistory} showProfile={this.showProfile} showLandingpage={this.showLandingpage}/><div className='row'>
           <div className='col-md-12'>{this.state.showProfile?<ProfilePage userDetails={this.state.userDetails}/>:null}</div>
           <div className='col-md-12'>{this.state.showHistory?<BetHistory userDetails={this.state.userDetails}/>:null}</div>
          <div className='col-md-12'>{!this.state.showHistory && !this.state.showProfile?carouselInstance:null}</div>
          {
            this.state.response&&!this.state.showHistory&&!this.state.showProfile ? this.state.response.map((data,index)=>{
              return <div className='col-md-4'><LiveEvent key={index} placebet={this.placebet} event={data}/></div>
            }):null
          }
          </div>
        </div>
        );
    }
}