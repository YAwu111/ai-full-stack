import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {UserState} from '../type/user';

export interface UserLoginState{
    isLoggin:boolean;
    login:(user:UserState)=>void;
    logout:()=>void;
    user:UserState|null;
}

const useUserStore = create<UserLoginState>()(
    persist(
        (set,get)=>({
            isLoggin:false,
            login:(user:UserState)=>set({isLoggin:true,user}),
            logout:()=>set({isLoggin:false,user:null}),
            user:null
        }),{
            name:'user'
        }
    )
)

export default useUserStore;