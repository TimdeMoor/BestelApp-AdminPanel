export interface Dish {
    id: number,
    name: string,
    price: number,
}

export interface Order {
    id: number,
    tableId: number,
    totalPrice: number,
    isComplete: boolean,
}

export interface Table {
    id: number,
    capacity: number,
}

export interface OrderItem {
    id: number,
    dishId: number,
    orderId: number,
    amount: number,
    comment: string,
}
