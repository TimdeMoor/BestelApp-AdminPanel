import React, {useEffect, useState} from "react"
import {Dish, OrderItem} from "./Entities"
import requester from "../requester"

export default function BestelRegel(props: {
	orderItem: OrderItem,
}){
	const [orderItem] = useState<OrderItem>(props.orderItem)
	const [dish, setDish] = useState<Dish>({id: 0, name: "", price: 0})

	useEffect(() =>{
		requester.get("/dishes/" + props.orderItem.dishId)
			.then(res => {
				setDish(res.data)
			}
			)
	},[orderItem])

	function checkExtra(){
		if (orderItem.comment === null){
			return(
				<li>{orderItem.amount}x {dish.name}</li>
			)
		}else{
			return(
				<ul>
					<li><h4>{orderItem.amount}x {dish.name}</h4></li>
					{orderItem.comment ? <li>orderItem.comment</li> : " "}
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
