<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="head-title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">{{seller.ratingCount}}</span>
                    <span class="text">{{seller.sellCount}}</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2 class="title">起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star'
import BScorll from 'better-scroll'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScorll(this.$refs.seller, {
        click: true
      })
    })
  },
  components: {
    star
  }
}
</script>

<style lang="scss" scoped>
@import '../common/scss/mixin';
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    padding: 18px 0;
    .head-title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc {
      padding-bottom: 18px;
      line-height: 18px;
      font-size: 0;
      @include border-1px(rgba(7,17,27,0.1));
      .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text {
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
}
</style>
