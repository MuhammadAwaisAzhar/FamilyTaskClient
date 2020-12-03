import { IMember } from './../interface/member/imember';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()

export class TaskSharedService {
  constructor() { 
    
  }
  private member = new ReplaySubject<any>();
  setMember(data:IMember){
      this.member.next(data);
  }
  getSubject():Observable<any>{
    return this.member.asObservable();
  }
  private members = new ReplaySubject<any>();
  setList(data:IMember[]){
    this.members.next(data);
  }
  getList():Observable<any>{
    return this.members.asObservable();
  }
  


}
