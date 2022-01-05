import React, {useEffect, useState} from "react"
import axios from "axios"
import {Dish, OrderItem} from "./Entities"

export default function BestelRegel(props: {
	orderItem: OrderItem,
}){
	const [orderItem] = useState<OrderItem>(props.orderItem)
	const [dish, setDish] = useState<Dish>({id: 0, name: "", price: 0})

	useEffect(() =>{
		axios.get("http://localhost:8080/api/v1/dishes/" + props.orderItem.dishId)
			.then(res => {
				setDish(res.data)
			}
			)
	},[orderItem])

	function checkExtra(){
		if (orderItem.comment === null){
			return(
				<li>{}x {dish.name}</li>
			)
		}else{
			return(
				<ul>
					<li>{orderItem.amount}x {dish.name}</li>
					{orderItem.comment ? <li>orderItem.opmerking</li> : " "}
				</ul>
			)
		}
	}

	return (
		<div>{
			checkExtra()
		}</div>
	)
}
