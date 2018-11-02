import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './Skateboard.scss'

export default class Skateboard extends Component {

  state = {
    leftdown: 1,
    toucheMonitor: {}
  }

  touchStart = (option) =>{
    let {pageX, pageY} = option.touches[0]
    this.state.toucheMonitor= {pageX, pageY}
    console.log(this.state.toucheMonitor)
  }

  touchEnd = (option) => {
    console.log(option)
    let {pageX, pageY} = option.changedTouches[0]
    let itemStartPi = this.state.toucheMonitor

    if(itemStartPi.pageX - pageX > 100) {
      console.log('向左边滑动了')
      this.setState( {'leftdown': 2} )
      let that = this
      setTimeout(()=>{
        that.setState( {'leftdown': 3} )
      }, 1500)
    }
  }

  getItemClassName= () =>{
    let resultClass = ''
    if(this.state.leftdown == 2) resultClass = 'animated bounceOutLeft slow';
    else if(this.state.leftdown ==3) resultClass = 'delete'
    return resultClass;
  }


  render () {
    return (
      <View 
        onTouchStart={this.touchStart} 
        onTouchEnd={this.touchEnd} 
        style={{width:'100%', height: 'auto'}}
        className={this.getItemClassName()}>
         {this.props.children}
      </View>
    )
  }
}

