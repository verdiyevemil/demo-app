import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note } from './models/note.model';
import { getNotes } from './reducers/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public notes: Note[] = [
    { id: 1, name: 'Note 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id turpis in ligula rhoncus elementum.', date: '02.05.2009' },
    { id: 2, name: 'Note 2', text: 'Phasellus eget arcu metus. Sed id nisl pharetra, tempor mauris sit amet, dapibus nunc. ', date: '09.19.2018' },
    { id: 3, name: 'Note 3', text: 'Quisque in turpis eros. Morbi convallis ac sapien sit amet pharetra.', date: '01.18.2019' },
    { id: 4, name: 'Note 4', text: 'At laoreet nisl scelerisque. Duis rutrum elit at metus aliquet, blandit lobortis libero dictum. ', date: '02.12.2020' }
  ]

  constructor(private store:Store){}

  ngOnInit(): void {
    this.store.dispatch(getNotes({notes: this.notes}));
  }

}
