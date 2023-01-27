<template>
    <div class="clearfix" id="login_wrap">
      <div id="login">
        <h2 class="title">Login Page</h2>
        <div class="login-account">
          <span>Account: </span>
          <input
            type="text"
            placeholder="type in something"
            name="account"
            v-model.trim="username"
          />
        </div>
        <div class="login-password">
          <span>Password: </span>
          <input
            type="password"
            placeholder="type in something"
            name="password"
            v-model.trim="password"
          />
        </div>
        <p class="login-btn">
          <el-button id="loginBtn" type="primary" @click="getLogin">Login</el-button>
        </p>
        <p>Account = "Admin" is super admin</p>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    async login(user, pwd) {
      let res = await this.$api.login({'user': user, 'pwd': pwd});
      if(res.data.status === 200) {
        let obj = { username: user, token: res.data.token };
        this.setUser(obj);
        await this.$router.push('/');
      }
    },
    getLogin() {
      this.login(this.username, this.password);
    }
  }
};
</script>

<style scoped>

</style>
