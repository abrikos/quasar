<script setup lang="ts">
import axios from 'src/plugins/axios';
import { useAuthStore } from 'stores/auth-store';
import { useQuasar } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MarkDown from 'components/MarkDown.vue';
import PostView from 'components/PostView.vue';

const router = useRouter();
const route = useRoute();
const newPost = computed(() => !route.params.id);
const userStore = useAuthStore();
const $q = useQuasar();
const post = ref({});

onMounted(load);

async function load() {
  if (!route.params.id) {
    post.value = {};
    return;
  }
  const res = await axios.get(`/post/${route.params.id}`);
  post.value = res.data;
}

watch(() => route.params.id, load);

async function onSubmit() {
  if (!userStore.user) return;
  const res = newPost.value
    ? await axios.post(`/post/`, post.value)
    : await axios.patch(`/post/${route.params.id}/`, post.value);
  if (res.status < 400) {
    $q.notify({ message: 'Success', color: 'green' });
    if (newPost.value) {
      await router.push('/post-edit/' + res.data.id);
    }
  }
}
</script>

<template lang="pug">
  div.row.q-gutter-md
    div.col-sm.q-pa-lg
      q-form(@submit="onSubmit")
        q-input(v-model="post.title" label="Title" dense outlined)
        br
        q-input(v-model="post.poster" label="Poster image url" dense outlined)
        br
        q-input(v-model="post.short" label="Short" type="textarea" dense outlined)
        br
        q-input(v-model="post.body" label="Body" type="textarea" filled autogrow dense outlined)
        a(href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/" target="_blank") Mark down rules
        q-toggle( v-model="post.published" label="Published")
        div {{ post.date  }}
        q-btn(type="submit") Save
    div.col-sm

      post-view(:post="post")
</template>

<style scoped></style>
