import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getNotes } from './reducers/note';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  notes$ = createEffect(() => this.actions$.pipe(
    ofType(getNotes),
    map(() => { 
      getNotes({notes: []})
    })
  ), { dispatch: false })
}
