<template>
  <!--重复性高，数据交互比较频繁-->
  <div id="wx-header">

    <!--右上角图标-->
    <div class="other">
      <!--只在“微信”页显示 更多图标-->
      <span class="iconfont icon-tips-jia" v-show="$route.path==='/'" @click="$store.commit('toggleTipsStatus')"></span>
      <!--只在“通讯录”页显示 显示添加好友图标-->
      <router-link tag="span" to="/contact/add-friend" class="iconfont icon-tips-add-friend" v-show="$route.path==='/contact'"></router-link>
      <!--只在“添加朋友”页显示 -->
      <span v-show="$route.path==='/contact/new-friends'">添加朋友</span>
      <!--下面这个好像有些多余 sad -->
      <span class="iconfont icon-chat-friends" v-show="$route.path==='/wechat/dialogue'"></span>
      <!-- 更多图标的菜单 附带过渡效果-->
      <ul class="tips-menu" :class="[$store.state.tipsStatus ? 'tips-open' : 'tips-close']" @click="$store.commit('toggleTipsStatus',-1)">
        <li>
          <span class="iconfont icon-tips-xiaoxi"></span>
          <div>发起群聊</div>
        </li>
        <router-link tag="li" to="/contact/add-friend">
          <span class="iconfont icon-tips-add-friend"></span>
          <div>添加朋友</div>
        </router-link>
        <li>
          <span class="iconfont icon-tips-saoyisao"></span>
          <div>扫一扫</div>
        </li>
        <li>
          <span class="iconfont icon-tips-fukuan"></span>
          <div>收付款</div>
        </li>
      </ul>
    </div>

    <!--标题显示文字-->
    <div class="center">
      <!--显示当前页面标题-->
      <span>{{$store.state.currentPageName}}</span>
      <!--微信群 显示群名以及成员人数-->
      <!--<span class="parentheses"></span>-->
    </div>

  </div>
</template>
<script>
  export default {
    props:["pageName"],
    data(){
      return {
        //暂时用不到
        chatCount:true
      }
    },
    methods:{
      //暂时用不到
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>
