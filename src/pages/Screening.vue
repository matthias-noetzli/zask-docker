<template>
  <div>
    <div class="print:hidden sm:px-4 xl:px-0">
      <h1 class="px-4 sm:px-0">Screeningbogen</h1>
      <div class="text-base p-4 bg-fantasy-light">
        <nav>
          <ol class="list-decimal list-inside">
            <li v-for="link in links">
              <ZaskLink :to="link.to" class="hover:text-thunderbird-red">{{
                link.text
              }}</ZaskLink>
            </li>
          </ol>
        </nav>
        <ResetButton></ResetButton>
      </div>
    </div>
    <div class="my-8">
      <RouterView></RouterView>
    </div>
    <div class="print:hidden p-4 flex">
      <ZaskLink
        v-if="!isFirstPage"
        :to="previousLink.to"
        class="hfh-button hfh-button--secondary hfh-button--flipped hfh-button--icon-arrow hfh-button--animated"
      >
        Zurück
      </ZaskLink>
      <ZaskLink
        :to="nextLink.to"
        class="ml-auto hfh-button hfh-button--secondary hfh-button--icon-arrow hfh-button--animated"
        v-if="!isLastPage"
      >
        Weiter
      </ZaskLink>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * This component is the main entry point for the ORKA questionnaire.
 * It contains several sub-pages.
 */

import ResetButton from "@/components/ResetButton.vue";
import ZaskLink from "@/components/ZaskLink.vue";
import { useQuestionnaireState } from "@/composables/useQuestionnaireState";
import { computed } from "vue";
import { useRoute } from "vue-router";

// Get the state from the questionnaire composable
const state = useQuestionnaireState().state;

// Define the links for the questionnaire navigation
const links = computed(() => {
  const result = [];

  // Get the number of filled in fields for the master data page
  const { initials, age, reviewer, observationPeriod } = state;
  const masterDataQuestionCount = 4;
  const masterDataAnsweredQuestionCount = [
    initials,
    age,
    reviewer,
    observationPeriod,
  ].filter((question) => question.value !== "").length;

  // Create a link to the instructions page
  result.push({
    to: "/screeningbogen/anleitung",
    text: `Anleitung`,
  });

  // Create a link to the master data page
  result.push({
    to: "/screeningbogen/stammdaten",
    text: `Stammdaten (${masterDataAnsweredQuestionCount}/${masterDataQuestionCount})`,
  });

  // For each page of the questionnaire, calculate the number of answered questions and create a link to that page
  state.areas.value.forEach((area) => {
    const questionCount = area.questions.length;
    const answeredQuestionCount = area.questions.filter(
      (question) => question.value !== ""
    ).length;
    result.push({
      to: `/screeningbogen/${area.slug}`,
      text: `${area.title} (${answeredQuestionCount}/${questionCount})`,
    });
  });

  // Create a link to the result page
  result.push({ to: "/screeningbogen/auswertung", text: "Auswertung" });

  return result;
});

/**
 * Check if the current page is the first page
 */
const isFirstPage = computed(() => {
  if (links.value.length === 0) {
    return true;
  }
  const route = useRoute();
  const firstLink = links.value[0];
  return route.path === firstLink.to;
});

/**
 * Check if the current page is the last page
 */
const isLastPage = computed(() => {
  if (links.value.length === 0) {
    return true;
  }
  const route = useRoute();
  const lastLink = links.value[links.value.length - 1];
  return route.path === lastLink.to;
});

/**
 * Get the link to the previous page
 */
const previousLink = computed(() => {
  const route = useRoute();
  const index = links.value.findIndex((link) => link.to === route.path);
  if (index === -1 || index === 0) {
    return { to: "", text: "" };
  }
  return links.value[index - 1];
});

/**
 * Get the link to the next page
 */
const nextLink = computed(() => {
  const route = useRoute();
  const index = links.value.findIndex((link) => link.to === route.path);
  if (index === -1 || index === links.value.length - 1) {
    return { to: "", text: "" };
  }
  return links.value[index + 1];
});
</script>

<style scoped>
.router-link-active {
  @apply text-thunderbird-red;
  @apply font-bold;
}
</style>
