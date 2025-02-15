<template>
  <div class="hfh-menu" :class="classes" @keydown.esc="onEscape" ref="menu">
    <ul class="hfh-menu__items hfh-menu__items--level-1">
      <li
        class="hfh-menu__item hfh-menu__item--level-1"
        v-for="(item, index) in items"
        :key="index"
        @focusout="onFocusOut($event, index)"
      >
        <template v-if="item.children">
          <button
            class="hfh-menu__entry hfh-menu__entry--level-1 hfh-menu__entry--expandable"
            :class="{
              'hfh-menu__entry--open': getItemOpen(index),
              'hfh-menu__entry--current': getItemCurrent(index),
            }"
            :aria-expanded="getItemOpen(index) || false"
            @click="toggleOpen(index)"
          >
            <span class="hfh-sr-only">{{ getItemToggleText(index) }}</span>
            {{ item.label }}
            <span class="hfh-sr-only" v-if="getItemCurrent(index)">
              {{ currentItemScreenReaderText }}</span
            >

            <HfhMenuCarret
              :isBig="isPrimaryMenu && isMobile"
              :direction="
                isMobile ? 'right' : getItemOpen(index) ? 'up' : 'down'
              "
            ></HfhMenuCarret>
          </button>
          <div class="hfh-menu__panel">
            <div class="hfh-menu__panel__inner">
              <button
                class="hfh-menu__close"
                @click="closeItemButton($event, index)"
                v-if="!isMobile"
                :aria-label="`Ausblenden ${item.label}`"
              >
                <HfhCrossIcon />
              </button>
              <div
                class="hfh-menu__level hfh-menu__level--2"
                :class="{
                  'hfh-menu__level--2--shadowed': levelTwoOpen,
                  'hfh-menu__level--open': getItemOpen(index),
                }"
              >
                <div class="hfh-menu__title">
                  {{ item.label }}
                </div>
                <ul
                  class="hfh-menu__items hfh-menu__items--level-2"
                  :style="{ minHeight: minHeight }"
                >
                  <li
                    v-for="(child, childIndex) in item.children"
                    :key="childIndex"
                    class="hfh-menu__item hfh-menu__item--level-2"
                    @mouseenter="isMobile ? null : openItem(index, childIndex)"
                    @mouseleave="isMobile ? null : closeItem(index, childIndex)"
                    @focusout="onFocusOut($event, index, childIndex)"
                  >
                    <template v-if="child.children">
                      <button
                        class="hfh-menu__entry hfh-menu__entry--level-2 hfh-menu__entry--expandable"
                        :class="{
                          'hfh-menu__entry--open': getItemOpen(
                            index,
                            childIndex
                          ),
                          'hfh-menu__entry--current': getItemCurrent(
                            index,
                            childIndex
                          ),
                        }"
                        :aria-expanded="getItemOpen(index, childIndex)"
                        @click="toggleOpen(index, childIndex)"
                      >
                        <span class="hfh-sr-only">{{
                          getItemToggleText(index, childIndex)
                        }}</span
                        >{{ child.label }}
                        <span
                          class="hfh-sr-only"
                          v-if="getItemCurrent(index, childIndex)"
                        >
                          {{ currentItemScreenReaderText }}</span
                        >
                        <HfhMenuCarret
                          :isBig="isPrimaryMenu && isMobile"
                        ></HfhMenuCarret>
                      </button>
                      <div
                        class="hfh-menu__level hfh-menu__level--3"
                        :class="{
                          'hfh-menu__level--open': getItemOpen(
                            index,
                            childIndex
                          ),
                        }"
                      >
                        <div class="hfh-menu__title" v-if="isMobile">
                          {{ child.label }}
                        </div>
                        <ul class="hfh-menu__items hfh-menu__items--level-3">
                          <template
                            v-for="(
                              grandchild, grandchildIndex
                            ) in child.children"
                            :key="grandchildIndex"
                          >
                            <li
                              class="hfh-menu__item hfh-menu__item--level-3"
                              v-if="grandchild.link"
                            >
                              <ZaskLink
                                class="hfh-menu__entry hfh-menu__entry--level-3"
                                :class="{
                                  'hfh-menu__entry--current': getItemCurrent(
                                    index,
                                    childIndex,
                                    grandchildIndex
                                  ),
                                }"
                                :to="grandchild.link.href"
                                :target="grandchild.link.target"
                                >{{ grandchild.label }}
                                <span
                                  class="hfh-sr-only"
                                  v-if="
                                    getItemCurrent(
                                      index,
                                      childIndex,
                                      grandchildIndex
                                    )
                                  "
                                >
                                  {{ currentItemScreenReaderText }}</span
                                >
                              </ZaskLink>
                            </li>
                          </template>
                        </ul>
                        <button
                          class="hfh-menu__close"
                          @click="closeItemButton($event, index, childIndex)"
                          v-if="isMobile"
                        >
                          <HfhMenuCarret
                            :isBig="isPrimaryMenu"
                            direction="left"
                          ></HfhMenuCarret>
                          Ausblenden {{ child.label }}
                        </button>
                      </div>
                    </template>
                    <template v-else>
                      <ZaskLink
                        class="hfh-menu__entry hfh-menu__entry--level-2"
                        :class="{
                          'hfh-menu__entry--current': getItemCurrent(
                            index,
                            childIndex
                          ),
                        }"
                        :to="child.link.href"
                        :target="child.link.target"
                        >{{ child.label }}
                        <span
                          class="hfh-sr-only"
                          v-if="getItemCurrent(index, childIndex)"
                        >
                          {{ currentItemScreenReaderText }}</span
                        ></ZaskLink
                      >
                    </template>
                  </li>
                </ul>
                <button
                  class="hfh-menu__close"
                  @click="closeItemButton($event, index)"
                  v-if="isMobile"
                >
                  <HfhMenuCarret
                    :isBig="isPrimaryMenu"
                    direction="left"
                  ></HfhMenuCarret>
                  Ausblenden {{ item.label }}
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <ZaskLink
            class="hfh-menu__entry hfh-menu__entry--level-1"
            :class="{
              'hfh-menu__entry--current': getItemCurrent(index),
            }"
            :to="item.link.href"
            :target="item.link.target"
          >
            {{ item.label }}
            <span class="hfh-sr-only" v-if="getItemCurrent(index)">
              {{ currentItemScreenReaderText }}</span
            >
          </ZaskLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * The HfhMenu component.
 * Copied and adapted from the HfhMenu component of the hfh-styleguide package in order to make it work with vue router.
 */

