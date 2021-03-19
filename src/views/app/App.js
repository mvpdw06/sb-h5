import { Application } from 'pixi.js'
import MatchListScene from '@app/views/matchList/MatchListScene'
import style from './style'

export default async function App() {
  const matchListScene = await MatchListScene()

  const app = new Application({
    autoStart: false,
    resolution: style.resolution,
    autoDensity: true,
    width: style.width,
    height: style.height,
    backgroundColor: style.backgroundColor
  })
  app.renderIn = renderInElement
  return app

  function renderInElement($element) {
    $element.innerHTML = ''
    $element.appendChild(app.view)
    app.stage.addChild(matchListScene)
    app.start()
  }
}
