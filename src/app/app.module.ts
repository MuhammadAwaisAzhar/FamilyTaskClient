import { TaskSharedService } from './services/task-shared.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { TaskComponent } from './task/task.component';
import { Routes, RouterModule } from '@angular/router';
import { TaskOfMemberComponent } from './task-of-member/task-of-member.component';
import { DndModule  } from 'ngx-drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    MemberComponent,
    TaskComponent,
    TaskOfMemberComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    DndModule 
  ],
  providers: [TaskSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
