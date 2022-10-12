export const store = reactive({
    user: {},
    token: "",
    updateUserInfo(user, token) {
        this.user = user
        this.token = token
    }
})