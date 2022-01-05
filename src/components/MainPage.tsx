import React, {useState} from "react"
import DishList from "./DishList"
import {Button} from "react-bootstrap"
import BestellingenOverzicht from "./bestellingenOverzicht"

export default function MainPage() {

	const [AdminVisible, setAdminVisible] = useState<boolean>(false)

	function ToggleView() {
		setAdminVisible(!AdminVisible)
	}

	return (
		<div>
			<Button variant={"success"} onClick={ToggleView}>Naar {AdminVisible ? "Gerechten" : "Bestellingen"} overzicht</Button>
			{AdminVisible ? <BestellingenOverzicht/> : <DishList/>}
		</div>
	)
}

