<template>
    <div class="flex items-center justify-center">
        <div class="bg-black/80 p-[50px] flex flex-col gap-[20px] mt-[100px]">
            <h2 class="text-white text-[30px]">Selecciona que eres</h2>
            <div class="flex flex-col gap-[10px]">
                <button
                    class="text-white font-semibold hover:cursor-pointer border-[1px] border-white p-[15px] rounded-[10px] hover:bg-white hover:text-black"
                    @click="goToLoginClient">Cliente</button>
                <button
                    class="text-white font-semibold hover:cursor-pointer border-[1px] border-white p-[15px] rounded-[10px] hover:bg-white hover:text-black">Restaurante</button>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    methods: {
        goToLoginClient() {
            this.$router.push({ name: 'login-client' })
        }
    }
}
</script>