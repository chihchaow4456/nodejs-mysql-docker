<template>
    <nav class="pt-5 px-md-4 col-md-2 d-md-block ml-3">
            <ul class="nav flex-column">
              <router-link class="nav-link text-secondary" :to="{name: 'articles'}">
                    Article
              </router-link>
              <router-link class="nav-link text-secondary" :to="{name: 'posts'}">
                    Posts
                </router-link>
              <router-link class="nav-link text-secondary" :to="{name: 'add'}">
                    Add
                </router-link>
                <router-link class="nav-link text-secondary" :to="{name: 'setting'}">
                    Setting
                </router-link>
            </ul>
    </nav>
</template>
