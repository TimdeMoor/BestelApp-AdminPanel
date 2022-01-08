import React, {useEffect, useState} from "react"
import Bestelling from "./bestelling"
import {Order} from "./Entities"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import {ListGroup} from "react-bootstrap"
import requester from "../requester";

export default function BestellingenOverzicht(){
	const [orders, setOrders] = useState<Order[]>([])
	useEffect(() => {
		setInterval(() => {
			requester.get("orders/incomplete")
				.then(res =>
					setOrders(res.data))
		}, 1000)
	}, [])

	return (
		<Container>{
			orders.map(o => {
				return(<Card key={o.id}>
					<Card.Body>
						<Card.Title><h3>Bestelling</h3></Card.Title>
						<ListGroup>
							<Bestelling key={o.id} order={o}/>
						</ListGroup>
					</Card.Body>
					<Card.Footer>

					</Card.Footer>
				</Card>)
			})
		}</Container>
	)
}
