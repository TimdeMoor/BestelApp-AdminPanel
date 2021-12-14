import React from 'react'
import Table from 'react-bootstrap/Table'
import {Dish} from "./Entities";
import Button from "react-bootstrap/Button";

export default function DishList(props: {
    dishes: Dish[],
}) {
    return(
        <Table>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
            {
                props.dishes.map(dish => {
                return (
                    <tr>
                        <td>{dish.id}</td>
                        <td>{dish.name}</td>
                        <td>{dish.price}</td>
                        <td><Button variant={"success"}>Edit</Button></td>
                    </tr>
                )
            })}
        </Table>
    )
}
