<template>
    <div @click="showWallet" class="list-group-item ">
        <div class="wallet-data">
            <h4>{{ wallet.name }}</h4>
            <p>{{ wallet.balance }}SR</p>
        </div>
        <button @click="editWallet" class="btn btn-outline-warning" type="button">
            <span class="material-icons">create</span>
        </button>
    </div>
    
</template>

<script>
export default {
    props: ['wallet'],
    setup(props, context) {
        const showWallet = () =>{
            context.emit("show", props.wallet)
        }
        const editWallet = () => {
            context.emit("edit", props.wallet)
        }
        return { showWallet, editWallet }
    }
}
</script>

<style scoped>
.list-group-item{
    display: flex;
    justify-content: space-between;
}
button {
    margin-bottom: 10px;
}
</style>