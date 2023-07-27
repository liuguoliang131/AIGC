export let TOKEN = 'hanhou-ai-pc-token'
export let USER_INFO = 'hanhou-ai-pc-userInfo'

if (process.env.VUE_APP_SELF_ENV !== 'prod') {
  TOKEN = 'hanhou-ai-pc-token-test'
  USER_INFO = 'hanhou-ai-pc-userInfo-test'
}

