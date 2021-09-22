import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { Note } from '../models/note.model';
 
export const getNotes = createAction('[NOTE] get', props<{ notes: Note[] }>()); 
export const selectNote = createAction('[NOTE] select', props<{ selectedNote: Note }>()); 
export const deleteNote = createAction('[NOTE] delete'); 
export const editNote = createAction('[NOTE] edit', props<{ text: string }>()); 
export const filterNotes = createAction('[NOTE] filter', props<{ searchText: string }>()); 

export interface NoteState {
    notes: Note[],
    selectedNote: Note | null,
    filteredNotes: Note[],
}

export const initialNoteState: NoteState = { 
    notes: [],
    selectedNote: null,
    filteredNotes: []
}
 
export const noteReducer = createReducer(
    initialNoteState, 
    on(getNotes, (state, action) => ({ 
        ...state, 
        notes: action.notes,
        filteredNotes: action.notes,
    })),
    on(selectNote, (state, action) => ({ 
        ...state, 
        selectedNote: action.selectedNote 
    })),
    on(deleteNote, (state, action) => ({ 
        ...state, 
        notes: state.notes.filter(note => note.id !== state.selectedNote!.id),
        filteredNotes: state.notes.filter(note => note.id !== state.selectedNote!.id),
        selectedNote: null
    })),
    on(editNote, (state, action) => ({ 
        ...state,  
        notes: state.notes.map(note => note.id === state.selectedNote?.id ? {
            ...note,
            text: action.text,
            date: new Date().toString()
        } : note),
        filteredNotes: state.notes.map(note => note.id === state.selectedNote?.id ? {
            ...note,
            text: action.text,
            date: new Date().toString()
        } : note),
        selectedNote:  state.selectedNote ? {
            id: state.selectedNote!.id,
            name: state.selectedNote!.name,
            text: action.text,
            date: new Date().toString()
        } : null
    })),
    on(filterNotes, (state, action) => ({ 
        ...state,  
        filteredNotes: state.notes.filter(note => note.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1) 
    })),     
);

export const featureSelector = createFeatureSelector<NoteState>('note');
export const notesSelector = createSelector(
    featureSelector,
    state => state.notes
)
export const selectedNoteSelector = createSelector(
    featureSelector,
    state => state.selectedNote
)
export const filteredNotesSelector = createSelector(
    featureSelector,
    state => state.filteredNotes
)