export function hasChildren (element: Element | null): boolean {
  return !!element?.querySelector('* [data-focus-with-keyboard="true"]')
}
