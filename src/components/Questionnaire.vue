<template>
  <div class="hfh-content bg-fantasy-light pt-8 p-4">
    <h2 ref="pageHeadings" tabindex="-1" class="scroll-mt-8">
      {{ area.title }}
    </h2>
    <slot></slot>
    <div class="grid gap-y-8">
      <div
        class="p-4 bg-white border border-white shadow"
        v-for="(question, questionIndex) in area.questions"
      >
        <ScaleQuestion
          v-if="question.type === 'scale'"
          :question="question"
          :htmlId="`${areaIndex}-${questionIndex}`"
          @update:question="
            (value: string) => updateQuestion(areaIndex, questionIndex, value)
          "
        ></ScaleQuestion>
        <RadioQuestion
          v-if="question.type === 'radio'"
          :question="question"
          :htmlId="`${areaIndex}-${questionIndex}`"
          @update:question="
            (value: string) => updateQuestion(areaIndex, questionIndex, value)
          "
        ></RadioQuestion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * This component renders the questions for a specific area of the ORKA questionnaire.
 * An area consists of several questions.
 */

import { useQuestionnaireState } from "@/composables/useQuestionnaireState";
import { computed } from "vue";
import ScaleQuestion from "./ScaleQuestion.vue";
import RadioQuestion from "./RadioQuestion.vue";

const props = defineProps({
  areaIndex: {
    type: Number,
    required: true,
  },
});

// Get the state from the questionnaire composable
const { areas } = useQuestionnaireState().state;

/**
 * Get the area for the current area index
 */
const area = computed(() => areas.value[props.areaIndex]);

/**
 * Update the value of a question
 *
 * @param areaIndex The index of the area the question belongs to
 * @param questionIndex The index of the question to update
 * @param value The new value for the question
 */
const updateQuestion = (
  areaIndex: number,
  questionIndex: number,
  value: string
) => {
  const question = areas.value[areaIndex].questions[questionIndex];
  question.value = value;
};
</script>

<style scoped></style>
