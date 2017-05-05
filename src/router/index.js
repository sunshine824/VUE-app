import Vue from 'vue'
import Router from 'vue-router'
import wechat from '../components/wechat/wechat.vue'
import dialogue from '../components/wechat/dialogue.vue'

Vue.use(Router)
//app整体由店面页和店内页组成 暂时并没有用到嵌套路由
const routes = [
  {
    path: '/',
    name: "微信",
    component: resolve => require(["../components/wechat/wechat.vue"], resolve)
  },
  {
    path: '/wechat/dialogue',
    name: "",
    components: {
      "default": resolve => require(["../components/wechat/wechat.vue"], resolve),
      "subPage": resolve => require(["../components/wechat/dialogue.vue"], resolve)
    }
  },
  {
    path: '/wechat/dialogue/dialogue-detail',
    name: "",
    components: {
      "subPage": resolve => require(["../components/wechat/dialogue-detail.vue"], resolve)
    }
  },
  {
    path: '/wechat/dialogue/dialogue-info',
    name: "",
    components: {
      "subPage": resolve => require(["../components/wechat/dialogue-info.vue"], resolve)
    }
  },
  {
    path: '/contact',
    name: "通讯录",
    component: resolve => require(["../components/contact/contact.vue"], resolve)
  },
  {
    path: '/contact/add-friend',
    name: "",
    components: {
      "default": resolve => require(["../components/contact/contact.vue"], resolve),
      "subPage": resolve => require(["../components/contact/add-friend.vue"], resolve)
    }
  },
  {
    path: '/contact/details',
    name: "",
    components: {
      "default": resolve => require(["../components/contact/contact.vue"], resolve),
      "subPage": resolve => require(["../components/contact/details.vue"], resolve)
    }
  },
  {
    path: '/explore',
    name: "发现",
    component: resolve => require(["../components/explore/explore.vue"], resolve)
  },
  {
    path: '/self',
    name: "我",
    component: resolve => require(["../components/self/self.vue"], resolve)
  },
]
export default new Router({
  base: "/",
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //     if (savedPosition) {
  //         return savedPosition
  //     } else {
  //         return { x: 0, y: 0 }
  //     }
  // }

})
