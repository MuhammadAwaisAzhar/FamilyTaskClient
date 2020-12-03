import { Router } from '@angular/router';
import { TaskSharedService } from './../services/task-shared.service';
import { IMember } from './../interface/member/imember';
import { ITask } from './../interface/task/itask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormValidationErrors } from '../helper/get-form-validation-errors';
import { AllValidationErrors } from '../interface/allValidationErrors';
import { TaskService } from '../services/task.service';
import { MemberService } from '../services/member.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  errors: AllValidationErrors[] = [];
  tasks:ITask[]=[];
  members:IMember[]=[];
  clickEventsubscription:Subscription;
  TaskForm = new FormGroup({
    subject: new FormControl(null, [Validators.required])
  });
  constructor(
    private formBuilder: FormBuilder,
    private taskService:TaskService,
    private memberService:MemberService,
    private sharedService:TaskSharedService,
    private router:Router
  ) { 
    this.clickEventsubscription= this.sharedService.getList().subscribe((data)=>{
      this.members=data;
      })   
    this.get();
  }

  ngOnInit(): void {
    this.clickEventsubscription= this.sharedService.getList().subscribe((data)=>{
      this.members=data;
      })   
    this.get();
  }
  addTask(): void {
    
    this.errors = [];
    if (this.TaskForm.valid) {
      var form = this.TaskForm;
      var obj: ITask={
        taskId:"",
        subject:form.value.subject,
        isComplete:false,
      };
      this.add(obj);
    } else {
      this.errors = getFormValidationErrors(this.TaskForm);
      console.log(this.errors);
    }
  }
  add(data: ITask) {
    this.taskService.addTask(data).subscribe((data) => {
      this.get();
        this.ResetValues();
    });
  }
  get(){
    var  that=this;
    that.taskService.getTasks().subscribe((data) => {
    that.tasks=data;
      that.tasks.forEach(function(obj){
        that.members.filter(filterMember=>{
          if(obj.assignedMemeberId==filterMember.memberId){
            obj.memberAvatar=filterMember.avatar;
          }
        })
      })
  });
  }
  getMemebers(){
    this.members=[];
    this.memberService.getMembers().subscribe((data) => {
      this.members=data;
     });
  }
  assignmentOfTask(data: ITask){
    this.taskService.assignTaskToMember(data).subscribe((data) => {
      this.ResetValues();
  });
  }
  
  ResetValues() {
    this.errors = [];
    this.TaskForm.reset();
  }
}
