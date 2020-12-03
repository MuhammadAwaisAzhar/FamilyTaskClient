import { ITask } from './../task/itask';
export interface IMember {
    memberId:string ,
    firstName:string ,
    lastName:string,
    email:string,
    roles:string,
    avatar :string
    tasks?:ITask[]
  }
  