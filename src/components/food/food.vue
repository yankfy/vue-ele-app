<template>
  <transition name="slideright">
    <div v-show="showFlag" class="food-box" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-warpper">
            <cart-control :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品详情</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.rating"></split>
        <div class="rating" v-show="food.rating">
          <h1 class="title">商品评价</h1>
          <rating-select :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></rating-select>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import BScorll from 'better-scroll'
import cartControl from '../../components/cartcontrol/cartcontrol'
import split from '../../components/split/split'
import ratingSelect from '../../components/ratingselect/ratingselect'
import selectType from '../../components/ratingselect/selectType'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: selectType.ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = selectType.ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScorll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      if (!event._constructed) return
      // this.$emit('cart-add', event.target)
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    cartControl,
    split,
    ratingSelect
  }
}
</script>

<style lang="scss" scoped>
.food-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  z-index: 30;
  background-color: #ffffff;
  transition: all 0.2s linear;
  &.slideright-enter-active,
  &.slideright-leave-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &.slideright-enter,
  &.slideright-leave-to {
    opacity: 1;
    transform: translate3d(100%, 0, 0);
  }
  .img-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #ffffff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-style: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      font-size: 0;
      height: 10px;
      .sell-count,
      .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: 24px;
      font-size: 0;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
  }
  .cartcontrol-warpper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background-color: rgb(0, 160, 220);
    transition: all 0.3s;
    &.fade-enter-active,
    &.fade-leave-active {
      opacity: 1;
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
  }
}
</style>