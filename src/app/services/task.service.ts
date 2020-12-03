import { ITask } from './../interface/task/itask';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Constants } from '../helper/constants';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  constructor(
    private http: HttpClient
    ) { 
    super();
  }
  addTask(task: ITask): Observable<string> {
    return this.http
      .post<string>(
        `${Constants.baseUrl}/api/Tasks`,
        task,
        Constants.httpOptions
      )
      .pipe(
        tap(() => this.log("Member Added")),
        catchError(this.handleError<string>("Error Members"))
      );
  } // End
  getTasks(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(
        `${Constants.baseUrl}/api/Tasks`
      )
      .pipe(
        tap(
          () => this.log("Loading Complete"),
          catchError(this.handleError<ITask[]>("Loading Error"))
        )
      );
  }
  assignTaskToMember(data: ITask): Observable<string> {
    return this.http
      .put<string>(
        `${Constants.baseUrl}/api/Tasks/${data.taskId}/AssignmentOfTask`,
         data,
        Constants.httpOptions
      )
      .pipe(
        tap(() => this.log("Updated Successsfully")),
        catchError(this.handleError<string>("Error in Update Task"))
      );
  }
  getAssignedTaskOfMember(id:string): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(
        `${Constants.baseUrl}/api/Tasks/${id}/GetAssignedTaskOfMember`
      )
      .pipe(
        tap(
          () => this.log("Loading Complete"),
          catchError(this.handleError<ITask[]>("Loading Error"))
        )
      );
  }
  
}

