<template>
    <div>
        <router-link to="/foo">foo</router-link>
        <router-link to="/bar">bar</router-link>
        <router-view></router-view>
        <button @click="go">前进</button>
        <button @click="back">后退</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        go(){
            this.$router.go(1)
        },
        back(){
            this.$router.back()
        }
    },
}
</script>