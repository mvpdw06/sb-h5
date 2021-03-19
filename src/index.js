import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'normalize.css'
import App from '@app/views/app/App'

dayjs.locale('zh-cn')

const $root = document.querySelector('#root')
App().then(app => app.renderIn($root))
