import React,{Component} from 'react'
import {Table} from 'react-bootstrap'

const history_data = [{
  "Event" : "Sichuan University",
  "Amount" : "$0.53",
  "Status" : true
}, {
  "Event" : "Malekan Payame Nour University",
  "Amount" : "$7.13",
  "Status" : true
}, {
  "Event" : "Hokkaigakuen University of Kitami",
  "Amount" : "$6.02",
  "Status" : false
}, {
  "Event" : "Florida Christian College",
  "Amount" : "$1.32",
  "Status" : false
}, {
  "Event" : "Bishop's University",
  "Amount" : "$2.38",
  "Status" : false
}, {
  "Event" : "Universidad de Piura",
  "Amount" : "$1.57",
  "Status" : true
}, {
  "Event" : "Montreat College",
  "Amount" : "$8.14",
  "Status" : false
}, {
  "Event" : "Shanghai University of Finance and Economics",
  "Amount" : "$9.03",
  "Status" : true
}, {
  "Event" : "Mahidol University",
  "Amount" : "$0.03",
  "Status" : true
}, {
  "Event" : "Perdana University",
  "Amount" : "$4.56",
  "Status" : true
}, {
  "Event" : "Universidad de Flores - Buenos Aires",
  "Amount" : "$9.73",
  "Status" : false
}, {
  "Event" : "University of Michigan - Dearborn",
  "Amount" : "$8.86",
  "Status" : true
}, {
  "Event" : "Liaquat University of Medical & Health Sciences Jamshoro",
  "Amount" : "$0.07",
  "Status" : true
}, {
  "Event" : "Islamic Azad University, Garmsar",
  "Amount" : "$6.94",
  "Status" : true
}, {
  "Event" : "Claflin College",
  "Amount" : "$6.34",
  "Status" : true
}, {
  "Event" : "Washington State University, Tri-Cities",
  "Amount" : "$4.82",
  "Status" : false
}, {
  "Event" : "New World University",
  "Amount" : "$1.40",
  "Status" : true
}, {
  "Event" : "National Institute of Technology, Jamshedpur",
  "Amount" : "$4.72",
  "Status" : false
}, {
  "Event" : "Thaksin University",
  "Amount" : "$5.21",
  "Status" : true
}, {
  "Event" : "Meredith College",
  "Amount" : "$0.92",
  "Status" : false
}, {
  "Event" : "American University of Paris",
  "Amount" : "$3.17",
  "Status" : true
}, {
  "Event" : "The College of New Jersey",
  "Amount" : "$5.36",
  "Status" : false
}, {
  "Event" : "Hong Kong Institute of Education",
  "Amount" : "$6.05",
  "Status" : true
}, {
  "Event" : "Pontificia Università S. Tommaso",
  "Amount" : "$7.84",
  "Status" : true
}, {
  "Event" : "Ochanomizu Women's University",
  "Amount" : "$8.47",
  "Status" : true
}, {
  "Event" : "Kansai University of International Studies",
  "Amount" : "$3.56",
  "Status" : true
}, {
  "Event" : "Erasmus University Rotterdam",
  "Amount" : "$2.07",
  "Status" : true
}, {
  "Event" : "Université de Provence (Aix-Marseille I)",
  "Amount" : "$1.95",
  "Status" : false
}, {
  "Event" : "Sichuan Agricultural University",
  "Amount" : "$4.65",
  "Status" : true
}, {
  "Event" : "Oduduwa University",
  "Amount" : "$5.40",
  "Status" : false
}, {
  "Event" : "Bilecik University",
  "Amount" : "$0.15",
  "Status" : true
}, {
  "Event" : "State University of New York (SUNY)",
  "Amount" : "$2.55",
  "Status" : true
}, {
  "Event" : "Far Eastern State Technical Fisheries University",
  "Amount" : "$9.09",
  "Status" : true
}, {
  "Event" : "Bakhtar University",
  "Amount" : "$1.28",
  "Status" : false
}, {
  "Event" : "Jinan University",
  "Amount" : "$0.87",
  "Status" : true
}, {
  "Event" : "Embry-Riddle Aeronautical University",
  "Amount" : "$4.61",
  "Status" : false
}, {
  "Event" : "Georgia Baptist College of Nursing",
  "Amount" : "$1.75",
  "Status" : true
}, {
  "Event" : "United Arab Emirates University",
  "Amount" : "$0.40",
  "Status" : false
}, {
  "Event" : "Aksum University",
  "Amount" : "$2.33",
  "Status" : false
}, {
  "Event" : "University of Northeastern Philippines",
  "Amount" : "$9.69",
  "Status" : false
}, {
  "Event" : "Kamrah International Institute of Technology (KIIT)",
  "Amount" : "$2.41",
  "Status" : false
}, {
  "Event" : "Tokai Women's College",
  "Amount" : "$7.66",
  "Status" : false
}, {
  "Event" : "Ecole Supérieure d'Ingénieurs en Génie Electrique",
  "Amount" : "$0.91",
  "Status" : true
}, {
  "Event" : "Banaras Hindu University",
  "Amount" : "$9.10",
  "Status" : false
}, {
  "Event" : "Wesley College Mississippi",
  "Amount" : "$4.21",
  "Status" : true
}, {
  "Event" : "Universidad de Huánuco",
  "Amount" : "$8.02",
  "Status" : true
}, {
  "Event" : "University of Warwick",
  "Amount" : "$8.69",
  "Status" : false
}, {
  "Event" : "Moscow State Technical University of Civil Aviation",
  "Amount" : "$3.68",
  "Status" : true
}, {
  "Event" : "Universidad Libre de Colombia",
  "Amount" : "$9.75",
  "Status" : true
}, {
  "Event" : "Applied Science University",
  "Amount" : "$2.80",
  "Status" : false
}]

export default class BetHistory extends Component {
	render() {
		const historyTable = (<div>
	<h2>Bet History</h2>
	<Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Event</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
    {history_data.map((data,index)=>{
    	return <tr><td>{index}</td><td>{data.Event}</td><td>{data.Amount}</td><td>{data.Status?'WON':'LOST'}</td></tr>
    })}
    </tbody>
  </Table>
  </div>
);
		return (<div>{historyTable}</div>)
	}
}