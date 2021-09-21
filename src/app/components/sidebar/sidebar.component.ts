import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit { 
  public notes: Note[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getNotes();
  }

  public getNotes(){
    let notes = localStorage.getItem('notes');
    if(notes) {
      this.notes = JSON.parse(notes);
    }
  }

}
