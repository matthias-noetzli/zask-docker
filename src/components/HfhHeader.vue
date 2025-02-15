<template>
  <header class="hfh-header">
    <div class="hfh-header__mobile" @keydown.esc="closeMobileMenu">
      <div class="hfh-header__title-row">
        <div class="hfh-header__title">
          <slot name="logo-mobile"><HfhLogo /></slot>
        </div>
        <button
          v-if="showMobileMenu"
          class="hfh-header__nav-toggle"
          @click="toggleMobileMenuOpen"
          ref="toggleButton"
        >
          <div class="hfh-header__toggle-lines">
            <span
              v-for="index in 4"
              :key="index"
              class="hfh-header__toggle-line"
              aria-hidden="true"
            ></span>
          </div>
          <span class="hfh-header__toggle-text">Menü</span>
        </button>
      </div>
      <div
        v-if="isMobileMenuOpen"
        class="hfh-header__menu"
        ref="mobileMenu"
        :class="{ 'hfh-header__menu--open': isMobileMenuVisible }"
        @focusout="onMobileMenuFocusOut"
      >
        <div class="hfh-header__misc">
          <div>
            <HfhLanguageSelection
              v-if="languages.length > 1"
              :languages="languages"
              :isMobile="true"
            />
          </div>
          <HfhHeaderSearch :isMobile="true" v-if="search" @search="onSearch" />
        </div>
        <div class="hfh-header__menus">
          <div class="hfh-header__scroll-region">
            <template v-if="primaryItems.length > 0">
              <h2 class="hfh-sr-only">{{ primaryMenuTitle }}</h2>
              <HfhMenu
                class="hfh-header__primary-menu"
                :items="primaryItems"
                variant="primary"
                :currentItem="currentItem"
                @updateItems="onUpdatePrimaryItems"
              ></HfhMenu>
            </template>
            <template v-if="secondaryItems.length > 0">
              <h2 class="hfh-sr-only">
                {{ secondaryMenuTitle }}
              </h2>
              <HfhMenu
                class="hfh-header__secondary-menu"
                :items="secondaryItems"
                variant="secondary"
                :currentItem="currentItem"
                @updateItems="onUpdateSecondaryItems"
              ></HfhMenu>
            </template>
          </div>
          <template v-if="tertiaryItems.length > 0">
            <h2 class="hfh-sr-only">{{ tertiaryMenuTitle }}</h2>
            <HfhMenu
              class="hfh-header__tertiary-menu"
              :items="tertiaryItems"
              variant="tertiary"
              :currentItem="currentItem"
              @updateItems="onUpdateTertiaryItems"
            />
          </template>
        </div>
      </div>
      <div class="hfh-header__overlay"></div>
    </div>
    <div class="hfh-header__desktop">
      <HfhHeaderBar>
        <template #left>
          <slot name="header-bar-left">
            <HfhLanguageSelection
              v-if="languages.length > 1"
              :languages="languages"
              :isMobile="false"
            />
          </slot>
        </template>
        <template #right>
          <slot name="header-bar-right">
            <template v-if="tertiaryItems.length > 0">
              <h2 class="hfh-sr-only">{{ tertiaryMenuTitle }}</h2>
              <HfhMenu
                :items="tertiaryItems"
                variant="tertiary"
                class="hfh-header__tertiary-menu"
                :closed="isClosed[0]"
                @updateItems="onUpdateTertiaryItems"
                :currentItem="currentItem"
              />
            </template>
          </slot>
        </template>
      </HfhHeaderBar>
      <div class="hfh-header__title-row">
        <div class="hfh-header__title">
          <slot name="logo-desktop"><HfhLogo /></slot>
        </div>
        <div class="hfh-header__secondary-menu">
          <template v-if="secondaryItems.length > 0">
            <h2 class="hfh-sr-only">{{ secondaryMenuTitle }}</h2>
            <HfhMenu
              :items="secondaryItems"
              variant="secondary"
              :closed="isClosed[1]"
              @updateItems="onUpdateSecondaryItems"
              :currentItem="currentItem"
            ></HfhMenu>
            <HfhHeaderSearch
              v-if="search"
              :isMobile="false"
              :closed="isClosed[2]"
              @search="onSearch"
            />
          </template>
        </div>
      </div>
      <template v-if="primaryItems.length > 0">
        <h2 class="hfh-sr-only">{{ primaryMenuTitle }}</h2>
        <HfhMenu
          class="hfh-header__primary-menu"
          :items="primaryItems"
          variant="primary"
          :closed="isClosed[3]"
          @updateItems="onUpdatePrimaryItems"
          :currentItem="currentItem"
        ></HfhMenu>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * The HfhHeader component.
 * Copied and adapted from the HfhHeader component of the hfh-styleguide package in order to make it work with vue router.
 */
import type { PropType } from "vue";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useScrollLock } from "@vueuse/core";
import debounce from "lodash.debounce";

import HfhMenu from "@/components/HfhMenu.vue";

import {
  HfhHeaderBar,
  HfhLogo,
  HfhHeaderSearch,
  HfhLanguageSelection,
} from "@hfh-dlc/hfh-styleguide";
import type { LanguageOption, MenuItem } from "@hfh-dlc/hfh-styleguide";

const emit = defineEmits(["search", "updateItems"]);
const isLocked = useScrollLock(document.body);

const props = defineProps({
  primaryItems: {
    type: Array as PropType<Array<MenuItem>>,
    default: () => [],
  },
  secondaryItems: {
    type: Array as PropType<Array<MenuItem>>,
    default: () => [],
  },
  tertiaryItems: {
    type: Array as PropType<Array<MenuItem>>,
    default: () => [],
  },
  languages: {
    type: Array as PropType<Array<LanguageOption>>,
    default: () => [],
  },
  search: {
    type: Boolean,
    default: false,
  },
  currentItem: {
    type: String,
    default: null,
  },
  primaryMenuTitle: {
    type: String,
    required: true,
  },
  secondaryMenuTitle: {
    type: String,
    required: true,
  },
  tertiaryMenuTitle: {
    type: String,
    required: true,
  },
});

