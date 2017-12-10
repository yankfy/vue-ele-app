<template>
    <div>
        <div class="ratings">
            <div class="ratings-content">
                <div class="overview">
                    <div class="overview-left">
                        <h1 class="score">{{seller.score}}</h1>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                    </div>
                    <div class="overview-right">
                        <div class="score-wrapper">
                            <span class="title">服务态度</span>
                            <star :size='36' :score='seller.serviceScore'></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="score-wrapper">
                            <span class="title">商品评分</span>
                            <star :size='36' :score='seller.foodScore'></star>
                            <span class="score">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-wrapper">
                            <span class="title">送达时间</span>
                            <span class="delivery">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
                <split></split>
                <rating-select :ratings='ratings' @ratingTypeSelect='changeType' @contentToggle='toggleContent'></rating-select>
                <div class="rating-wrapper">
                    <ul>
                        <li v-for="(rating,index) in ratings" :key="index" class="rating-item">
                            <div class="avatar">
                                <img :src="rating.avatar" alt="">
                            </div>
                            <div class="content">
                                <h1 class="name">{{rating.username}}</h1>
                                <div class="star-wrapper">
                                    <star :size='24' :score='rating.score'></star>
                                    <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                                </div>
                                <p class="text">{{rating.text}}</p>
                                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                    <span class="icon-thumb_up"></span>
                                    <span v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star'
import split from '../../components/split/split'
import ratingSelect from '../../components/ratingselect/ratingselect'
import selectType from '../../components/ratingselect/selectType'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: selectType.ALL,
      onlyContent: true
    }
  },
  components: {
    star,
    split,
    ratingSelect
  },
  created() {
    this.$http.get('/api/ratings').then(res => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.ratings = res.data
      }
    })
  },
  methods: {
    changeType(selectType) {
      this.selectType = selectType
      //   this.$nextTick(() => {
      //     this.scroll.refresh()
      //   })
    },
    toggleContent(onlyContent) {
      this.onlyContent = onlyContent
      //   this.$nextTick(() => {
      //     this.scroll.refresh()
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex-basis: 137px;
      width: 137px;
      padding: 6px 0;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex-basis: 118px;
        width: 118px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0;
      padding-left: 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 10px;
      }
      .title {
        display: inline-block;
        vertical-align: top;
        line-height: 18px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .delivery {
          display: inline-block;
          vertical-align: top;
          margin-left: 12px;
          line-height: 18px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>