import React, {ChangeEvent, useEffect, useState} from "react"
import Table from "react-bootstrap/Table"
import {Dish} from "./Entities"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import requester from "../requester"


export default function DishList() {

	const[Dishes, setDishes] = useState<Dish[]>([])
	const[AddModalVisible, setAddModalVisible] = useState<boolean>(false)
	const[DeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
	const[DeleteDishId, setDeleteDishId] = useState<number>(0)
	const[AddDishNaam, setAddDishNaam] = useState<string>("")
	const[AddDishPrijs, setAddDishPrijs] = useState<number>(0)


	async function refreshList(){
		setDishes([])
		const response = await requester.get("/dishes")
		const data = response.data as Array<Dish>

		data.forEach((dish) =>{
			setDishes(Dishes => [...Dishes, dish])
		})
	}

	useEffect (() =>{
		setDishes([])
		refreshList()
	},[])

	function toggleAddModal(): void{
		setAddModalVisible(!AddModalVisible)
	}

	function toggleDeleteModal(dishId: number): void{
		setDeleteDishId(dishId)
		setDeleteModalVisible(!DeleteModalVisible)
	}

	function handleAddDishOnClick(): void{
		AddDish({id: 0, name: AddDishNaam, price: AddDishPrijs})
	}

	function handleAddDishNameOnChange(e: ChangeEvent<HTMLInputElement>): void{
		setAddDishNaam(e.target.value)
	}

	function handleAddDishPriceOnChange(e: ChangeEvent<HTMLInputElement>): void{
		setAddDishPrijs(+e.target.value)
	}

	function handleDeleteDishOnClick(){
		DeleteDish()
	}

	async function AddDish(dish: Dish){
		await requester.post("/dishes", {id: dish.id, name: dish.name, price: dish.price})
		refreshList()
		setAddModalVisible(false)
	}

	async function DeleteDish(){
		await requester.delete(`dishes/${DeleteDishId}`)
		refreshList()
		setDeleteModalVisible(false)
	}

	return(
		<div>
			<h1>Gerechten Overzicht</h1>
			<Button variant={"success"} onClick={toggleAddModal}>Toevoegen</Button>
			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Naam</th>
						<th>Prijs</th>
						<th> </th>
					</tr>
				</thead>
				{
					Dishes.map((dish) => {
						return (
							<tr key={dish.id}>
								<td>{dish.id}</td>
								<td>{dish.name}</td>
								<td>€{dish.price}</td>
								<td>
									<Button variant={"danger"} onClick={() => {toggleDeleteModal(dish.id)}} key={dish.id} style={{color:"#000000"}}>Delete</Button>
								</td>
							</tr>
						)
					})
				}
			</Table>
			<Modal show={AddModalVisible}>
				<Modal.Header>
					<h1>Gerecht Toevoegen</h1>
					<Button
						variant={"danger"}
						onClick={toggleAddModal}
					>X</Button>
				</Modal.Header>
				<Modal.Body>
					<label>Gerecht Naam</label>
					<input
						data-testid={"inputNaam"}
						type="text"
						value={AddDishNaam}
						onChange={(e) => handleAddDishNameOnChange(e)}
					/><br/>
					<label>Gerecht Prijs</label>
					<input
						data-testid={"inputPrijs"}
						type="text"
						value={AddDishPrijs}
						onChange={(e) => handleAddDishPriceOnChange(e)}
					/><br/>
					<Button
						data-testid={"toevoegenButton"}
						variant={"success"}
						type={"button"}
						onClick={handleAddDishOnClick}
					>
						Toevoegen
					</Button>
				</Modal.Body>
				<Modal.Footer>

				</Modal.Footer>
			</Modal>


			<Modal show={DeleteModalVisible}>
				<Modal.Header>
					<h1>Gerecht Wissen?</h1>
					<Button
						variant={"danger"}
						onClick={() => {toggleDeleteModal(0)}}
					>X</Button>
				</Modal.Header>
				<Modal.Body>
					<label>Weet u zeker dat u dit gerecht wilt verwijderen?</label>
					<Button
						variant={"danger"}
						type={"button"}
						onClick={handleDeleteDishOnClick}
					>
						Verwijder
					</Button>
				</Modal.Body>
				<Modal.Footer>

				</Modal.Footer>
			</Modal>
		</div>
	)
}
