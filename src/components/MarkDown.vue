<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ text: string }>(), {
  text: () => '',
});

const md = new MarkdownIt();

const renderedMarkdown = computed(() => {
  return md.render(props.text);
});
</script>

<template lang="pug">
  div(v-html="renderedMarkdown" )
</template>

<style scoped></style>
