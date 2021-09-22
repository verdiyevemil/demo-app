import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterNotes } from 'src/app/reducers/note';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  searchText:any;
  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  public filter(){ 
    this.store.dispatch(filterNotes({ searchText: this.searchText}));
  }

}
