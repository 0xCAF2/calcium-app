import { createRouter, createWebHistory } from 'vue-router'
import Home from './home/Home.vue'
import Intro from './intro/Intro.vue'

export const routeName = {
  home: 'home',
  intro: 'intro',
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: routeName.home, component: Home },
    { path: '/intro', name: routeName.intro, component: Intro },
  ],
})
