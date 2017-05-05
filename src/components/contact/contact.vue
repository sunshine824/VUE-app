<template>
  <div id="contact">
    <section>
      <div class="weui-cells_contact-head weui-cells weui-cells_access" style="margin-top:-1px">
        <router-link to="/contact/new-friends" class="weui-cell">
          <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-friend-notify.png"> </div>
          <div class="weui-cell_bd weui-cell_primary">
            <p>新的朋友</p>
          </div>
        </router-link>
        <router-link to="/contact/group-list" class="weui-cell">
          <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-addgroup.png"> </div>
          <div class="weui-cell_bd weui-cell_primary">
            <p>群聊</p>
          </div>
        </router-link>
        <router-link to="/contact/tags" class="weui-cell">
          <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-tag.png"> </div>
          <div class="weui-cell_bd weui-cell_primary">
            <p>标签</p>
          </div>
        </router-link>
        <router-link to="/contact/official-accounts" class="weui-cell">
          <div class="weui-cell_hd"><img class="img-obj-cover" src="../../assets/images/contact_top-offical.png"></div>
          <div class="weui-cell_bd weui-cell_primary">
            <p>公众号</p>
          </div>
        </router-link>
      </div>
      <!--联系人集合-->
      <template v-for="(value,key) in contactsList">
        <!--首字母-->
        <div class="weui-cells__title letter">{{key}}</div>
        <div class="weui-cells">
          <router-link :key="item.wxid" :to="{path:'/contact/details',query:{wxid:item.wxid}}" class="weui-cell weui-cell_access" v-for="item in value" tag="div">
            <div class="weui-cell__hd">
              <img :src="item.headerUrl" class="home__mini-avatar___1nSrW" />
            </div>
            <div class="weui-cell__bd">
              {{item.remark?item.remark:item.nickname}}
            </div>
          </router-link>
        </div>
      </template>
    </section>
    <!--首字母排序 后期需要实现检索功能-->
    <div class="initial-bar"><span v-for="i in contactsInitialList" @click="scroll($event)">{{i}}</span></div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        "pageName":'通讯录'
      }
    },
    mounted(){
      this.$store.commit('toggleTipsStatus',-1)
    },
    activated() {
      this.$store.commit("toggleTipsStatus", -1)
    },
    computed:{
      contactsInitialList(){
        return this.$store.getters.contactsInitialList
      },
      contactsList(){
        return this.$store.getters.contactsList
      }
    },
    methods:{
      scroll(e){
        var chooseLetter=e.target.innerHTML,
            oldScrollTop=document.body.scrollTop, //当前滚动高度
            newScrollTop,
            lettersDOM=document.querySelectorAll('#contact .letter'),
            bodyHeight=document.body.scrollHeight, //获取文档高度
            screenHeight=window.screen.height, //获取屏幕高度
            scrollable=bodyHeight-screenHeight, //可滚动区域高度
            contact=document.querySelector('.app-content');

        lettersDOM.forEach(function(value,key){
          if(value.innerHTML==chooseLetter){
            newScrollTop=value.offsetTop //选中字母距离文档高度

            var time=setInterval(function(){
              if(newScrollTop>oldScrollTop){  //下滚动
                document.body.scrollTop=document.body.scrollTop+10
                if(document.body.scrollTop>=value.offsetTop+85 || document.body.scrollTop>=scrollable){
                  clearInterval(time)
                }
              }else{  //上滚动
                document.body.scrollTop=document.body.scrollTop-10
                if(document.body.scrollTop<=value.offsetTop+85 || document.body.scrollTop<=0){
                  clearInterval(time)
                }
              }

            },1)
          }
        })
      }
    }
  }
</script>
<style>
  @import "../../assets/css/contact.css";
</style>
