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
			<Button data-testid={"adminButton"} variant={"success"} onClick={ToggleView}>Naar {AdminVisible ? "bestellingen" : "gerechten"} overzicht</Button>
			{AdminVisible ? <DishList/> : <BestellingenOverzicht bestellingen={[]}/>}
		</div>
	)
}

