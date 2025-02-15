<template>
  <fieldset>
    <legend>{{ question.id }}. {{ question.text }}</legend>

    <div class="grid gap-y-4 mt-2">
      <div
        v-for="(option, index) in props.question.options"
        class="hfh-radio-fieldset__option flex items-center gap-x-2"
      >
        <input
          type="radio"
          :id="`${htmlId}-radio-${index}`"
          :name="`${htmlId}-radios`"
          :value="option.value"
          class="hfh-radio-button block"
          v-model="question.value"
        />
        <label class="hfh-radio-button-label" :for="`${htmlId}-radio-${index}`"
          ><span>{{ option.label }}</span>
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
/**
 * Component to display a question with a scale of 1 to 4.
 * Also includes a button to show an explanation of the scale below the question.
 */
import { ref } from "vue";
import type { RadioQuestion } from "@/types";
import type { PropType } from "vue";

const props = defineProps({
  htmlId: {
    type: String,
    required: true,
  },
  question: {
    type: Object as PropType<RadioQuestion>,
    required: true,
  },
});

const infoId = `${props.htmlId}-info`;

const showInfo = ref(false);

const emit = defineEmits(["update:question"]);
</script>

<style scoped></style>
