import { HttpHeaders } from '@angular/common/http';

export class Constants {
  public static baseUrl = "https://localhost:44366";
  
  public static currentUrl = "";
  public static httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  
}
