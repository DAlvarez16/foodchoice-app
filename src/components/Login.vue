<template>
    <div class="flex justify-center items-center">
        <div class="bg-black/80 p-[50px] mt-[50px]">
            <form id="login-client" class="flex flex-col form-container login gap-[20px]">
                <h2 class="text-white text-[28px] text-center">Iniciar Sesión</h2>
                <div class="flex flex-col gap-[10px]">
                    <label class="text-white font-semibold" for="user-type">Tipo de usuario</label>
                    <select class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                        name="user-type" id="user-type" v-model="typee">
                        <option class="text-black" value="">--Seleccione tipo de usuario--</option>
                        <option class="text-black" value="cliente">Cliente</option>
                        <option class="text-black" value="restaurante">Restaurante</option>
                    </select>
                </div>
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
                <div class="text-white">
                    ¿No tiene una cuenta? <RouterLink :to="{name: 'register'}">Registrate</RouterLink>
                </div>
            </form>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import env from '../environment'
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            typee: "",
            username: "",
            password: ""
        };
    },
    methods: {
        async loginRestaurant() {
            const res = await axios.post(env.URL_API + "restaurant/sign-in", { username: this.username, password: this.password });
            return res.data;
        },
        async loginclient() {
            const res = await axios.post(env.URL_API + "client/sign-in", { username: this.username, password: this.password });
            return res.data;
        },
        async handleSubmit(e) {
            e.preventDefault();
            if (this.typee == "") {
                return this.$swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Selecciona un tipo de usuario",
                });
            }
            if (this.typee == "restaurante") {
                if (this.username == "" || this.password == "") {
                    this.$swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "No puedes dejar campos en blanco",
                    });
                }
                else {
                    const res = await this.loginRestaurant();
                    if (res.code == 200) {
                        this.$swal.fire({
                            position: "center",
                            icon: "success",
                            title: res.msg,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            localStorage.setItem("user", JSON.stringify(res.restaurant));
                            window.location.href = "/restaurant-profile/" + res.restaurant._id;
                        });
                    }
                    else if (res.code == 404) {
                        this.$swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Usuario o constraseña incorrectos",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else if (res.code == 401) {
                        this.$swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Usuario o constraseña incorrectos",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else {
                        this.$swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Ha ocurrido un error",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            }
            else {
                if (this.username == "" || this.password == "") {
                    this.$swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "No puedes dejar campos en blanco",
                    });
                }
                else {
                    const res = await this.loginclient();
                    if (res.code == 200) {
                        this.$swal.fire({
                            position: "center",
                            icon: "success",
                            title: res.msg,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            localStorage.setItem("user", JSON.stringify(res.client));
                            window.location.href = "/";
                        });
                    }
                    else if (res.code == 404) {
                        this.$swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Usuario o constraseña incorrectos",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else if (res.code == 401) {
                        this.$swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Usuario o constraseña incorrectos",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else {
                        this.$swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Ha ocurrido un error",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            }
        }
    },
    components: { RouterLink }
}
</script>

<style></style>