import type { PropType } from "vue";
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import debounce from "lodash.debounce";
import { HfhCrossIcon, HfhMenuCarret } from "@hfh-dlc/hfh-styleguide";
import type { MenuItem } from "@hfh-dlc/hfh-styleguide";
import cloneDeep from "lodash.clonedeep";
import ZaskLink from "@/components/ZaskLink.vue";

const emit = defineEmits(["updateItems"]);

const props = defineProps({
  items: {
    type: Array as PropType<Array<MenuItem>>,
    required: true,
  },
  currentItem: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    validator: function (value: string) {
      return ["primary", "secondary", "tertiary"].includes(value);
    },
    default: "primary",
  },
  breakpointMobileRem: {
    type: Number,
    default: 64,
  },
  closed: {
    type: Boolean,
    default: false,
  },
});

const isPrimaryMenu = props.variant === "primary";
const isMobile = ref(false);
const minHeight = ref("0px");

const onEscape = () => {
  if (!isMobile.value) {
    const element = openFirstLevelElement.value;
    closeMenu();
    if (element) {
      element.focus();
    }
  }
};

const onResize = debounce(() => {
  setIsMobile();
  setMinHeight();
}, 250);

onMounted(() => {
  setIsMobile();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const setIsMobile = () => {
  isMobile.value = !matchMedia(`(min-width: ${props.breakpointMobileRem}rem)`)
    .matches;
};

const setMinHeight = () => {
  const element = document.querySelector(
    ".hfh-menu__entry--level-2[aria-expanded=true]+.hfh-menu__level--3"
  );

  if (element) {
    minHeight.value = `${element.clientHeight}px`;
  } else {
    minHeight.value = "0px";
  }
};

const menu = ref();

const openFirstLevelElement = computed(() => {
  const index = props.items.findIndex((item) => item.open);
  if (index >= 0) {
    const entries = menu.value.querySelectorAll(".hfh-menu__entry--level-1");
    if (entries.length > index) {
      return entries[index];
    }
  }
  return null;
});

const levelTwoOpen = computed(() =>
  props.items.find(
    (item: MenuItem) =>
      item.children &&
      item.children.find((child) => child.open === true && child.children)
  )
);

const openItem = (index: number, childIndex?: number) => {
  let selector: string;
  const items = cloneDeep(props.items);
  if (childIndex != undefined) {
    const children = items[index].children;
    if (children) {
      children[childIndex].open = true;
    }
    selector = ".hfh-menu__level--3";
  } else {
    selector = ".hfh-menu__level--2";
  }
  items[index].open = true;
  emit("updateItems", items);
  nextTick(() => {
    const menu = document.querySelector(selector);
    if (menu) {
      menu.scrollTo(0, 0);
    }
    setMinHeight();
  });
};

const closeItem = (index: number, childIndex?: number) => {
  const items = cloneDeep(props.items);
  if (childIndex != undefined) {
    const children = items[index].children;
    if (children) {
      children[childIndex].open = false;
    }
  } else {
    items[index].open = false;
  }
  emit("updateItems", items);
  nextTick(() => setMinHeight());
};

const closeItemButton = (event: Event, index: number, childIndex?: number) => {
  const parentMenuItem = (event.currentTarget as HTMLElement)!.closest(
    ".hfh-menu__item"
  );
  if (parentMenuItem) {
    const button = parentMenuItem.querySelector<HTMLButtonElement>(
      "button.hfh-menu__entry"
    );
    if (button) {
      nextTick(() => button.focus());
    }
  }
  closeItem(index, childIndex);
};

const closeMenu = () => {};

watch(
  () => props.closed,
  (newValue) => {
    if (newValue == true) {
      closeMenu();
    }
  }
);

const getItemOpen = (index: number, childIndex?: number): boolean => {
  if (childIndex == undefined) {
    return props.items[index].open || false;
  }
  const children = props.items[index].children;
  return children ? children[childIndex].open || false : false;
};

const getItemToggleText = (index: number, childIndex?: number) => {
  return getItemOpen(index, childIndex) ? "Ausblenden" : "Anzeigen";
};

const isCurrentItem = (item: MenuItem): boolean => {
  return (
    (item.link && item.link.href == props.currentItem) ||
    (item.children
      ? item.children.some((child) => isCurrentItem(child))
      : false)
  );
};

const getItemCurrent = (
  index: number,
  childIndex?: number,
  grandchildIndex?: number
) => {
  if (!props.currentItem) {
    return false;
  }
  const baseItem = props.items[index];
  let item = baseItem;
  let childItem;
  let grandChildItem;
  if (childIndex != undefined && baseItem.children) {
    childItem = baseItem.children[childIndex];
    item = childItem;
    if (grandchildIndex != undefined && childItem.children) {
      grandChildItem = childItem.children[grandchildIndex];
      item = grandChildItem;
    }
  }
  return isCurrentItem(item);
};

const currentItemScreenReaderText = " (aktiv)";

const toggleOpen = (index: number, childIndex?: number) => {
  const newValue = !getItemOpen(index, childIndex);
  if (childIndex != undefined) {
    if (newValue) {
      openItem(index, childIndex);
    } else {
      openItem(index);
      closeItem(index, childIndex);
    }
  } else {
    if (newValue) {
      openItem(index);
    } else {
      closeItem(index);
    }
  }
};

const classes = computed(() => {
  const result = [`hfh-menu--${props.variant}`];
  if (isMobile.value) {
    result.push("hfh-menu--mobile");
  } else {
    result.push("hfh-menu--desktop");
  }
  return result;
});

const onFocusOut = (event: FocusEvent, index: number, childIndex?: number) => {
  const currentTarget = event.currentTarget as HTMLElement | null;
  const relatedTarget = event.relatedTarget as HTMLElement | null;
  if (isMobile.value) {
    if (
      currentTarget &&
      !currentTarget.contains(event.relatedTarget as HTMLElement | null)
    ) {
      closeItem(index, childIndex);
    }
  } else {
    const parent = currentTarget?.parentNode;
    if (
      currentTarget &&
      parent &&
      !currentTarget.contains(relatedTarget) &&
      parent.contains(relatedTarget)
    ) {
      closeItem(index, childIndex);
    }
  }
};
</script>
