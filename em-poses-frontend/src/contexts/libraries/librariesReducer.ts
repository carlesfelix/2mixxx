import { Action, State } from './types';

export default function librariesReducer(state: State, action: Action): State {
  switch(action.type) {
    case 'getLibrariesInProgress':
      return {
        ...state,
        libraries: { data: [], inProgress: true, error: false }
      };
    case 'getLibrariesSuccess':
      return {
        ...state,
        libraries: {
          data: action.payload.libraries,
          inProgress: false,
          error: false
        }
      };
    case 'getLibrariesError':
      return {
        ...state,
        libraries: { data: [], inProgress: false, error: true }
      };
    case 'openAddLibraryDialog':
      return {
        ...state,
        addLibraryDialog: { inProgress: false, isOpen: true }
      };
    case 'closeAddLibraryDialog':
      return {
        ...state,
        addLibraryDialog: { inProgress: false, isOpen: false }
      };
    case 'addLibraryInProgress':
      return {
        ...state,
        addLibraryDialog: { ...state.addLibraryDialog, inProgress: true }
      };
    case 'addLibrarySuccess':
      return {
        ...state,
        libraries: {
          ...state.libraries,
          data: [ ...state.libraries.data, action.payload.library ]
        },
        addLibraryDialog: { inProgress: false, isOpen: false }
      };
    case 'addLibraryError':
      return {
        ...state,
        addLibraryDialog: { ...state.addLibraryDialog, inProgress: false }
      };
    case 'openEditLibraryDialog':
      return {
        ...state,
        editLibraryDialog: { inProgress: false, data: action.payload.library, isOpen: true }
      };
    case 'closeEditLibraryDialog':
      return {
        ...state,
        editLibraryDialog: { inProgress: false, isOpen: false }
      };
    case 'editLibraryInProgress':
      return {
        ...state,
        editLibraryDialog: { ...state.editLibraryDialog, inProgress: true }
      };
    case 'editLibrarySuccess':
      return {
        ...state,
        libraries: {
          ...state.libraries,
          data: state.libraries.data.map(library => {
            if (library.id === action.payload.library.id) {
              return action.payload.library;
            }
            return library;
          })
        },
        editLibraryDialog: { inProgress: false, isOpen: false }
      };
    case 'editLibraryError':
      return {
        ...state,
        editLibraryDialog: { ...state.editLibraryDialog, inProgress: false }
      };
    case 'openConfirmDeleteDialog':
      return {
        ...state,
        confirmDeleteDialog: { inProgress: false, isOpen: true, data: action.payload.library }
      };
    case 'closeConfirmDeleteDialog':
      return {
        ...state,
        confirmDeleteDialog: { inProgress: false, isOpen: false }
      };
    case 'deleteLibraryInProgress':
      return {
        ...state,
        confirmDeleteDialog: { ...state.confirmDeleteDialog, inProgress: true }
      };
    case 'deleteLibrarySuccess':
      return {
        ...state,
        libraries: {
          ...state.libraries,
          data: state.libraries.data.filter(({ id }) => state.confirmDeleteDialog.data?.id !== id)
        },
        confirmDeleteDialog: { inProgress: false, isOpen: false }
      };
    case 'deleteLibraryError':
      return {
        ...state,
        confirmDeleteDialog: { ...state.confirmDeleteDialog, inProgress: false }
      };
    default:
      return state;
  }
}
