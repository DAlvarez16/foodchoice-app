<template>
    <header class="bg-black/80 flex justify-between items-center px-[50px]">
        <img src="/logo.png" alt="logo" title="FoodChoice" class="w-[180px] hover:cursor-pointer" @click="goToHome">
        <nav class="flex gap-[30px]">
            <button v-if="user==null" class="text-white font-semibold hover:cursor-pointer border-[1px] border-white p-[15px] rounded-[10px] hover:bg-white hover:text-black" @click="goToLogin">Iniciar Sesion</button>
            <button v-if="user==null" class="text-white font-semibold hover:cursor-pointer border-[1px] border-white p-[15px] rounded-[10px] hover:bg-white hover:text-black" @click="goToRegister">Registrarse</button>
            <div class="flex gap-[10px] justify-center items-center relative hover:cursor-pointer" v-if="user" @click="menu=true">
                <font-awesome-icon icon="fa-solid fa-user" class="text-white text-[22px]"></font-awesome-icon>
                <span class="text-white text-[22px]">{{ user.username }}</span>
                <div class="absolute top-[60px] bg-black/80 flex flex-col gap-[10px] w-[150px]" :class="menu ? '' : 'hidden'" @mouseleave="menu=false">
                    <button class="text-white font-semibold hover:cursor-pointer hover:bg-white hover:text-black p-[20px]" @click="goToPerfil">Perfil</button>
                    <button class="text-white font-semibold hover:cursor-pointer hover:bg-white hover:text-black p-[20px]" @click="logout">Cerrar sesión</button>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
export default{
    data(){
        return{
            user: null,
            menu: false
        }
    },
    methods:{
        goToLogin(){
            this.$router.push({name: "login"})
        },
        goToRegister(){
            this.$router.push({name: "register"})
        },
        goToHome(){
            this.$router.push({name: 'home'})
        },
        logout(){
            localStorage.removeItem("user")
            window.location.href = "/login"
        },
        goToPerfil(){
            if(this.user.userType == 'Restaurante'){                
                this.$router.push({name: 'restaurant-profile', params: {id: this.user._id}})
            }
        }
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem("user"))
    }
}
</script>
<style>
</style>