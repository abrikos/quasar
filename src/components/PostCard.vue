<script setup lang="ts">
import UserAvatar from 'components/UserAvatar.vue';
import MarkDown from 'components/MarkDown.vue';
import { useAuthStore } from 'stores/auth-store';

const userStore = useAuthStore();
const {post} = withDefaults(defineProps<{ post: object }>(), {
  post: () => ({}),
});

</script>

<template lang="pug">
  q-card
    q-toolbar
      q-toolbar-title
        q-avatar
          user-avatar(:user="post.user")
        q-btn(:to="`/post-view/${post.id}`" flat no-caps) {{ post.title }}
    q-card-section
      mark-down.short(:text="post.short")
      small {{ post.date }}
    q-card-actions
      q-btn(size="sm" icon="edit" v-if="userStore.user?.id === post.user.id" :to="`/post-edit/${post.id}`")

</template>

<style scoped lang="sass">
</style>
