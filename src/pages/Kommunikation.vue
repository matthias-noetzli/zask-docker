<template>
  <Questionnaire :areaIndex="0">
    <h3 class="mb-4">Skalierung</h3>
    <dl class="p-4 bg-white border border-white shadow">
      <div class="flex gap-x-2" v-for="option in options">
        <dt>{{ option.label }}</dt>
        <dd>{{ option.description }}</dd>
      </div>
    </dl>

    <h3 class="mb-4 mt-8">Kriterien</h3>
  </Questionnaire>
</template>

<script setup lang="ts">
import Questionnaire from "@/components/Questionnaire.vue";
import { useScaleOptions } from "@/composables/useScaleOptions";
const { options } = useScaleOptions();
</script>

<style scoped>
dt::after {
  content: ":";
}
</style>
