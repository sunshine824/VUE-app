<template>
  <div class="dialogue">
    <header id="wx-header">
      <div class="other">
        <router-link :to="{path:'/wechat/dialogue/dialogue-info',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-group" v-show="$route.query.group_num&&$route.query.group_num!=1"></router-link>
        <router-link :to="{path:'/wechat/dialogue/dialogue-detail',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-friends" v-show="$route.query.group_num==1"></router-link>
      </div>
      <div class="center">
        <router-link to="/" tag="div" class="iconfont icon-return-arrow">
          <span>微信</span>
        </router-link>
        <span>{{pageName}}</span>
        <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
      </div>
    </header>
    <section class="dialogue-section clearfix" id="dialogue-section">
      <div class="row clearfix" v-for="item in msgInfo.msg">
        <img :src="item.headerUrl" class="header"/>
        <p class="text">{{item.text}}</p>
      </div>
    </section>
    <footer class="dialogue-footer">
      <div class="component-dialogue-bar-person">
        <span class="iconfont icon-dialogue-jianpan" v-show="!currentChatWay" @click="currentChatWay=true"></span>
        <span class="iconfont icon-dialogue-voice" v-show="currentChatWay" @click="currentChatWay=false"></span>
        <div class="chat-way" v-show="!currentChatWay">
          <div class="chat-say" v-press>
            <span class="one">按住 说话</span>
            <span class="two">松开 结束</span>
          </div>
        </div>
        <div class="chat-way" v-show="currentChatWay">
          <input class="chat-txt" type="text" @keyup.enter="addMsg($event)"/>
        </div>
        <span class="expression iconfont icon-dialogue-smile" id="emoji"></span>
        <span class="more iconfont icon-dialogue-jia"></span>
        <div class="recording" id="recording" style="display: none;">
          <div class="recording-voice" id="recording-voice" style="display: none;">
            <div class="voice-inner">
              <div class="voice-icon"></div>
              <div class="voice-volume">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <p>手指上划,取消发送</p>
          </div>
          <div class="recording-cancel" style="display: none;">
            <div class="cancel-inner"></div>
            <p>松开手指,取消发送</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

  import Vue from 'vue'  //在子组件中使用 import Vue from 'vue' 这样的写法引入vue后才能使用

  export default {
    data(){
      return{
        pageName:this.$route.query.name,
        currentChatWay: true, //ture为键盘打字 false为语音输入
        startRecording:false, //是否开始录音
        msg:'',//input输入内容
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit("setPageName", vm.$route.query.name)
      })
    },
    computed: {
      msgInfo() {
        for (var i in this.$store.state.msgList.baseMsg) {
          if (this.$store.state.msgList.baseMsg[i].mid == this.$route.query.mid) {
            return this.$store.state.msgList.baseMsg[i]
          }
        }
      }
    },
    //数据更新调用
    mounted:function(){
      //显示表情包
      $('#emoji').SinaEmotion($('.chat-txt'))
    },
    directives:{
      press:{
        bind(el,binding){
          el.addEventListener('touchstart',function(e){
            var recording=document.querySelector('#recording'),
              recordingVoice=document.querySelector('#recording-voice'),
              recordingCancel=document.querySelector('.recording-cancel')

            recording.style.display=recordingVoice.style.display='block'

            el.className='chat-say say-active'

            // 阻断事件冒泡 防止页面被一同向上滑动
            e.preventDefault()

          },false)
          el.addEventListener('touchend',function(e){
            var recording=document.querySelector('#recording'),
              recordingVoice=document.querySelector('#recording-voice'),
              recordingCancel=document.querySelector('.recording-cancel')

            recording.style.display=recordingVoice.style.display=recordingCancel.style.display='none'

            el.className='chat-say'

            // 阻断事件冒泡 防止页面被一同向上滑动
            e.preventDefault()

          },false)
          el.addEventListener('touchmove',function(e){
            var recording=document.querySelector('#recording'),
              recordingVoice=document.querySelector('#recording-voice'),
              recordingCancel=document.querySelector('.recording-cancel')

            recording.style.display=recordingCancel.style.display='block'
            recordingVoice.style.display='none'

            el.className='chat-say say-active'

            // 阻断事件冒泡 防止页面被一同向上滑动
            e.preventDefault()

          },false)
        }
      }
    },
    methods:{
      //回车新增信息
      addMsg(e){

        //js异常处理 AnalyticEmotion方法代码有缺陷
        try{
          //解析表情
          this.msg=AnalyticEmotion(e.target.value);
        }catch(err){
          this.msg=e.target.value;
        }

        if(this.msg==''){
          return
        }
        //创建html组件
        var html=Vue.extend({
          template:'<div class="row clearfix">' +
                      '<img src="https://sinacloud.net/vue-wechat/images/headers/header01.png" class="header"/>'+
                      '<p class="text">'+this.msg+'</p>'+
                  '</div>'
        })

        //挂载html节点
        var content=new html().$mount();
        document.getElementById('dialogue-section').appendChild(content.$el)

        e.target.value=''
      }
    }
  }

</script>
<style>
  @import "../../assets/css/dialogue.css";
  .say-active {
    background: #c6c7ca;
  }
  #emotions .container a{
    box-sizing:inherit;
  }
  .dialogue-section .row .text{
    display: inline-flex;
  }
</style>
