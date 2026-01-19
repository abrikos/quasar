<template lang="pug">
  q-page
    div.row.items-center.justify-evenly
      div.col(v-for="post in posts" )
        post-card.col(:post="post")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'src/plugins/axios';
import { useAuthStore } from 'stores/auth-store';
import PostCard from 'components/PostCard.vue';

const userStore = useAuthStore();
const posts = ref([]);
onMounted(async () => {
  const res = await axios.get(`/post/`);
  if (!res.data.error) {
    posts.value = res.data;
  }
});
</script>
