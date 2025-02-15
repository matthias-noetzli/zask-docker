import Home from "@/pages/Home.vue";
import Instructions from "@/pages/Instructions.vue";
import MasterData from "@/pages/MasterData.vue";
import Screening from "@/pages/Screening.vue";
import Report from "@/pages/Report.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useQuestionnaireState } from "@/composables/useQuestionnaireState";
import Team from "@/pages/Team.vue";
import Theory from "@/pages/Theory.vue";

const { areas } = useQuestionnaireState().state;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/screeningbogen",
      component: Screening,
      children: [
        { path: "", redirect: "/screeningbogen/anleitung" },
        {
          path: "anleitung",
          component: Instructions,
          meta: { title: "Anleitung" },
        },
        {
          path: "stammdaten",
          component: MasterData,
          meta: { title: "Stammdaten" },
        },
        {
          path: areas.value[0].slug,
          component: areas.value[0].component,
          meta: { title: areas.value[0].title },
        },
        {
          path: areas.value[1].slug,
          component: areas.value[1].component,
          meta: { title: areas.value[1].title },
        },
        {
          path: areas.value[2].slug,
          component: areas.value[2].component,
          meta: { title: areas.value[2].title },
        },
        {
          path: "auswertung",
          component: Report,
          meta: { title: "Auswertung" },
        },
      ],
    },
    {
      path: "/team",
      component: Team,
      meta: { title: "Team" },
    },
    {
      path: "/theoretischer-hintergrund",
      component: Theory,
      meta: { title: "Theoretischer Hintergrund" },
    },
  ],
});

const defaultTitle = "Zürcher Autismus Screening für das Kindesalter";

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - " + defaultTitle;
  } else {
    document.title = defaultTitle;
  }
  next();
});

export default router;
