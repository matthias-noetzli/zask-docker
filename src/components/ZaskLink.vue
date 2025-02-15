<template>
  <a
    v-if="isExternalLink"
    :href="to"
    :target="target"
    rel="noopener noreferrer"
  >
    <slot></slot>
  </a>
  <RouterLink
    v-else
    class="hfh-link"
    :to="to"
    :target="target"
    rel="noopener noreferrer"
    ><slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
/**
 * Link component that uses the RouterLink component for internal links and an anchor tag for external links.
 */
import { computed, type ComputedRef } from "vue";
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: null,
  },
});

const isExternalLink: ComputedRef<boolean> = computed(() => {
  return (
    new URL(document.baseURI).origin !==
      new URL(props.to, document.baseURI).origin || props.target === "_blank"
  );
});
</script>
