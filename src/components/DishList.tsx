import React, {useEffect, useState} from "react"
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
	//const[ActiveModalItemId, setActiveModalItemId] = useState<number>(0)
	//const[FormData, setFormData] = useState("")

	async function getAllFromApi(){
		const response = await requester.get("/dishes")
		const data = response.data as Array<Dish>

		data.forEach((dish) =>{
			setDishes(Dishes => [...Dishes, dish])
		})
	}

	useEffect (() =>{
		setDishes([])
		getAllFromApi()
	},[])

	function toggleAddModal(): void{
		setAddModalVisible(!AddModalVisible)
	}

	function toggleEditModal(){
		setEditModalVisible(!EditModalVisible)
	}

	function toggleDeleteModal(): void{
		setDeleteModalVisible(!DeleteModalVisible)
	}

	//function handleSubmit(e: FormEventHandler): void{
	//	console.log(e)
	//}

	function getDishFromForm(): Dish{
		return {
			id: 1,
			name: "Test",
			price: 2.5
		}
	}

	async function AddDish(){
		await requester.post("/orders", {tableId: 69, isComplete: false})
		setDishes(Dishes => [...Dishes, getDishFromForm()])
		toggleAddModal()
	}

	return(
		<div>
			<h1>Gerechten Overzicht</h1>
			<Button variant={"success"} onClick={AddDish}>Toevoegen</Button>
			<Table>
				<th>ID</th>
				<th>Naam</th>
				<th>Prijs</th>
				<th> </th>
				{
					Dishes.map((dish) => {
						return (
							<tr key={dish.id}>
								<td>{dish.id}</td>
								<td>{dish.name}</td>
								<td>{dish.price}</td>
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
					<Form>
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Naam</Form.Label>
							<Form.Control type="text" placeholder="Naam" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Prijs</Form.Label>
							<Form.Control type="decimal" placeholder="Prijs" />
						</Form.Group>
						<Button variant="success" type="submit">
							Toevoegen
						</Button>
					</Form>
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
					<Form>
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Weet u zeker dat u dit gerecht wilt verwijderen?</Form.Label>
						</Form.Group>
						<Button variant="success" type="submit">
							Ja
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>

				</Modal.Footer>
			</Modal>
		</div>
	)
}