const isClosed = ref([
  props.tertiaryItems.findIndex((item) => item.open) === -1,
  props.secondaryItems.findIndex((item) => item.open) === -1,
  true,
  props.primaryItems.findIndex((item) => item.open) === -1,
]);

const toggleButton = ref();

const isMobileMenuOpen = ref(false);
const isMobileMenuVisible = ref(false);

const openMobileMenu = () => {
  isMobileMenuOpen.value = true;
  setTimeout(() => {
    isMobileMenuVisible.value = true;
  }, 0);
  isLocked.value = true;
};

const closeMobileMenu = () => {
  toggleButton.value?.focus();
  isMobileMenuVisible.value = false;
  setTimeout(() => {
    isMobileMenuOpen.value = false;
  }, 500);
  isLocked.value = false;
  emit("updateItems", {
    primaryItems: props.primaryItems.map((item) => ({
      ...item,
      open: false,
    })),
    secondaryItems: props.secondaryItems.map((item) => ({
      ...item,
      open: false,
    })),
    tertiaryItems: props.tertiaryItems.map((item) => ({
      ...item,
      open: false,
    })),
  });
};

const closeDesktopMenu = () => {
  emit("updateItems", {
    primaryItems: props.primaryItems.map((item) => ({
      ...item,
      open: false,
    })),
    secondaryItems: props.secondaryItems.map((item) => ({
      ...item,
      open: false,
    })),
    tertiaryItems: props.tertiaryItems.map((item) => ({
      ...item,
      open: false,
    })),
  });
};

const hasOpenItems = computed(() => {
  return (
    props.tertiaryItems.findIndex((item) => item.open) !== -1 ||
    props.secondaryItems.findIndex((item) => item.open) !== -1 ||
    props.primaryItems.findIndex((item) => item.open) !== -1
  );
});

watch(hasOpenItems, () => {
  isClosed.value = [
    props.tertiaryItems.findIndex((item) => item.open) === -1,
    props.secondaryItems.findIndex((item) => item.open) === -1,
    true,
    props.primaryItems.findIndex((item) => item.open) === -1,
  ];
  if (
    isMobile.value &&
    isClosed.value.findIndex((value) => {
      return value === false;
    }) !== -1
  ) {
    openMobileMenu();
  }
});

const isItemOpen = (item: MenuItem) => {
  if (item.open) {
    return true;
  }
  if (item.children) {
    return item.children.some(isItemOpen);
  }
  return false;
};

const closeItem = (item: MenuItem) => {
  if (item.children) {
    item.children.forEach(closeItem);
  }
  item.open = false;
};

const onUpdatePrimaryItems = (items: Array<MenuItem>) => {
  let secondaryItems = props.secondaryItems;
  let tertiaryItems = props.tertiaryItems;
  if (items.some(isItemOpen)) {
    secondaryItems = secondaryItems.map((item) => {
      closeItem(item);
      return item;
    });
    tertiaryItems = tertiaryItems.map((item) => {
      closeItem(item);
      return item;
    });
  }

  emit("updateItems", {
    primaryItems: items,
    secondaryItems: secondaryItems,
    tertiaryItems: tertiaryItems,
  });
};

const onUpdateSecondaryItems = (items: Array<MenuItem>) => {
  let primaryItems = props.primaryItems;
  let tertiaryItems = props.tertiaryItems;
  if (items.some(isItemOpen)) {
    primaryItems = primaryItems.map((item) => {
      closeItem(item);
      return item;
    });
    tertiaryItems = tertiaryItems.map((item) => {
      closeItem(item);
      return item;
    });
  }
  emit("updateItems", {
    primaryItems: primaryItems,
    secondaryItems: items,
    tertiaryItems: tertiaryItems,
  });
};

const onUpdateTertiaryItems = (items: Array<MenuItem>) => {
  let primaryItems = props.primaryItems;
  let secondaryItems = props.secondaryItems;
  if (items.some(isItemOpen)) {
    primaryItems = primaryItems.map((item) => {
      closeItem(item);
      return item;
    });
    secondaryItems = secondaryItems.map((item) => {
      closeItem(item);
      return item;
    });
  }

  emit("updateItems", {
    primaryItems: primaryItems,
    secondaryItems: secondaryItems,
    tertiaryItems: items,
  });
};

const toggleMobileMenuOpen = () => {
  if (isMobileMenuOpen.value) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
};

const mobileMenu = ref();
const onMobileMenuFocusOut = (event: FocusEvent) => {
  if (event.relatedTarget && !mobileMenu.value.contains(event.relatedTarget)) {
    closeMobileMenu();
  }
};

const showMobileMenu = computed(() => {
  return (
    props.primaryItems.length > 0 ||
    props.secondaryItems.length > 0 ||
    props.tertiaryItems.length > 0 ||
    props.languages.length > 0 ||
    props.search
  );
});

const onSearch = (searchText: string) => {
  emit("search", searchText);
};

const isMobile = ref(false);

const onResize = debounce(() => {
  const wasMobile = isMobile.value;
  setIsMobile();
  if (wasMobile && !isMobile.value) {
    closeMobileMenu();
  }
  if (!wasMobile && isMobile.value) {
    closeDesktopMenu();
  }
}, 250);

onMounted(() => {
  setIsMobile();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const setIsMobile = () => {
  isMobile.value = !matchMedia(`(min-width: 64rem)`).matches;
};
</script>

<style scoped></style>
