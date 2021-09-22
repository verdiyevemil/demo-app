import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { noteReducer, NoteState } from './note';

export interface State {
  note: NoteState
}

export const reducers: ActionReducerMap<State> = {
  note: noteReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
