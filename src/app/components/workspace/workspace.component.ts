import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Note } from 'src/app/models/note.model';
import { deleteNote, editNote, selectedNoteSelector } from 'src/app/reducers/note';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  selectedNote$:Observable<Note | null>  = this.store.select(selectedNoteSelector);
  form:FormGroup = new FormGroup({});
  showEditor: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private store:Store, public fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: null
    });
    this.subscriptions.push(this.selectedNote$.subscribe(value => { 
      this.form.controls.text.patchValue(value?.text);
    })); 
    this.subscriptions.push(this.form.controls.text.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => { 
      this.store.dispatch(editNote({ text: value }));
    }));
  }

  delete(){ 
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.selectedNote$,
      minWidth: 320
    }); 
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(deleteNote());
        this.showEditor = false;
      } 
    });
  }

  edit(){  
    this.showEditor = true;
  } 

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
