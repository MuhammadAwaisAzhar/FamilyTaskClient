import { Router } from '@angular/router';
import { TaskSharedService } from './../services/task-shared.service';
import { IMember } from './../interface/member/imember';
import { MemberService } from './../services/member.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { AllValidationErrors } from '../interface/allValidationErrors';
import { getFormValidationErrors } from '../helper/get-form-validation-errors';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  errors: AllValidationErrors[] = [];
  members:IMember[]=[];
  MemberForm = new FormGroup({
    fName: new FormControl(null, [Validators.required]),
    lName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    roles: new FormControl(null, [Validators.required]),
    avatar:new FormControl("red",[Validators.required])
  });
  constructor(
    private formBuilder: FormBuilder,
    private memberService:MemberService,
    private sharedService:TaskSharedService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  addMember(): void {
    
    this.errors = [];
    if (this.MemberForm.valid) {
      var form = this.MemberForm;
      var obj: IMember={
        memberId:"",
        firstName:form.value.fName,
        lastName:form.value.lName,
        email:form.value.email,
        roles:form.value.roles,
        avatar:form.value.avatar,
      };
      this.add(obj);
    } else {
      this.errors = getFormValidationErrors(this.MemberForm);
      console.log(this.errors)
    }
  }
  add(data: IMember) {
    this.memberService.addMember(data).subscribe((data) => {
      this.ResetValues();
      location.reload();
        });
  }
  get(){
    this.memberService.getMembers().subscribe((data) => {
     this.members=data;
    });

  }
  ResetValues() {
    this.errors = [];
    this.MemberForm.reset();
  }
}
