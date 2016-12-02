import React,{Component} from 'react'
import {ProfileNav} from '../Component/ProfileNav.js'
import CategoryNav from '../Component/CategoryNav.js'
import LiveEvent from '../Component/LiveEvent.js'
import styles from './homepageContainer.css'

export class HomepageContainer extends React.Component {
    render() {
       return (
       	<div>
          <ProfileNav/>
          <div className='row'>
          <div className='col-md-6'>
          	<LiveEvent />
          </div>
          <div className='col-md-6'>
          	<LiveEvent />
          </div>
          </div>
        </div>
        );
    }
}