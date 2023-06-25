<template>
    <div v-if="client || admin" class="flex flex-col border-[1px] rounded-[10px] p-[10px] mb-[20px] bg-black">
        <h3 class="text-white text-[20px]">{{ client == null ? admin.username : client.name }}</h3>
        <p class="text-white">{{ commentText }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import env from '../environment'

export default {
    props: {
        idClient: String,
        idAdmin: String,
        commentText: String
    },
    data() {
        return {
            client: null,
            admin: null
        }
    },
    methods: {
        async getClient() {
            const res = await axios.get(env.URL_API + "client/get-client/" + this.idClient)
            this.client = res.data.client
        },
        async getAdmin() {
            const res = await axios.get(env.URL_API + "admin/get-admin/" + this.idAdmin)
            this.admin = res.data.admin
        }
    },
    mounted() {
        if(this.idClient){
            this.getClient()
        }else if(this.idAdmin){
            this.getAdmin()
        }
        
    }
}
</script>