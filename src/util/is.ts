export const isDomBlock = (element: Element) => {
  const styles = [
    'block',
    'flex',
    'grid',
    'table',
    "table-row-group'",
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-cell',
    'table-column-group',
    'table-column',
    'table-caption',
    'list-item'
  ]

  const elStyle = window.getComputedStyle(element).display
  return styles.some((item) => item === elStyle)
}

const opt = Object.prototype.toString
export const isArray = (obj: any) => {
  return opt.call(obj) === '[object Array]'
}
