<template>
  <div id="app">
    <div class="sticky-top">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">iRecon</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <div id="nav">
              <b-link class="pr-3" :to="'/'" v-text="$ml.get('navHome')" />
              <b-link
                v-if="$store.state.show_nav_dashboard"
                class="pr-3"
                :to="'/dashboard'"
                v-text="$ml.get('navDashboard')"
              />
              <b-link
                class="pr-3"
                :to="'/about'"
                v-text="$ml.get('navAbout')"
              />
              <b-link
                class="pr-3"
                :to="'/contact'"
                v-text="$ml.get('navContact')"
              />
            </div>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Lang" right>
              <div v-for="lang in $ml.list" :key="lang">
                <b-dropdown-item @click="$ml.change(lang)" v-text="lang" />
              </div>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <vue-particles
      color="#6F6767"
      :particleOpacity="0.2"
      class="particles-js"
    ></vue-particles>

    <div class="py-5">
      <router-view />
    </div>
  </div>
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-right: 30px;
}

#nav a {
  font-weight: bold;
  color: #ffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
