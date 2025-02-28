export interface User {
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    password: string;
}


export interface Category {
    _id: any
    name: string
}

export interface Pets {
    _id: string
    name: string,
    description: string,
    gender: string,
    age: number,
    category: Category,
    images: string[],
    Prix: number,
    isAvailable: boolean
}


export interface Commands {
    _id: string
    petsId: Pets,
    userId: User,
    status: Status,
    orderDate: Date,
    totalAmount: number
}


export enum Status {
    Pending = "pending",
    InProgress = "InProgress",
    Completed = "completed",
    Cancelled = "cancelled"
}
