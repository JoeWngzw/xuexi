import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
      // 封装一个 ajax 方法
      getNewsList(){
          axios.get('http://b9088.com/member/gamecategory/?mode=tree')
              .then(function (response) {
                  console.log('成功');
                  console.log(response.data[0].name);
                  return response.data;
              })
              .catch(function (error) {
                  console.log('错误');
                  console.log(error);
              });
      }
  }
})
