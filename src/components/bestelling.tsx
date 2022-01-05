import React, {useEffect, useState} from "react"
import BestelRegel from "./bestelRegel"
import axios from "axios"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import {Order, OrderItem} from "./Entities"

export default function Bestelling(props: {
	order: Order,
}){
	const [bestelItems, setBestelItems] = useState<OrderItem[]>([])

	useEffect(() =>{
		axios.get("http://localhost:8080/api/v1/order-items/" + props.order.id)
			.then(res => {
				setBestelItems(res.data)
			}
			)
	},[])


	return(
		<div>
			<Table>
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
						<Button variant={"success"}>Gereed</Button>
					</td>
				</tr>
			</Table>
		</div>
	)
}
