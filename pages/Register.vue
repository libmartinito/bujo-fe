<script setup lang="ts">
import { store } from "@/store/store"

type JSONResponse = {
    user?: {
        id: string,
        email: string,
        created_at: string,
        updated_at: string
    },
    token?: string,
    message?: string
}

const email = ref<string>("")
const password = ref<string>("")
const confirmPassword = ref<string>("")

const arePasswordsDifferent = ref<boolean>(false)
const isUserRegistered = ref<boolean>(false)

const resetDefaultState = () => {
    arePasswordsDifferent.value = false
    isUserRegistered.value = false
}

const register = async () => {
    resetDefaultState()
    if (password.value !== confirmPassword.value) {
        arePasswordsDifferent.value = true
        return
    }
    const url: string = "http://localhost:3333/api/user/register"

    const res: Response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    const jsonRes: JSONResponse = await res.json()

    if (jsonRes.message) {
        isUserRegistered.value = true
        return
    }

    store.updateUserInfo(jsonRes.user, jsonRes.token)
    await navigateTo("/home")
}
</script>

<template>
    <form @submit.prevent="register" class="register">
        <input type="email" placeholder="email" class="email" required v-model="email" />
        <div class="error" v-if="isUserRegistered">email is already used. please log in.</div>
        <input type="password" placeholder="password" class="password" required v-model="password" />
        <input type="password" placeholder="confirm password" class="confirm-password" required
            v-model="confirmPassword" />
        <div class="error" v-if="arePasswordsDifferent">passwords do not match. please try again.</div>
        <div class="login">already have an account?<NuxtLink to="/login">log in</NuxtLink>
        </div>
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

    .error {
        color: #dc2626;
        font-size: 16px;
    }
}
</style>