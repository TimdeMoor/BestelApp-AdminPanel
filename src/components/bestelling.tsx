import React, {useEffect, useState} from "react"
import BestelRegel from "./bestelRegel"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import {Order, OrderItem} from "./Entities"
import requester from "../requester"

export default function Bestelling(props: {
	order: Order,
}){
	const [bestelItems, setBestelItems] = useState<OrderItem[]>([])

	useEffect(() =>{
		requester.get(`order-items/${props.order.id}`)
			.then(res => {
				setBestelItems(res.data)
			})
	},[])

	function handleCompleteOrderOnClick(orderId: number){
		completeOrder(orderId)
	}

	function completeOrder(orderId: number): void{
		requester.patch(`orders/complete/${orderId}`)
	}

	return(
		<div>
			<Table>
				<thead>
					<tr>
						<td colSpan={2}><h3>Bestelling: {props.order.id}</h3></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<ul>
								{bestelItems.map(oi => {
									if (oi != null){
										return <BestelRegel orderItem={oi}/>
									}
								})}
							</ul>
						</td>
						<td>
							<Button
								key={props.order.id}
								variant={"success"}
								style={{color:"#000000"}}
								onClick={() => handleCompleteOrderOnClick(props.order.id)}
							>Gereed</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}
