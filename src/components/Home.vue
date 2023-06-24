<template>
    <main class="max-w-[1200px] my-[30px] mx-auto bg-black/70 p-[30px]">
        <div class="flex justify-center items-center gap-[30px] text-white mb-[40px]">
            <div class="flex flex-col">
                <label for="search">Buscar restaurante:</label>
                <input type="text" id="search" name="search" required
                    class="bg-transparent border-b-[1px] border-b-white focus:outline-none" v-model="search">
            </div>
            <div class="flex flex-col">
                <label for="restaurant_type">Tipo de restaurante:</label>
                <select id="restaurant_type" name="restaurant_type" required
                    class="bg-transparent border-b-[1px] border-b-white focus:outline-none" v-model="type">
                    <option value="" selected class="text-black">Todos</option>
                    <option value="Comida rapida" class="text-black">Comida rapida</option>
                    <option value="Heladeria" class="text-black">Heladeria</option>
                    <option value="Comida oriental" class="text-black">Comida oriental</option>
                </select>
            </div>
        </div>

        <section class="grid grid-cols-3 gap-[30px]">
            <div class="flex flex-col justify-center border-[2px] p-[8px] bg-neutral-800/70"
                v-for="restaurant in filteredRestaurants" :key="restaurant._id">
                <img :src="restaurant.image == 'no-image' ? '/no-image.jpg' : env.URL_API + 'restaurant/get-image/' + restaurant._id">
                <div class="flex flex-col gap-[10px]">
                    <h3 class="font-semibold text-white text-[20px]">{{ restaurant.name }}</h3>
                    <p class="text-white">{{ restaurant.description }}</p>
                    <span class="text-green-400 font-bold">{{ restaurant.restaurantType }}</span>
                    <RouterLink :to="{name: 'restaurant', params: {id: restaurant._id}}" class="bg-blue-400 p-[10px] mx-auto">Ver más</RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios'
import env from '../environment'
export default {
    data() {
        return {
            restaurants: [],
            search: "",
            type: "",
            env: env
        };
    },
    computed: {
        filteredRestaurants() {
            if (this.search == "" && this.type == "") {
                return this.restaurants;
            }
            return this.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.search.toLowerCase()) && restaurant.restaurantType.toLowerCase().includes(this.type.toLowerCase()));
        }
    },
    methods: {
        async getRestaurants() {
            const res = await axios.get(env.URL_API + "restaurant/get-restaurants");
            this.restaurants = res.data.restaurants;
        }
    },
    mounted() {
        this.getRestaurants();
        console.log(localStorage.getItem("user"))
    },
    components: { RouterLink }
}
</script>

<style>
/*     * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url("/background.png") no-repeat;
    background-size: cover;
    background-position: center;
    font-family: 'Montserrat', sans-serif;
}



.container {
    padding: 30px;
    position: relative;
    width: auto;
    height: auto;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid #ccc;
    border-radius: 15px;
    backdrop-filter: blur(4px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-top: 120px;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    color: #ccc;
}

.container_filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
    padding: 40px;
    transition: transform .18s ease;
    transform: translateX(0);
}

.search_bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
}

.input {
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #ccc;
}

.input label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: #ccc;
    font-weight: 500;
    pointer-events: none;
    transition: .5s;
}

.input input:focus~label,
.input input:valid~label,
.input select:focus~label,
.input select:valid~label,
.input select option:checked~label {
    top: -5px;
    color: #ccc;
}

.input input,
.input select {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #ccc;
    font-weight: 600;
    padding: 0 35px 0 5px;
}

.input select option {
    background-color:rgba(0, 0, 0, .9);
}

.restaurant_list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.restaurants {
    display: flex;
    align-items: center;
    border: 0.25px solid gray;
    padding: 10px;
    gap: 30px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.restaurants img {
    width: 10%;
    border-radius: 50%;
}

.info a {
    color: #fff;
    text-decoration: none;
}

.info a:hover {
    text-decoration: underline;
} */</style>