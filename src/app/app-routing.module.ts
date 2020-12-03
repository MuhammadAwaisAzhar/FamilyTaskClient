import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { TaskOfMemberComponent } from './task-of-member/task-of-member.component';
const routes: Routes = [
  {
  path: "", 
  component: TaskComponent 
},
  {
    path: "members",
    component: MemberComponent,
  },
  {
    path:"memberTasks/:id",
    component:TaskOfMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
