<template>
  <fieldset>
    <legend class="flex items-center gap-x-2">
      {{ question.id }}. {{ question.text }}
      <button
        :id="`${htmlId}-info-toggle`"
        :aria-expanded="showInfo"
        :aria-controls="infoId"
        @click="showInfo = !showInfo"
        class="hover:text-thunderbird-red"
      >
        <div class="hfh-sr-only">Erläuterungen</div>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </button>
    </legend>

    <div>
      <div :id="infoId" v-show="showInfo" class="my-2 py-2 px-4 bg-gray-light">
        <p class="mb-0">{{ question.comment }}</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-x-4 gap-y-4 mt-2">
      <div
        v-for="(option, index) in options"
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
          &nbsp;
          <span class="hfh-sr-only">{{ option.description }}</span></label
        >
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
import type { ScaleQuestion } from "@/types";
import type { PropType } from "vue";
import { useScaleOptions } from "@/composables/useScaleOptions";

const props = defineProps({
  htmlId: {
    type: String,
    required: true,
  },
  question: {
    type: Object as PropType<ScaleQuestion>,
    required: true,
  },
});

const { options } = useScaleOptions();

const infoId = `${props.htmlId}-info`;

const showInfo = ref(false);

const emit = defineEmits(["update:question"]);
</script>

<style scoped></style>
