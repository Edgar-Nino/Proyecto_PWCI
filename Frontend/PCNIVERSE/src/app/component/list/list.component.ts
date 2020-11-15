import { Component, OnInit } from '@angular/core';
import {ListsService} from '../../services/lists.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public listsService : ListsService) { }

  ngOnInit(): void {
  }

  getLists()
  {
    this.listsService.getLists().subscribe(
      res=>{
        this.listsService.lists = res;
      },
      err => {console.error(err)}
    )
  }

}
