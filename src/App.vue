<template>
  <div>
    <header class="print:hidden">
      <HfhHeader
        :primaryItems="menuState.primaryItems"
        :secondaryItems="menuState.secondaryItems"
        :tertiaryItems="menuState.tertiaryItems"
        @updateItems="onUpdateItems"
        :currentItem="currentItem"
        primaryMenuTitle="Hauptmenü"
        secondaryMenuTitle=""
        tertiaryMenuTitle="Service-Links"
      >
        <template #header-bar-left>Ein Projekt der HfH</template>
        <template #logo-desktop
          ><div class="flex gap-x-4 items-center">
            <HfhLogo /> Zürcher Autismus Screening für das Kindesalter
          </div></template
        >
      </HfhHeader>
    </header>
    <main
      class="xl:max-w-container xl:mx-auto pb-20 mt-3 lg:mt-20 print:mt-4 print:pb-0"
    >
      <RouterView />
    </main>
    <footer class="print:hidden">
      <HfhFooter>
        <template #tagline
          ><p>
            wissenschaftsbasiert, praxisorientiert, breit verankert
          </p></template
        >
        <template #contact-address
          ><p>
            Schaffhauserstrasse 239<br />Postfach 5850<br />CH-8050 Zürich
          </p></template
        >
        <template #contact-other>
          <p>T +41 44 317 11 11</p>
          <p><a href="mailto:info@hfh.ch">info@hfh.ch</a></p>
        </template>
        <template #socials>
          <HfhSocialBlock
            icon="facebook"
            href="https://www.facebook.com/hfh.edu"
          />
          <HfhSocialBlock
            icon="youtube"
            href="https://www.youtube.com/user/hfhzuerich"
          />
          <HfhSocialBlock
            icon="linkedin"
            href="https://www.linkedin.com/company/hfh.edu"
          />
          <HfhSocialBlock
            icon="instagram"
            href="https://www.instagram.com/hfh_edu/"
          />
          <HfhSocialBlock
            icon="issuu"
            href="https://issuu.com/hochschule_fuer_heilpaedagogik"
          />
        </template>
        <template #copyright
          >© Copyright {{ new Date().getFullYear() }} HfH</template
        >
        <template #links>
          <a
            href="https://www.hfh.ch/kontakt/datenschutzerklaerung#satwebsites"
            target="_blank"
            >Datenschutz</a
          >
        </template>
      </HfhFooter>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * The App component is the main component of the application.
 * It contains the header, footer and a router view the different pages.
 */
import HfhHeader from "@/components/HfhHeader.vue";
import { HfhFooter, HfhSocialBlock, HfhLogo } from "@hfh-dlc/hfh-styleguide";
import type { MenuItem } from "@hfh-dlc/hfh-styleguide";
import { computed, onBeforeMount, onBeforeUnmount } from "vue";
import { menuState } from "@/menuState";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useQuestionnaireState } from "@/composables/useQuestionnaireState";
const { isDirty } = useQuestionnaireState();

/**
 * Make sure the user is asked if they want to leave the page when they have unsaved changes
 *
 * @param event Event that is triggered when the user tries to leave the page
 */
const onBeforeUnload = (event: BeforeUnloadEvent) => {
  if (isDirty()) {
    event.preventDefault();
  }
};

// Add an event listener to the window to ask the user if they want to leave the page when they have unsaved changes
onBeforeMount(() => {
  window.addEventListener("beforeunload", onBeforeUnload);
});

// Remove the event listener when the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", onBeforeUnload);
});

// Everytime the route changes, close all menu items
useRouter().afterEach(() => {
  menuState.value.primaryItems.forEach((item) => {
    item.open = false;
  });
  menuState.value.secondaryItems.forEach((item) => {
    item.open = false;
  });
  menuState.value.tertiaryItems.forEach((item) => {
    item.open = false;
  });
});

const route = useRoute();
const currentItem = computed(() => {
  return "/" + route.path.split("/")[1];
});

/**
 * Update the menuState when the menu items are updated
 *
 * @param items Object containing the items for the different menus of the HfhHeader
 */
const onUpdateItems = (items: {
  primaryItems: Array<MenuItem>;
  secondaryItems: Array<MenuItem>;
  tertiaryItems: Array<MenuItem>;
}) => {
  menuState.value.primaryItems = items.primaryItems;
  menuState.value.secondaryItems = items.secondaryItems;
  menuState.value.tertiaryItems = items.tertiaryItems;
};
</script>

<style scoped lang="sass"></style>
