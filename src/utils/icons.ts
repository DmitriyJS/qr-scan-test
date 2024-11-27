const svgResources = new Map()
const imageResources = new Map()

function loadIcons() {
  const modules = import.meta.glob('@/assets/icons/*.svg', {
    query: 'raw',
    eager: true,
    import: 'default',
  })
  for (const fileName in modules) {
    const name = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length - 4)
    svgResources.set(name, modules[fileName])
  }

  for (const fileName in modules) {
    const name = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length - 4)
    imageResources.set(name, modules[fileName])
  }
}

function getSvgIcon(name: string) {
  return svgResources.get(name)
}

function getImageUrl(name: string) {
  return imageResources.get(name)
}

export { loadIcons, getSvgIcon, getImageUrl, svgResources }
