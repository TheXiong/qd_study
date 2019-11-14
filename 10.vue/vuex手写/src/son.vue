<template>
    <div>
        {{this.$store.getters.newAge}}
        <div>
            <button @click="addage">add</button>
            <button @click="minusage">minus</button>
        </div> 
    </div>

</template>

<script>
export default {
    mounted() {
        console.log(this.$store.getters);
        setTimeout(()=>{
            this.$store.state.age = 20
        },2000)
    },
    data() {
        return {
            
        }
    },
    methods: {
        addage(){
            this.$store.commit('addAge',10)
        },
        minusage(){
            this.$store.dispatch('minusAgeAsync',10)
        }
    },
}
</script>