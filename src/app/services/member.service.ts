import { IMember } from './../interface/member/imember';
import { BaseService } from './base-service.service';
import { ApiResponse } from './../interface/apiResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Constants } from '../helper/constants';
import { tap, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MemberService  extends BaseService{
  constructor(private http: HttpClient) {
      super();
  }
  addMember(user: IMember): Observable<boolean> {
    return this.http
      .post<boolean>(
        `${Constants.baseUrl}/api/Members`,
        user,
        Constants.httpOptions
      )
      .pipe(
        tap(() => this.log("Member Added")),
        catchError(this.handleError<boolean>("Error Members Loading"))
      );
  } // End
  getMembers(): Observable<IMember[]> {
    return this.http
      .get<IMember[]>(
        `${Constants.baseUrl}/api/Members`
      )
      .pipe(
        tap(
          () => this.log("Loading Complete"),
          catchError(this.handleError<IMember[]>("Loading Error"))
        )
      );
  }
  getMemberWithTaskList(id:string): Observable<IMember> {
    return this.http
      .get<IMember>(
        `${Constants.baseUrl}/api/<Members>/${id}`
      )
      .pipe(
        tap(
          () => this.log("Loading Complete"),
          catchError(this.handleError<IMember>("Loading Error"))
        )
      );
  }
}
