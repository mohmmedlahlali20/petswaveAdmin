import React from "react";

export interface User {
    _id?:string
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    password: string;
    role:string
    isVerified:boolean
}


export interface Category {
    _id: string
    name: string
}

export interface Pets {
    _id?: string
    name: string
    description: string
    gender: string
    age: number
    category: string
    images: string[]
    Prix: number
    isAvailable: boolean
}



export interface Commands {
    _id?: string
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

export interface  NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
}
