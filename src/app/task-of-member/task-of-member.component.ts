import { IMember } from './../interface/member/imember';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormValidationErrors } from '../helper/get-form-validation-errors';
import { AllValidationErrors } from '../interface/allValidationErrors';
import { ITask } from '../interface/task/itask';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from "@angular/router";
import { TaskSharedService } from '../services/task-shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-of-member',
  templateUrl: './task-of-member.component.html',
  styleUrls: ['./task-of-member.component.css']
})
export class TaskOfMemberComponent implements OnInit {
  errors: AllValidationErrors[] = [];
  clickEventsubscription:Subscription;
  member:IMember=null;
  tasks:ITask[]=[];
  memberId:string;
  TaskForm = new FormGroup({
    subject: new FormControl(null, [Validators.required])
  });
  
  constructor( 
    private formBuilder: FormBuilder,
    private taskService:TaskService,
    private route: ActivatedRoute,
    private taskShared:TaskSharedService) { 
      this.clickEventsubscription= this.taskShared.getSubject().subscribe((data)=>{
        this.member=data;
        this.get(data.memberId);
        }) 
        
    }

  ngOnInit(): void {
    this.clickEventsubscription= this.taskShared.getSubject().subscribe((data)=>{
      this.member=data;
         this.get(data.memberId);
         })    
     }
  
  addTask(): void {
    
    this.errors = [];
    if (this.TaskForm.valid) {
      var form = this.TaskForm;
      var obj: ITask={
        taskId:"",
        subject:form.value.subject,
        isComplete:false,
        assignedMemeberId:this.memberId
      };
      this.add(obj);
    } else {
      this.errors = getFormValidationErrors(this.TaskForm);
      
    }
  }
  add(data: ITask) {
    this.taskService.addTask(data).subscribe((data) => {
        this.ResetValues();
        this.get(this.memberId);
    });
  }
  get(id:string){
    this.memberId=id;
    this.tasks=null;
    this.taskService.getAssignedTaskOfMember(id).subscribe((data) => {
      this.tasks=data;
  });

}

ResetValues() {
  this.errors = [];
  this.TaskForm.reset();
}
}
