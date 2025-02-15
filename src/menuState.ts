import type { MenuItem } from "@hfh-dlc/hfh-styleguide";
import { ref } from "vue";
import type { Ref } from "vue";

/**
 * The menu state contains all the menu items of the header navigation.
 * It tracks which of those items are currently opened.
 */
export const menuState: Ref<{
  primaryItems: Array<MenuItem>;
  secondaryItems: Array<MenuItem>;
  tertiaryItems: Array<MenuItem>;
}> = ref({
  primaryItems: [
    {
      label: "Willkommen",
      link: {
        href: "/",
      },
    },
    {
      label: "Screeningbogen",
      link: {
        href: "/screeningbogen",
      },
    },
    {
      label: "Weitere Informationen",
      children: [
        {
          label: "Team",
          link: {
            href: "/team",
          },
        },
        {
          label: "ZASK als PDF",
          link: {
            href: "/zask.pdf",
            target: "_blank",
          },
        },
        {
          label: "Theoretischer Hintergrund",
          link: {
            href: "/theoretischer-hintergrund",
          },
        },
      ],
    },
  ],
  secondaryItems: [],
  tertiaryItems: [
    { label: "hfh.ch", link: { href: "https://hfh.ch", target: "_blank" } },
  ],
});
