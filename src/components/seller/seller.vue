<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
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

<style>

</style>
