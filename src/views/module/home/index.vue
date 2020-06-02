<template>
  <div class="home">
    <img alt="Vue logo" src="./images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue3 Boilerplate" />
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(): void {
    console.log(process.env.NODE_ENV)
  },
}
</script>
