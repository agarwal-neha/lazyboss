import React,{Component} from 'react'
import {Form,FormGroup,Col,FormControl,ControlLabel,Checkbox,Button} from 'react-bootstrap'

let current_user = {
  "User" : "Sharon Boyd",
  "Email" : "sboyd0@illinois.edu",
  "Phone" : "86-(429)234-7757",
  "Total_Points" : "$8.95"
}
export default class ProfilePage extends Component{
	constructor(props) {
		super(props)
		this.state = {
			updateMode: false,
			user: current_user
		}
	}

	changeMode = () => {
		this.setState({updateMode: true})
	}

	saveState = (value) => {
		this.setState({data: value})
	}

	render() {
		const {profileMode} = this.props
		const updateForm = (
	  <Form horizontal>
	    <FormGroup controlId='formHorizontalEmail'>
	      <Col componentClass={ControlLabel} sm={2}>Email</Col>
	      <Col sm={10}>
	        <FormControl type='email' placeholder='Email' />
	      </Col>
	    </FormGroup>
	    <FormGroup controlId='formHorizontalPassword'>
	      <Col componentClass={ControlLabel} sm={2}>
	        Phone Number
	      </Col>
	      <Col sm={10}>
	        <FormControl type='number' placeholder='Phone' />
	      </Col>
	    </FormGroup>
	    <FormGroup>
	      <Col smOffset={2} sm={10}>
	        <Button type='button' onClick={this.saveState}>
	          Save
	        </Button>
	      </Col>
	    </FormGroup>
	  </Form>)

	  const showDetails = (<Form horizontal>
	  	<FormGroup>
      <ControlLabel>Name</ControlLabel>
      <FormControl.Static>
        {current_user.User}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Email</ControlLabel>
      <FormControl.Static>
      {current_user.Email}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Phone Number</ControlLabel>
      <FormControl.Static>
      	{current_user.Phone}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Available Points</ControlLabel>
      <FormControl.Static>
      	{current_user.Total_Points}
      </FormControl.Static>
    </FormGroup>
    <Button type='button' onClick={this.changeMode}>
	          Update
	        </Button>
	  </Form>
	  )

	return (<div className='row'>
				<div className='col-md-12'>{this.state.updateMode ? updateForm : showDetails }
				</div>
			</div>)
	}
}