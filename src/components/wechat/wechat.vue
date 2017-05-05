<template>
  <!--微信组件-->
  <div id="wechat" v-refresh>
    <ul class="wechat-list">
      <!--props传递信息对象 baseMsgObj-->
      <msg-item v-for="baseMsgObj in $store.state.msgList.baseMsg" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.mid"></msg-item>
    </ul>
  </div>
</template>
<script>
  import search from "../common/search"
  import msgItem from "../wechat/msg-item"
  export default {
    components:{
      search,
      msgItem
    },
    //mixins: [window.mixin],
    data(){
      return{
        "pageName":'微信',
      }
    },
    directives:{
    refresh:{
      bind(el,binding){
        var startTy,isPullMove
        el.addEventListener('touchstart',function(e){
          startTy=e.touches[0].clientY
        },false)
        el.addEventListener('touchmove',function(e){
          var endTy= e.changedTouches[0].clientY,
            distance=endTy-startTy;
          if(distance>20){ //下拉
            el.style.marginTop=45+'px'
            /*if(Math.abs(distance)<=45){
             el.style.marginTop=distance+'px'
             }else{
             el.style.marginTop=45+'px'
             }*/
          }else{ //上拉
            /*el.style.transition='0.3s'
             el.style.marginTop=-45+'px'*/
            /*if(Math.abs(distance)<=45){
             el.style.marginTop=distance+'px'
             }else{
             el.style.marginTop=-45+'px'
             }*/
          }
        },false)
        el.addEventListener('touchend',function(e){
          setTimeout(function(){
            el.style.marginTop=0
          },1000)
        })
      }
    }
  }
  }
</script>
<style>
  @import "../../assets/css/wechat.css";
  #wechat{
    transition: all 0.4s;
  }
</style>
