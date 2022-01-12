import React, {useEffect, useState} from "react"
import Bestelling from "./bestelling"
import {Order} from "./Entities"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import {ListGroup} from "react-bootstrap"
import requester from "../requester"
import config from "../Config"

export default function BestellingenOverzicht(props:{
	bestellingen:Order[]|undefined
}){
	const [orders, setOrders] = useState<Order[]>(props.bestellingen ? props.bestellingen : [])
	useEffect(() => {
		setInterval(() => {
			requester.get("orders/incomplete")
				.then(res =>
					setOrders(res.data))
		}, config.RefreshDelayMS)
	}, [])

	return (
		<Container>
			<h1>Bestellingen</h1>
			{
				orders.map(o => {
					return(<Card key={o.id} data-testid={`Bestelling ${o.id}`}>
						<Card.Body>
							<ListGroup>
								<Bestelling key={o.id} order={o}/>
							</ListGroup>
						</Card.Body>
					</Card>)
				})
			}</Container>
	)
}
