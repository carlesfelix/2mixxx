import { type Modifier } from 'react-popper'

export const sameWidthModifier: Modifier<'sameWidth'> = {
  name: 'sameWidth',
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.getBoundingClientRect().width
    }px`
  }
}
