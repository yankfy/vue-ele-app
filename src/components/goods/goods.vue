<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      
    </div>
  </div>
</template>

<script>
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this.$http.get('/api/goods').then(res => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.goods = res.data
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="scss" scoped>
@import '../common/scss/mixin';
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    width: 80px;
    flex-basis: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      margin: 0 auto;
      line-height: 14px;
      font-size: 0;
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
        &.decrease {
          @include bg-image('./images/decrease_3');
        }
        &.discount {
          @include bg-image('./images/discount_3');
        }
        &.guarantee {
          @include bg-image('./images/guarantee_3');
        }
        &.invoice {
          @include bg-image('./images/invoice_3');
        }
        &.special {
          @include bg-image('./images/special_3');
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child{
          border-bottom: none;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    background-color: #fff;
  }
}
</style>