<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller='seller'/>
    </div>

  </div>
</template>

<script>
import header from '@/components/header/header'
const ERR_OK = 0
export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then(res => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.seller = res.data
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="scss">
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>