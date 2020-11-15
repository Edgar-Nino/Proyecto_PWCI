import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { List } from "../models/lists";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  URL_API = "http://localhost:4000/api/lists/"

  lists : List[];

  constructor(private http: HttpClient){}  

  getLists():Observable<List[]>{
    return this.http.get<List[]>(this.URL_API);
  }

}
