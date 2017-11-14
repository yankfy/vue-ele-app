<template>
    <div class="goods">
        <div class="menu-wrapper"></div>
        <div class="foods-wrapper"></div>
    </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
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
    }
    .foods-wrapper {
      flex: 1;
      background-color:#fff; 
    }
  }
</style>