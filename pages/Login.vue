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

const isEmailNotRegistered = ref<boolean>(false)
const doesPasswordMatchEmail = ref<boolean>(false)

const resetDefaultState = () => {
  isEmailNotRegistered.value = false
  doesPasswordMatchEmail.value = false
}

const login = async () => {
  resetDefaultState()
  const url: string = "http://localhost:3333/api/user/login"

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

  if (jsonRes.message.includes("User")) {
    isEmailNotRegistered.value = true
    return
  }

  if (jsonRes.message.includes("Password")) {
    doesPasswordMatchEmail.value = true
    return
  }

  store.updateUserInfo(jsonRes.user, jsonRes.token)
  await navigateTo("/home")
}
</script>

<template>
  <form @submit.prevent="login" class="login">
    <input type="email" placeholder="email" class="email" required v-model="email" />
    <div class="error" v-if="isEmailNotRegistered">user is not registered.</div>
    <input type="password" placeholder="password" class="password" required v-model="password" />
    <div class="error" v-if="doesPasswordMatchEmail">password does not match email.</div>
    <div class="register">don't have an account?<NuxtLink to="/register">register</NuxtLink></div>
    <button type="submit" class="submit">log in</button>
  </form>
</template>

<style lang="scss" scoped>
.login{
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
  .register {
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