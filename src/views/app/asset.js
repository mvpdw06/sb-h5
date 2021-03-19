import { Loader } from 'pixi.js'
import * as assets from '@app/assets'

let textureTask

function loadTextures() {
  if (!textureTask) {
    const loader = new Loader()
    const textureIds = Object.keys(assets)
    for (const id of textureIds) loader.add(id, assets[id])
    textureTask = new Promise((resolve, reject) => {
      const errorId = loader.onError.add(reject)
      loader.load((loader, resources) => {
        loader.onError.detach(errorId)
        const textures = {}
        for (const id of textureIds) textures[id] = resources[id].texture
        resolve(textures)
      })
    })
  }
  return textureTask
}

export default { loadTextures }
