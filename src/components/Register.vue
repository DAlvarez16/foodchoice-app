<template>
    <div class="flex justify-center items-center">
        <div class="bg-black/80 p-[50px] mt-[50px] flex flex-col gap-[20px]">
            <h2 class="text-white text-[28px] text-center">Registrate</h2>
            <div class="flex flex-col gap-[10px]">
                <label class="text-white font-semibold" for="user-type">Tipo de usuario</label>
                <select class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" name="user-type"
                    v-model="userType" id="user-type">
                    <option class="text-black" value="">--Seleccione tipo de usuario--</option>
                    <option class="text-black" value="cliente">Cliente</option>
                    <option class="text-black" value="restaurante">Restaurante</option>
                </select>
            </div>
            <form id="" class="flex flex-col form-container login gap-[20px]">
                <div v-if="userType === 'cliente'"> <!-- FORMULARIO DE REGISTRO CLIENTE -->
                    <div class="flex flex-col gap-[10px]">
                        <label for="name" class="text-white font-semibold">Nombre:</label>
                        <input class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="text" id="name" name="name" required v-model="user.name">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="username" class="text-white font-semibold">Usuario:</label>
                        <input class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="text" id="username" name="username" required v-model="user.username">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="password" class="text-white font-semibold">Contraseña:</label>
                        <input class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="password" id="password" name="password" required v-model="user.password">
                    </div>
                </div>

                <div v-if="userType === 'restaurante'" class="grid grid-cols-2 gap-[20px]">
                    <!-- FORMULARIO DE REGISTRO RESTAURANTE -->
                    <div class="flex flex-col gap-[10px]">
                        <label for="nit" class="text-white font-semibold">Nit:</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="text"
                            id="nit" name="nit" required v-model="restaurant.nit">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="restaurant-name" class="text-white font-semibold">Nombre de restaurante:</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="restaurant-name" id="restaurant-name" name="restaurant-name" required
                            v-model="restaurant.name">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="description" class="text-white font-semibold">Descripción</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="text"
                            id="description" name="description" required v-model="restaurant.description">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="address" class="text-white font-semibold">Dirección</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="address" id="address" name="address" required v-model="restaurant.address">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="tel" class="text-white font-semibold">Telefono:</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="text"
                            id="tel" name="tel" required v-model="restaurant.phone">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label class="text-white font-semibold" for="restaurant-type">Tipo de restaurante</label>
                        <select required class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            name="restaurant-type" id="restaurant-type" v-model="restaurant.restaurantType">
                            <option class="text-black" value="">--Seleccione tipo de restaurante--</option>
                            <option class="text-black" value="Comida rapida">Comida rapida</option>
                            <option class="text-black" value="Heladeria">Heladeria</option>
                            <option class="text-black" value="Comida oriental">Comida oriental</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="username" class="text-white font-semibold">Usuario:</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="username" id="username" name="username" required v-model="restaurant.username">
                    </div>
                    <div class="flex flex-col gap-[10px]">
                        <label for="password" class="text-white font-semibold">Contraseña:</label>
                        <input autocomplete="off"
                            class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white"
                            type="password" id="password" name="password" required v-model="restaurant.password">
                    </div>
                </div>

                <button type="submit"
                    class="w-full p-[20px] text-white border-[1px] border-white hover:bg-white hover:text-black"
                    @click="handleSubmit">Registrate</button>
                <div class="text-white">
                    ¿Ya tienes una cuenta? <RouterLink :to="{name: 'login'}">Inicia sesión</RouterLink>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import env from '../environment'
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            userType: null,
            restaurant: {
                nit: "",
                name: "",
                description: "",
                address: "",
                phone: "",
                restaurantType: "",
                username: "",
                password: ""
            },
            user: {
                name: "",
                username: "",
                password: ""
            }
        };
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault();
            if (this.typee == "") {
                return this.$swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Selecciona un tipo de usuario",
                });
            }
            if (this.userType == "restaurante") {
                if (this.restaurant.nit == "" || this.restaurant.name == "" ||
                    this.restaurant.description == "" || this.restaurant.address == "" ||
                    this.restaurant.phone == "" || this.restaurant.restaurantType == "",
                    this.restaurant.username == "" || this.restaurant.password == "") {
                    this.$swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "No puedes dejar campos en blanco",
                    });
                }
                else {
                    const res = await this.registerRestaurant();
                    if (res.code == 201) {
                        this.$swal.fire({
                            position: "center",
                            icon: "success",
                            title: res.msg,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            this.$router.push({ name: "login" });
                        });
                    }
                    else if (res.code == 409) {
                        this.$swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "El Nit del restaurante ya existe registrado",
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
                if (this.user.name == "" || this.user.username == "" || this.user.password == "") {
                    this.$swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "No puedes dejar campos en blanco",
                    });
                }
                else {
                    const res = await this.registeruser();
                    if (res.code == 201) {
                        this.$swal.fire({
                            position: "center",
                            icon: "success",
                            title: res.msg,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            this.$router.push({ name: "login" });
                        });
                    }
                    else if (res.code == 409) {
                        this.$swal.fire({
                            position: "center",
                            icon: "warning",
                            title: res.msg,
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
        },
        async registerRestaurant() {
            const res = await axios.post(env.URL_API + "restaurant/create", {
                nit: this.restaurant.nit,
                name: this.restaurant.name,
                description: this.restaurant.description,
                address: this.restaurant.address,
                phone: this.restaurant.phone,
                restaurantType: this.restaurant.restaurantType,
                username: this.restaurant.username,
                password: this.restaurant.password
            });
            return res.data;
        },
        async registeruser() {
            const res = await axios.post(env.URL_API + "client/sign-up", {
                name: this.user.name,
                username: this.user.username,
                password: this.user.password
            });
            return res.data;
        }
    },
    components: { RouterLink }
}
</script>