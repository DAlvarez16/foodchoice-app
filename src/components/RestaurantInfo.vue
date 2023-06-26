<template>
    <main
        class="flex justify-center items-center p-[50px] bg-black/70 border-[1px] max-w-[1200px] mx-auto my-[30px] gap-[20px] rounded-[15px]"
        v-if="restaurant">
        <div class="flex flex-col w-[80%] gap-[30px]">
            <h2 class="text-center text-[28px] text-white font-bold">{{ restaurant.name }}</h2>
            <p class="text-white text-[20px]">{{ restaurant.description }}</p>
            <p class="text-white text-[20px]">Direccion: <span class="text-green-300">{{ restaurant.address }}</span></p>
            <p class="text-white text-[20px]">Telefono: <span class="text-green-300">{{ restaurant.phone }}</span></p>
            <span class="text-white font-semibold text-[25px] text-center">
                Valorar
                <span class="" v-for="x in 5" :class="{ 'text-yellow-500': x <= rating }">
                    <font-awesome-icon icon="fa fa-star" class="text-gray-500 hover:cursor-pointer hover:text-yellow-500"
                        :key="x" :id="x" @click="rank(x)"></font-awesome-icon>
                </span>
            </span>
            <span class="text-white font-semibold text-[25px] text-center">
                Calificacion general
                <span>
                    {{restaurant.stars}}/5
                </span>
            </span>
            <textarea name="comentario" id="comentario" cols="30" rows="10" placeholder="Escribe un comentario"
                class="bg-transparent text-white p-[10px] border-[1px] rounded-[5px]" v-model="text"></textarea>
            <div class="flex justify-center flex">
                <button
                    class="bg-black/80 text-white font-semibold text-[20px] p-[10px] rounded-[10px] hover:bg-white/80 hover:text-black"
                    @click="sendComment">Enviar
                    comentario</button>
            </div>
            <div class="flex justify-center flex" v-if="user && user.userType == 'Admin'">
                <button v-if="!restaurant.adminRecomendation"
                    class="bg-black/80 text-white font-semibold text-[20px] p-[10px] rounded-[10px] hover:bg-white/80 hover:text-black"
                    @click="adminRecomendation">Dar super recomandacion</button>
                <button v-if="restaurant.adminRecomendation"
                    class="bg-black/80 text-white font-semibold text-[20px] p-[10px] rounded-[10px] hover:bg-white/80 hover:text-black"
                    @click="adminRecomendation">Quitar super recomandacion</button>
            </div>
        </div>
        <img :src="restaurant.image == 'no-image' ? '/no-image.jpg' : env.URL_API + 'restaurant/get-image/' + restaurant._id"
            class="w-[20%] rounded-full">
    </main>

    <section class="flex p-[50px] bg-black/70 border-[1px] max-w-[1200px] mx-auto my-[30px] gap-[20px] rounded-[15px]">
        <div v-if="restaurant" class="w-full">
            <h2 class="text-center text-white text-[30px] mb-[20px]">Comentarios</h2>
            <h2 v-if="restaurant.comments.length == 0" class="text-center text-white text-[28px]">Este restaurante no tiene
                comentarios</h2>
            <div v-for="comment in restaurant.comments" class="flex flex-col">
                <Comment :idClient="comment.idClient" :idAdmin="comment.idAdmin" :commentText="comment.text"></Comment>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import env from '../environment'
import Comment from './Comment.vue';
export default {
    data() {
        return {
            restaurant: null,
            env: env,
            text: '',
            user: null,
            rating: 0
        };
    },
    methods: {
        async rank(x) {
            if (this.user == null) {
                return this.$swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Por favor inicia sesion para poder valorar el restaurante',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                const res = await axios.put(env.URL_API + "restaurant/rank/" + this.$route.params.id, {
                    stars: x,
                    idClient: this.user._id
                })

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
                    return this.$swal.fire({
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
            const res = await axios.get(env.URL_API + "restaurant/get-restaurant/" + this.$route.params.id);
            this.restaurant = res.data.restaurant[0];
        },
        async sendComment() {
            const user = JSON.parse(localStorage.getItem("user"))
            if (user == null) {
                return this.$swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Por favor inicia sesion para poder comentar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (this.text == '') {
                return this.$swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Debes colocar un comentario',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            const res = await axios.post(env.URL_API + "restaurant/add-comment/" + this.$route.params.id, {
                idClient: user.userType == 'Cliente' ? user._id : null,
                idAdmin: user.userType == 'Admin' ? user._id : null,
                text: this.text
            })

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
            }
        },
        async adminRecomendation() {
            const res = await axios.put(env.URL_API + "restaurant/admin-recomendation/" + this.$route.params.id)
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
                return this.$swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    },
    mounted() {
        this.getRestaurant();
        this.user = JSON.parse(localStorage.getItem("user"))
    },
    components: { Comment }
}
</script>