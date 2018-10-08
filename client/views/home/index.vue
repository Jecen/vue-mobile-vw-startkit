<template>
  <div class='page'>
    <h1 class='h1 ig-h1 aspect-box'>Home Page</h1>
  </div>
</template>

<script>
export default { name: 'HomePage' }
</script>

<style lang="scss" scoped>
@import '../../assets/style/func.scss';

.page{
  width: 100%;
  height: inherit;
  .h1{
    font-size: 20px;
  }
  .ig-h1{ // ig 开头的class 不会做vw适配处理
    padding: 20px;
  }

  .aspect-box {
    width: 50%;
    position: relative;
    background: lime;
    aspect-ratio: '16:9'; // 宽高比
  }
}
</style>

