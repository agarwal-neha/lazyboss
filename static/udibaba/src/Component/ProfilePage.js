import React,{Component} from 'react'
import {Form,FormGroup,Col,FormControl,ControlLabel,Checkbox,Button} from 'react-bootstrap'

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
	        Password
	      </Col>
	      <Col sm={10}>
	        <FormControl type='password' placeholder='Password' />
	      </Col>
	    </FormGroup>

	    <FormGroup>
	      <Col smOffset={2} sm={10}>
	        <Checkbox>Remember me</Checkbox>
	      </Col>
	    </FormGroup>

	    <FormGroup>
	      <Col smOffset={2} sm={10}>
	        <Button type='submit'>
	          Save
	        </Button>
	      </Col>
	    </FormGroup>
	  </Form>)

	  const showDetails = (<Form horizontal>
	  	<FormGroup>
      <ControlLabel>Name</ControlLabel>
      <FormControl.Static>
        Name
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>
        email@example.com
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>
        email@example.com
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>
        email@example.com
      </FormControl.Static>
    </FormGroup>
    <Button type='button' onClick={this.changeMode}>
	          Update Info.
	        </Button>
	  </Form>
	  )

	return (<div className='row'>
				<div className='col-md-12'>{this.state.updateMode ? updateForm : showDetails }
				</div>
			</div>)
	}
}