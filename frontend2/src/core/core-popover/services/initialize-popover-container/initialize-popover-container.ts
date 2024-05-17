export default function initializePopoverContainer (
  id: string
): HTMLDivElement {
  const popoverContainer = window.document.createElement('div')
  popoverContainer.setAttribute('id', id)
  window.document.body.appendChild(popoverContainer)
  return popoverContainer
}
