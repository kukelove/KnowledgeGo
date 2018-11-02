import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'

import Index from './pages/index'

import './app.scss'

import configStore from './store'

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/index2/index'
    ],
    window: {
      backgroundTextStyle: 'black',
      navigationBarBackgroundColor: '#2b59f4',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'light'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
