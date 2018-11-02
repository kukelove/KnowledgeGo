import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions/counter'
import './index.scss'
import Skateboard from '../../components/Skateboard/Skateboard'

function mapStateToProps(state) {
  return {
    counter: state.counter.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
   
    touchItemMoniMap: {
    },
    leftdown: 1
  }

  componentWillMount () {
    console.log('page willmount')
  }

  componentDidMount () {
    console.log('page didmount')
  
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goto = () => {
    Taro.navigateTo({
      url: '/pages/index2/index?sd=1'
    })
  }
  touchStart = (option) =>{
    let {pageX, pageY} = option.touches[0]
    this.state.touchItemMoniMap['item'] = {pageX, pageY}
    console.log(this.state.touchItemMoniMap['item'])
  }

  touchEnd = (option) => {
    console.log(option)
    let {pageX, pageY} = option.changedTouches[0]
    let itemStartPi = this.state.touchItemMoniMap['item']

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
    let resultClass = 'item'
  
    if(this.state.leftdown == 2) resultClass = 'item animated bounceOutLeft slow';
    else if(this.state.leftdown ==3) resultClass = 'delete'
    return resultClass;
  }

  render () {
    const { add, minus, asyncAdd } = this.props
    console.log(this.getItemClassName())
    return (
      <View className='page'>
        <View className='header_black'>
          <View className='header_tip'>
            <View className='header_tip_title'><Text>看板提示</Text></View>
            <View><Text>掌握的基础是各项指标达到，请严格执行</Text></View>
          </View>
        </View>  
        <ScrollView className='scroll_area'>
          {
            [1,2,3,4,5].map((index)=>{
              return <Skateboard key={index}
          >
            <View className='item'>
                <Image className='item_icon' src="https://images.wosaimg.com/83/b35d20387e82df1bdba687b654901def228ce4.png"/>
                <View className='item_content'>
                    <Text className='item_content_title'>Numbers</Text>
                    <Text className='item_content_des'>START LEARNNG TO CODR HERE</Text>
                </View>
            </View>
          </Skateboard>
            })
          }
        </ScrollView>
      </View>
    )
  }
}
