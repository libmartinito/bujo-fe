<script setup lang="ts">
import { store } from "@/store/store"
const email = ref<string>("")
const password = ref<string>("")
const register = async () => {
    interface Response {
        user: {
            id: string,
            email: string,
            created_at: string,
            updated_at: string
        },
        token: string
    }
    const url = "http://localhost:3333/api/user/register"
    const options = {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value
        }
    }
    const { data } = await useFetch<Response>(url, options)
    store.updateUserInfo(data.value.user, data.value.token)
    await navigateTo("/home")
}
</script>

<template>
    <form @submit.prevent="register" class="register">
        <input type="email" placeholder="email" class="email" required v-model="email" />
        <input type="password" placeholder="password" class="password" required v-model="password" />
        <div class="login">already have an account?<NuxtLink to="/login">log in</NuxtLink></div>
        <button type="submit" class="submit">register</button>
    </form>
</template>

<style lang="scss" scoped>
.register {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    input {
        width: 384px;
        box-sizing: border-box;
        font-size: inherit;
        padding: 4px 8px;
        border: 1px solid #525252;
    }
    input:hover {
        border: 1px solid #262626;
    }
    input:focus {
        outline: none;
        padding: 3px 7px;
        border: 2px solid #262626;
    }
    .login {
        font-size: 16px;
        padding-top: 16px;
    }
    button {
        width: 384px;
        padding: 4px 8px;
        background-color: #525252;
        color: #fff;
        border: none;
        line-height: 1.3;
        cursor: pointer;
    }
    button:hover {
        background-color: #262626;
    }
}
</style>