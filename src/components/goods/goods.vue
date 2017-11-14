<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu_wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods_wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="foods-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  created() {
    this.$http.get('/api/goods').then(res => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.goods = res.data
        // DOM更新后
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        console.log(height1, height2)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log(i)
          return i
        }
      }
      return 0
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menu_wrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foods_wrapper, {
        probeType: 3
      })
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foods_wrapper.getElementsByClassName(
        'food-list-hook'
      )
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    selectMenu(index, $event) {
      // console.log(index)
      let foodList = this.$refs.foods_wrapper.getElementsByClassName(
        'food-list-hook'
      )
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    }
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
      padding: 0 12px;
      line-height: 14px;
      font-size: 0;
      &.current {
        position: relative;
        margin-top: -1px;
        margin-bottom: -1px;
        z-index: 10;
        background-color: #fff;
        font-weight: 700;
        .text {
          border: none;
        }
      }
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
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    background-color: #fff;
    .foods-list {
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
    }
    .food-item {
      display: flex;
      margin: 18px;
      margin-bottom: 0;
      padding-bottom: 18px;
      @include border-1px(rgba(7,17,27,0.1));
      &:last-child {
        border-bottom: none;
      }
      .icon {
        flex-basis: 57px;
        margin-right: 10px;
        img {
          width: 57px;
          height: 57px;
        }
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }
        .extra {
          font-size: 0;
          span {
            font-size: 10px;
          }
          .count {
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
    }
  }
}
</style>