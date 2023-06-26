<template>
    <main class="max-w-[1200px] bg-black/80 p-[50px] mx-auto my-[20px] flex flex-col gap-[20px] items-center"
        v-if="restData">
        <div class="flex flex-col gap-[20px] items-center justify-center">
            <img :src="restData.image == 'no-image' ? '/no-image.jpg' : env.URL_API + 'restaurant/get-image/' + restData._id"
                class="w-[200px] rounded-full">
            <input type="file" name="file0" id="file0" class="text-white" accept="image/png image/jpg"
                @change="handleFileChange">
            <button v-if="image" class="text-white border-[1px] rounded-[10px] p-[10px] hover:text-black hover:bg-white"
                @click="updateImage">Actualizar
                imagen</button>
        </div>

        <form id="" class="flex flex-col form-container login gap-[20px] w-full">
            <div class="grid grid-cols-2 gap-[20px]">
                <div class="flex flex-col gap-[10px]">
                    <label for="nit" class="text-white font-semibold">Nit:</label>
                    <input autocomplete="off"
                        class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="text"
                        id="nit" name="nit" required v-model="restaurant.nit" disabled>
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
                        class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="address"
                        id="address" name="address" required v-model="restaurant.address">
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
                        class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="username"
                        id="username" name="username" required v-model="restaurant.username">
                </div>
                <div class="flex flex-col gap-[10px]">
                    <label for="password" class="text-white font-semibold">Contraseña:</label>
                    <input autocomplete="off"
                        class="focus:outline-none bg-transparent border-b-[1px] border-b-white text-white" type="password"
                        id="password" name="password" required v-model="restaurant.password">
                </div>
            </div>

            <button type="submit"
                class="w-full p-[20px] text-white border-[1px] border-white hover:bg-white hover:text-black"
                @click="handleSubmit">Actualizar informacion</button>
            <button class="w-full p-[20px] text-white border-[1px] border-white hover:bg-white hover:text-black"
                @click="deleteRestaurant">Borrar cuenta</button>
        </form>
    </main>
</template>
<script>
import axios from 'axios';
import env from '../environment'
export default {
    data() {
        return {
            restaurant: {
                nit: '',
                name: '',
                description: '',
                address: '',
                phone: '',
                restaurantType: '',
                username: '',
                password: ''
            },
            restData: null,
            image: null,
            env: env
        }
    },
    methods: {
        handleFileChange(e) {
            this.image = e.target.files[0]
        },
        async handleSubmit(e) {
            e.preventDefault()
            if (
                this.restaurant.nit == '' || this.restaurant.name == '' ||
                this.restaurant.description == '' || this.restaurant.address == '' ||
                this.restaurant.phone == '' || this.restaurant.restaurantType == '',
                this.restaurant.username == '' || this.restaurant.password == ''
            ) {
                return this.$swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'No puedes dejar campos en blanco',
                })
            } else {
                const res = await this.updateData()
                if (res.code == 201) {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.reload()
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
        },
        async getRestaurant() {
            const res = await axios.get(env.URL_API + "restaurant/get-restaurant/" + this.$route.params.id)
            this.restData = res.data.restaurant[0]
            this.restaurant.nit = this.restData.nit
            this.restaurant.name = this.restData.name
            this.restaurant.description = this.restData.description
            this.restaurant.address = this.restData.address
            this.restaurant.phone = this.restData.phone
            this.restaurant.restaurantType = this.restData.restaurantType
            this.restaurant.username = this.restData.username
        },
        async updateData() {
            const res = await axios.put(env.URL_API + "restaurant/update/" + this.$route.params.id, {
                nit: this.restaurant.nit,
                name: this.restaurant.name,
                description: this.restaurant.description,
                address: this.restaurant.address,
                phone: this.restaurant.phone,
                restaurantType: this.restaurant.restaurantType,
                username: this.restaurant.username,
                password: this.restaurant.password
            })
            return res.data
        },
        async updateImage() {
            const file = document.getElementById('file0')
            const formData = new FormData()
            formData.append('file0', file.files[0])
            const res = await axios.put(env.URL_API + "restaurant/add-image/" + this.$route.params.id, formData)
            if (res.data.code == 201) {
                this.$swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload()
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
        },
        deleteRestaurant(e) {
            e.preventDefault()
            this.$swal.fire({
                title: '¿Estas seguro que deseas borrar tu cuenta?',
                text: "Una vez confirmes, tus datos se borraran y no podran ser recuperados",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, borralo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(env.URL_API + "restaurant/delete/" + this.$route.params.id)
                    if (res.data.code == 200) {
                        this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            localStorage.removeItem("user")
                            window.location.href = "/"
                        })
                    }
                }
            })
        }
    },

    mounted() {
        this.getRestaurant()
    }
}
</script>