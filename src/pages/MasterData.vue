<template>
  <div class="hfh-content bg-fantasy-light pt-8 p-4">
    <h2 ref="pageHeadings" tabindex="-1" class="scroll-mt-8">Stammdaten</h2>
    <div class="p-4 bg-white border border-white shadow grid gap-y-4">
      <HfhInput
        id="initials"
        label="Initialen des Kindes"
        v-model="initials"
      ></HfhInput>
      <HfhInput id="age" label="Alter des Kindes" v-model="age"></HfhInput>
      <HfhInput
        id="reviewer"
        label="Überprüfer:in"
        v-model="reviewer"
      ></HfhInput>
      <HfhInput
        id="date"
        label="Beobachtungszeitraum"
        v-model="observationPeriod"
      ></HfhInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HfhInput } from "@hfh-dlc/hfh-styleguide";
import { useQuestionnaireState } from "@/composables/useQuestionnaireState";

// Get the state from the questionnaire composable
const { initials, age, reviewer, observationPeriod } =
  useQuestionnaireState().state;
</script>

<style scoped></style>
