import React,{Component} from 'react'
import {Form,FormGroup,Col,FormControl,ControlLabel,Checkbox,Button} from 'react-bootstrap'
import styles from './betHistory.css'

export default class ProfilePage extends Component{
	constructor(props) {
		super(props)
		this.state = {
			updateMode: false
		}
	}

	changeMode = () => {
		this.setState({updateMode: true})
	}

	saveState = (value) => {
		this.setState({data: value})
	}

	render() {
		const {userDetails} = this.props
		const updateForm = (
	  <Form className="title" horizontal>
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

	  const showDetails = (<Form className="title" horizontal>
	  	<FormGroup>
      <ControlLabel>Name</ControlLabel>
      <FormControl.Static>
        {userDetails.username}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Email</ControlLabel>
      <FormControl.Static>
      {userDetails.email}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>First name</ControlLabel>
      <FormControl.Static>
      	{userDetails.first_name}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Available Points</ControlLabel>
      <FormControl.Static>
      	{userDetails.points}
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