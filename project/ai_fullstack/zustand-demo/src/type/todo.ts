import {create} from 'zustand';
export interface Todo{
    id:number;
    text:string;
    completed:boolean;
}