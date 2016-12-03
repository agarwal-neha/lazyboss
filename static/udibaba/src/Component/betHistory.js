import React,{Component} from 'react'
import {Table} from 'react-bootstrap'
import styles from './betHistory.css'


export default class BetHistory extends Component {
	render() {
    const {userDetails}=this.props
		const historyTable = (<div>
	<h2 className="title">Bet History</h2>
	<Table striped bordered condensed hover>
    <thead className="title">
      <tr>
        <th>#</th>
        <th>Event Id</th>
        <th>Amount</th>
        <th>Rate of Return</th>
        <th>Final amount</th>
        <th>Player Id</th>
      </tr>
    </thead>
    <tbody>
    {JSON.parse(userDetails.bet_history).map((data,index)=>{
    	return <tr key={index}><td>{index}</td><td>{data.event_id}</td><td>{data.amount}</td><td>{data.rate_of_return}</td>
      <td>{data.final_amount}</td><td>{data.player_id}</td></tr>
    })}
    </tbody>
  </Table>
  </div>
);
		return (<div>{historyTable}</div>)
	}
}