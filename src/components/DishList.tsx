import React, {ChangeEvent, useEffect, useState} from "react"
import Table from "react-bootstrap/Table"
import {Dish} from "./Entities"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import requester from "../requester"


export default function DishList() {

	const[Dishes, setDishes] = useState<Dish[]>([])
	const[AddModalVisible, setAddModalVisible] = useState<boolean>(false)
	const[EditModalVisible, setEditModalVisible] = useState<boolean>(false)
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

	function toggleEditModal(): void{
		setEditModalVisible(!EditModalVisible)
	}

	function toggleDeleteModal(): void{
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
		setDeleteDishId(3)
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
									<Button variant={"success"} onClick={toggleEditModal} key={dish.id}>Edit</Button>
									<Button variant={"danger"} onClick={toggleDeleteModal} key={dish.id}>Delete</Button>
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
						type="text"
						value={AddDishNaam}
						onChange={(e) => handleAddDishNameOnChange(e)}
					/><br/>
					<label>Gerecht Prijs</label>
					<input
						type="text"
						value={AddDishPrijs}
						onChange={(e) => handleAddDishPriceOnChange(e)}
					/><br/>
					<Button
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

			<Modal show={EditModalVisible}>
				<Modal.Header>
					<h1>Gerecht Bewerken</h1>
					<Button
						variant={"danger"}
						onClick={toggleEditModal}
					>X</Button>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Naam</Form.Label>
							<Form.Control type="text" placeholder="Naam" />
						</Form.Group>
						<Button variant="success" type="submit">
							Opslaan
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>

				</Modal.Footer>
			</Modal>



			<Modal show={DeleteModalVisible}>
				<Modal.Header>
					<h1>Gerecht Wissen?</h1>
					<Button
						variant={"danger"}
						onClick={toggleDeleteModal}
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
