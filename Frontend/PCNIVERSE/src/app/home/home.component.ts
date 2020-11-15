import { Component, OnInit } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { List } from "../models/lists";

import { environment } from "../../environments/environment";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lists : List[];
  url: string
  constructor(private listsService: ListsService) { 
    this.url= environment.url_img
  }

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void{
    this.listsService.getLists().subscribe(
      list => {
        this.lists = list;
        list.map(val=>{
          val.createdAt=val.createdAt.replace('T',' ').slice(0,-5)
        }) 
        console.log(list)}
    )
  }
}
