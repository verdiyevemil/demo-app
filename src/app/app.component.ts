import { Component, OnInit } from '@angular/core';
import { Note } from './models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public notes: Note[] = [
    { id: 1, name: 'Note 1', date: '12.10.2020' },
    { id: 2, name: 'Note 2', date: '12.11.2020' },
    { id: 3, name: 'Note 3', date: '12.12.2020' }
  ]

  ngOnInit(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}
