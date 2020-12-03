import { TaskSharedService } from './../../services/task-shared.service';
import { TaskService } from './../../services/task.service';
import { ITask } from './../../interface/task/itask';
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { HttpResponseBase } from '@angular/common/http';
import { IMember } from './../../interface/member/imember';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  members: IMember[] = [];
  
  constructor(
    private memberService:MemberService,
    private taskService:TaskService,
    private router: Router,
    private taskShared:TaskSharedService
  ) { 
    this.getAllMembers();
  }

  ngOnInit(): void {
    this.getAllMembers()
  }
  getAllMembers(): void {
   this.memberService.getMembers()
      .subscribe((data) => {
         this.members = data;
         this.taskShared.setList(data);
      });
  }
  
  onDrop(event:DndDropEvent,id:string) {
  console.log("memberId",id);
  let task:ITask;
  task=event.data;
  task.assignedMemeberId=id;
  this.assignmentOfTask(task)
   // console.log("dropped", event.data);
  }
  assignmentOfTask(data: ITask){
    this.taskService.assignTaskToMember(data).subscribe((data) => {
      
      this.ResetValues();
  });
  
}  
setMemberAndRedirect(data:IMember):void{
  this.taskShared.setMember(data);
  this.router.navigate(['memberTasks', data.memberId]);
}
ResetValues() {
    throw new Error('Method not implemented.');
  }
}
