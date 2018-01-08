<template>
    <div class="container h-100">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-4">

                <div class="card card-body bg-dark text-light border-light">
                    <h4 class="card-title">Sign In</h4>
                    <p class="card-text" v-if="$route.query.redirect">You need to login first.</p>

                      <form @submit.prevent="login">
                          <fieldset>

                              <!-- <FormInput></FormInput> -->

                              <div class="form-group">
                                  <input class="form-control" placeholder="E-mail" v-model="email" type="text">
                              </div>

                              <div class="form-group">
                                  <input class="form-control" placeholder="Password" v-model="password" type="password" value="">
                              </div>

                              <FormSubmit></FormSubmit>

                              <p v-if="error" class="error">Bad login information</p>

                          </fieldset>

                      </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
  // import auth from '../../../services/auth.js'
  import FormInput from '@/components/FormInput'
  import FormSubmit from '@/components/FormSubmit'
  import store from '@/store'

  export default {
    data () {
      return {
        email: 'alex@foo.bar',
        password: 'abc123abc123',
        remember: false,
        loading: false,
        error: false
      }
    },

    components: {
      FormInput,
      FormSubmit
    },

    methods: {
      isValid () {
        return !(this.email === '' || this.password === '')
      },
      login () {
        if (!this.isValid()) {
          return
        }

        return store.dispatch('auth/authenticate', { username: this.email, password: this.password })

        // let data = {
        //   email: this.email,
        //   password: this.password,
        //   remember: this.remember
        // }

        // this.loading = true

        // auth.login(this.email, this.password, (loggedIn) => {
        //   this.loading = false

        //   if (loggedIn) {
        //     this.$router.replace(this.$route.query.redirect || '/')
        //   } else {
        //     this.error = true
        //   }
        // })
      }
    }
  }
</script>
