import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { filteredNotesSelector, notesSelector, selectNote } from 'src/app/reducers/note';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {  
  notes$:Observable<Note[]> = this.store.select(notesSelector);
  filteredNotes$:Observable<Note[]> = this.store.select(filteredNotesSelector);

  constructor(private store:Store) { }

  ngOnInit(): void { } 

  public noteSelected(event:any){ 
    this.store.dispatch(selectNote({selectedNote: event.option.value}));
  }

}
