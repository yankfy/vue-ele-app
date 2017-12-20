<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="head-title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
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
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import BScorll from 'better-scroll'
import split from '../split/split'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: false
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted() {
    this._initScroll()
    this._initPicScroll()
  },
  watch: {
    seller() {
      this._initScroll()
      this._initPicScroll()
    }
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      console.log(this.favorite)
    },
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScorll(this.$refs.seller, {
            click: true
          })
        } else {
          // this.$nextTick(() => {
          //   this.scroll = new BScorll(this.$refs.seller, {
          //     click: true
          //   })
          // })
          this.scroll.refresh()
        }
      })
    },
    _initPicScroll() {
      this.$nextTick(() => {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          if (!this.picScroll) {
            this.picScroll = new BScorll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            // this.$nextTick(() => {
            //   this.picScroll = new BScorll(this.$refs.picWrapper, {
            //     scrollX: true,
            //     eventPassthrough: 'vertical'
            //   })
            // })
            this.picScroll.refresh()
          }
        }
      })
    }
  },
  components: {
    star,
    split
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
    padding: 18px;
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
      @include border-1px(rgba(7, 17, 27, 0.1));
      .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text {
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border-right: none;
        }
      }
      h2 {
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .content {
        line-height: 24px;
        font-size: 10px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        .stress {
          font-size: 24px;
        }
      }
    }
    .favorite {
      position: absolute;
      right: 18px;
      top: 18px;
      width: 36px;
      text-align: center;
      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(147, 153, 159);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        display: block;
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports {
      width: 100%;
      margin: 0 auto;
      .support-item {
        padding: 16px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        &:last-child {
          margin-bottom: 0;
          @include border-1px(transparent);
        }
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        vertical-align: top;
        &.decrease {
          @include bg-image('./images/decrease_4');
        }
        &.discount {
          @include bg-image('./images/discount_4');
        }
        &.guarantee {
          @include bg-image('./images/guarantee_4');
        }
        &.invoice {
          @include bg-image('./images/invoice_4');
        }
        &.special {
          @include bg-image('./images/special_4');
        }
      }
      .text {
        line-height: 16px;
        font-size: 12px;
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          img {
            width: 120px;
            height: 90px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0 18px;
    .title {
      padding-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
      @include border-1px(rgba(7,17,27,0.1));
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      @include border-1px(rgba(7,17,27,0.1));
      color: rgb(7, 17, 27);
      font-size: 12px;
      &:last-child {
        &::after {
          border: none;
        }
      }
    }
  }
}
</style>