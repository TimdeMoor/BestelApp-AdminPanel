import React, {useEffect, useState} from "react"
import Bestelling from "./bestelling"
import axios from "axios"
import {Order} from "./Entities"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import {ListGroup} from "react-bootstrap"

export default function BestellingenOverzicht(){
	const [orders, setOrders] = useState<Order[]>([])
	useEffect(() => {
		setInterval(() => {
			axios.get("http://localhost:8080/api/v1/orders/incomplete")
				.then(res =>
					setOrders(res.data))
		}, 1000)
	}, [])

	return (
		<Container>{
			orders.map(o => {
				return(<Card key={o.id}>
					<Card.Body>
						<Card.Title><h3>Bestelling voor tafel: {o.tableId}</h3></Card.Title>
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
