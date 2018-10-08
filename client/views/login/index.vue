<template>
  <div class='page'>
   <p @click='login'>Login Page</p>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    login() {
      this.$store.dispatch('user/login', {
        username: 'JacenShi',
        password: '123456',
      })
        .then(() => {
          this.$router.push('/home')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  height: inherit;
}
</style>

