<template>
    <div @click="showWallet" class="list-group-item">
        <h4>{{ wallet.name }}</h4>
        <p>{{ wallet.balance }}SR</p>
    </div>
</template>

<script>
export default {
    props: ['wallet'],
    setup(props, context) {
        const showWallet = () =>{
            context.emit("show", props.wallet)
        }
        return { showWallet }
    }
}
</script>

<style>

</style>