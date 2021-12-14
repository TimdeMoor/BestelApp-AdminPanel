import './App.css';

import { Container } from 'react-bootstrap';
import DishList from './components/DishList';

function App() {

    return (
        <div className="App">
            <Container className="p-3">
                <DishList dishes={[
                    {
                        id: 1,
                        name: 'testDish1',
                        price: 1.50
                    },
                    {
                        id: 2,
                        name: 'testDish2',
                        price: 2.50
                    },
                    {
                        id: 3,
                        name: 'testDish3',
                        price: 3.50
                    }
                ]}/>
            </Container>
        </div>
    );
}

export default App;
