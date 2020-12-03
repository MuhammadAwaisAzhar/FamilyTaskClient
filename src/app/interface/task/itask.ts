import { IMember } from './../member/imember';
export interface ITask{
    taskId:string,
    subject:string,
    isComplete:boolean,
    assignedMemeberId?:string,
    memberAvatar?:string
}