import { render, screen } from '@testing-library/react';
import App from './App';
import MainPage from "./components/MainPage";
import BestellingenOverzicht from "./components/bestellingenOverzicht";
import {Order} from "./components/Entities";
import DishList from "./components/DishList";

test('render admin text', () => {
  render(<App />);
  const adminElement = screen.getByText("Admin");
  expect(adminElement).toBeInTheDocument();
});

test('toggle admin mode', () => {
  render(<App />);
  const buttonElement = screen.getByText("Naar gerechten overzicht");
  expect(buttonElement).toBeInTheDocument();

  buttonElement.click()

  const buttonElement2 = screen.getByText("Naar bestellingen overzicht");
  expect(buttonElement2).toBeInTheDocument();
});

test('integrationtest gerechtenoverzicht en main pagina', () => {
  render(<MainPage/>)
  const gerechtenOverzichtElement = screen.getByText("Naar gerechten overzicht")
  expect(gerechtenOverzichtElement).toBeInTheDocument()
});

test('integrationtest bestellingen', () => {
  const testOrder1:Order = {
    id: 1, isComplete: false, tableId: 1, totalPrice: 0
  }
  const testOrder2:Order = {
    id: 2, isComplete: false, tableId: 2, totalPrice: 0
  }
  const testOrder3:Order = {
    id: 3, isComplete: false, tableId: 3, totalPrice: 0
  }

  render(<BestellingenOverzicht bestellingen={[testOrder1, testOrder2, testOrder3]}/>)

  const bestellingElement1 = screen.getByTestId(`Bestelling ${testOrder1.id}`)
  const bestellingElement2 = screen.getByTestId(`Bestelling ${testOrder2.id}`)
  const bestellingElement3 = screen.getByTestId(`Bestelling ${testOrder3.id}`)

  expect(bestellingElement1).toBeInTheDocument()
  expect(bestellingElement2).toBeInTheDocument()
  expect(bestellingElement3).toBeInTheDocument()
});

test('integrationtest add gerecht', () => {
  render(<DishList/>)

  //klik toevoegen button
  const toevoegButtonElement = screen.getByText("Toevoegen") as HTMLButtonElement
  toevoegButtonElement.click()

  //simuleer naam input
  const naamTextBoxElement = screen.getByTestId("inputNaam") as HTMLInputElement
  naamTextBoxElement.value = "TestGerecht"

  //simuleer prijs input
  const prijsTextBoxElement = screen.getByTestId("inputPrijs") as HTMLInputElement
  prijsTextBoxElement.value = "2"

  //druk op toevoegen knop
  const toevoegenButtonElement = screen.getByTestId("toevoegenButton") as HTMLButtonElement
  toevoegenButtonElement.click()

  //check of het nieuwe gerecht in de lijst staat
  const dishElement = screen.getByDisplayValue("TestGerecht")
  expect(dishElement).toBeInTheDocument()
});
