<template>
    <div class="flex justify-center items-center">
        <div class="bg-black/80 p-[50px] mt-[50px]">
            <form id="login-client" class="flex flex-col form-container login gap-[20px]">
                <h2 class="text-white text-[28px] text-center">Iniciar Sesión</h2>
                <div class="flex flex-col gap-[10px]">
                    <label for="username" class="text-white font-semibold">Usuario:</label>
                    <input class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="text"
                        id="username" name="username" required v-model="username">
                </div>
                <div class="flex flex-col gap-[10px]">
                    <label for="password" class="text-white font-semibold">Contraseña:</label>
                    <input class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                        type="password" id="password" name="password" required v-model="password">
                </div>
                <button type="submit"
                    class="w-full p-[20px] text-white border-[1px] border-white hover:bg-white hover:text-black"
                    @click="handleSubmit">Iniciar sesión</button>
            </form>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import env from '../environment'

export default {
    data() {
        return {
            username: "",
            password: ""

        }
    },
    methods: {
        async loginAdmin() {
            const res = await axios.post(env.URL_API + "admin/sign-in", { username: this.username, password: this.password })
            return res.data
        },

        async handleSubmit(e) {
            e.preventDefault()
            if (this.username == "" || this.password == "") {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'No puedes dejar campos en blanco',
                })
            } else {
                const res = await this.loginAdmin()
                if (res.code == 200) {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        localStorage.setItem("user", JSON.stringify(res.admin))
                        window.location.href = "/"
                    })
                } else if (res.code == 404) {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Usuario o constraseña incorrectos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if (res.code == 401) {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Usuario o constraseña incorrectos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
    }
}
</script>

<style></style>
