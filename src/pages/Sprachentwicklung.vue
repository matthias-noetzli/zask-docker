<template>
  <Questionnaire :areaIndex="2">
    <div class="p-4 bg-white border border-white shadow mb-8">
      <p class="mb-4">
        Parallel zur Erfassung autismusspezifischer Besonderheiten werden im
        ICD-11 der kognitive und verbalsprachliche Entwicklungsstand betrachtet.
        Dies dient einer differenzierten Beschreibung der Kinder innerhalb des
        Autismus-Spektrums.
      </p>
      <p class="mb-0">Wählen Sie die zutreffende Aussage:</p>
    </div>
  </Questionnaire>
</template>

<script setup lang="ts">
import Questionnaire from "@/components/Questionnaire.vue";
</script>

<style scoped></style>
