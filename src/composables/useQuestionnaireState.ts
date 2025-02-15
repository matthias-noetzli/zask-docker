/**
 * Composable to manage the state of the questionnaire form.
 */

import { markRaw, ref, type Ref } from "vue";
import type { Area, Question, RadioQuestion, ScaleQuestion } from "@/types";
import Kommunikation from "@/pages/Kommunikation.vue";
import Interessen from "@/pages/Interessen.vue";
import Sprachentwicklung from "@/pages/Sprachentwicklung.vue";

// The data of the master data page
const initials = ref("");
const age = ref("");
const reviewer = ref("");
const observationPeriod = ref("");

// The different areas of the questionnaire, each containing questions
const area1: Area<ScaleQuestion> = {
  title:
    "Besonderheiten im Diagnosebereich «Soziale Kommunikation und Interaktion» ",
  slug: "soziale-kommunikation-und-interaktion",
  type: "scale",
  component: markRaw(Kommunikation),
  questions: [
    {
      type: "scale",
      text: "Reaktion auf verbale Ansprache",
      comment:
        "Wie reagiert das Kind auf eine verbale Ansprache, z.B. seinen Namen, eine Handlungsaufforderung oder eine gezielte Aufmerksamkeitslenkung?",
      value: "",
    },
    {
      type: "scale",
      text: "Reaktion auf nonverbale Ansprache",
      comment:
        "Wie reagiert das Kind auf eine nonverbale (mimische oder gestische) Ansprache, z.B. eine Handlungsaufforderung oder eine gezielte Aufmerksamkeitslenkung?",
      value: "",
    },
    {
      type: "scale",
      text: "Einsatz von Gestik zur Kommunikation",
      comment:
        "Inwieweit setzt das Kind Handbewegungen oder Gesten in kommunikativen Situationen zielgerichtet ein?",
      value: "",
    },
    {
      type: "scale",
      text: "Einsatz von Mimik zur Kommunikation",
      comment:
        "Inwieweit setzt das Kind Mimik in kommunikativen Situationen zielgerichtet ein?",
      value: "",
    },
    {
      type: "scale",
      text: "Einsatz von Blickkontakt zur Kommunikation",
      comment:
        "Inwieweit setzt das Kind Blickkontakt in kommunikativen Situationen zielgerichtet ein?",
      value: "",
    },
    {
      type: "scale",
      text: "Herstellung gemeinsamer Aufmerksamkeit",
      comment:
        "Wie nimmt das Kind Kontakt auf, um die Aufmerksamkeit des Gegenübers zu gewinnen, z.B. um etwas zu zeigen?",
      value: "",
    },
    {
      type: "scale",
      text: "Initiierung einer gemeinsamen Handlung",
      comment:
        "Wie nimmt das Kind Kontakt auf, um eine gemeinsame Aktivität, z.B. ein gemeinsames Spiel, zu beginnen?",
      value: "",
    },
    {
      type: "scale",
      text: "Gemeinsame Aktivitäten mit Gleichaltrigen",
      comment:
        "Wie initiiert das Kind gemeinsame Aktivitäten, z.B. Spielhandlungen, mit Gleichaltrigen?",
      value: "",
    },

    {
      type: "scale",
      text: "Sichtbarmachen eigener Gefühle",
      comment:
        "Inwieweit gelingt es dem Kind, eigene Gefühle für das Gegenüber erkennbar, verbal oder nonverbal zu zeigen?",
      value: "",
    },
    {
      type: "scale",
      text: "Reaktion auf Gefühlsausdrücke anderer Personen",
      comment:
        "Inwieweit reagiert das Kind auf sichtbare Gefühlsausdrücke, z.B. Lachen, Weinen, bei anderen Kindern oder Erwachsenen?",
      value: "",
    },
    {
      type: "scale",
      text: "Einnahme der Perspektive anderer Personen",
      comment:
        "Inwieweit kann das Kind unausgesprochene Absichten des Gegenübers oder mögliche Reaktionen des Gegenübers auf das eigene Verhalten erkennen?",
      value: "",
    },
    {
      type: "scale",
      text: "Verstehen nicht wörtlich gemeinter Sprache",
      comment:
        "Inwieweit zeigt das Kind passende Reaktionen auf nicht wörtlich zu verstehende, sprachliche Ausdrücke wie Metaphern, Redewendungen oder Ironie, die auf sein Verstehen dieser Ausdrücke hinweisen?",
      value: "",
    },
    {
      type: "scale",
      text: "Verstehen sozialer Regeln und Kontexte",
      comment:
        "Inwieweit zeigt das Kind Verhaltensweisen, die sein Verstehen sozialer Regeln in einem bestimmten Kontext erkennen lassen, z.B. der Gruppenregeln in Kindergarten und Schule?",
      value: "",
    },
    {
      type: "scale",
      text: "Initiierung und Aufrechterhaltung eines wechselseitigen Gesprächs",
      comment:
        "Bei verbal kommunizierenden Kindern: Inwieweit gelingt es dem Kind, ein Gespräch, an dem beide Gesprächspartner:innen wechselseitig beteiligt sind, zu beginnen und aufrechtzuerhalten?",
      value: "",
    },
  ],
};

const area2: Area<ScaleQuestion> = {
  title:
    "Besonderheiten im Diagnosebereich «Interessen, Aktivitäten und Verhaltensmuster»",
  slug: "interessen-aktivitaten-und-verhaltensmuster",
  type: "scale",
  component: markRaw(Interessen),
  questions: [
    {
      type: "scale",
      text: "Ritualisierte, wiederkehrende Verhaltensweisen",
      comment:
        "Inwieweit zeigt das Kind im Alltag regelmässig wiederkehrende Verhaltensweisen, z.B. das Aneinanderreihen von Gegenständen oder das wiederholte Betätigen des Lichtschalters?",
      value: "",
    },
    {
      type: "scale",
      text: "Sich wiederholende, gleichförmige Körperbewegungen",
      comment:
        "Inwieweit zeigt das Kind regelmässig wiederkehrende motorische Bewegungen, z.B. der Finger, der Hände oder das Schaukeln des Oberkörpers?",
      value: "",
    },

    {
      type: "scale",
      text: "Intensität der Beschäftigung mit ausgewählten Gegenständen",
      comment:
        "Inwieweit beschäftigt sich das Kind zeitlich intensiv und nicht erkennbar funktional mit einem oder mehreren ausgewählten Gegenständen, z.B. Wedeln eines Fadens, Drehen eines Bauklotzes?",
      value: "",
    },
    {
      type: "scale",
      text: "Intensität der Beschäftigung mit einem oder mehreren speziellen oder ungewöhnlichen Interessen",
      comment:
        "Inwieweit beschäftigt sich das Kind wiederholt und zeitlich intensiv mit einem oder mehreren ausgewählten Themen, z.B. Dinosaurier, Planeten, Waschmaschinen?",
      value: "",
    },
    {
      type: "scale",
      text: "Aufmerksamkeit für Details oder Teilaspekte von Gegenständen oder Situationen",
      comment:
        "Inwieweit ist das Kind wiederholt besonders fokussiert auf einzelne Details bei Gegenständen, z.B. auf Räder, Muster, Formen bzw. bei Situationen, z.B. auf kleine Veränderungen?",
      value: "",
    },
    {
      type: "scale",
      text: "Fantasievolles und symbolisches Spiel",
      comment:
        "Inwieweit spielt das Kind «Als-Ob-Spiele», Rollenspiele oder andere fantasievolle Spiele?",
      value: "",
    },
    {
      type: "scale",
      text: "Anpassungsfähigkeit an neue Umgebungen und Situationen",
      comment:
        "Wie reagiert das Kind auf den Wechsel einer Umgebung oder anderer Bedingungen einer Situation, z.B. einen Ortwechsel oder den Wechsel einer Betreuungsperson?",
      value: "",
    },
    {
      type: "scale",
      text: "Reaktion auf unvorhergesehene Ereignisse",
      comment:
        "Wie reagiert das Kind auf kurzfristige und unerwartete Anpassungen oder Ereignisse, z.B. im Tagesablauf oder bei einer Aktivität?",
      value: "",
    },
    {
      type: "scale",
      text: "Festhalten an gewohnten Abläufen und Ritualen",
      comment:
        "Inwieweit fordert das Kind eine stets gleichbleibende Umsetzung von bekannten Abläufen und Ritualen ein, z.B. beim Anziehen, Begrüssungsritual oder Wegstrecken?",
      value: "",
    },
    {
      type: "scale",
      text: "Festhalten an vorgegebenen Regeln",
      comment:
        "Wie reagiert das Kind auf situative Ausnahmen von bekannten Regeln, z.B. bei Spielregeln oder Verhaltensregeln?",
      value: "",
    },
    {
      type: "scale",
      text: "Reaktion auf sensorische Reize",
      comment:
        "Inwieweit zeigt das Kind deutliche Reaktionen auf sensorische Reize, z.B. auf Geräusche, Gerüche, Lichteffekte bzw. eine reduzierte Empfindlichkeit, z.B. in Bezug auf Temperaturunterschiede oder Schmerzreize?",
      value: "",
    },
    {
      type: "scale",
      text: "Interesse an bestimmten sensorischen Reizen",
      comment:
        "Inwieweit zeigt das Kind ein besonderes Interesse an ausgewählten sensorischen Reizen, z.B. taktile Reize beim Befühlen von Oberflächen oder visuellen Reizen bei der gezielten Suche nach Lichtquellen?",
      value: "",
    },
  ],
};

const area3: Area<RadioQuestion> = {
  title: "Sprachentwicklung und kognitive Entwicklung",
  slug: "sprachentwicklung-und-kognitive-entwicklung",
  type: "radio",
  component: markRaw(Sprachentwicklung),
  questions: [
    {
      type: "radio",
      text: "Sprachentwicklung",
      options: [
        {
          label:
            "Das Kind zeigt keine oder leichte Einschränkungen in der Verbalsprache.",
          value: "0",
        },
        {
          label:
            "Das Kind zeigt deutliche Einschränkungen in der Verbalsprache.",
          value: "1",
        },
        {
          label: "Das Kind zeigt keine Verbalsprache.",
          value: "2",
        },
      ],
      value: "",
    },
    {
      type: "radio",
      text: "Kognitive Entwicklung",
      options: [
        {
          label:
            "Die kognitive Entwicklung des Kindes ist nicht beeinträchtigt.",
          value: "0",
        },
        {
          label: "Die kognitive Entwicklung des Kindes ist beeinträchtigt.",
          value: "1",
        },
        {
          label:
            "Die kognitive Entwicklung des Kindes lässt sich nicht bewerten.",
          value: "2",
        },
      ],
      value: "",
    },
  ],
};

const areas: Ref<Array<Area<Question>>> = ref([area1, area2, area3]);

// Assign a numeric id to each question
let questionId = 1;
areas.value.forEach((area) => {
  area.questions.forEach((question) => {
    question.id = questionId;
    questionId++;
  });
});

const state = {
  initials,
  age,
  reviewer,
  observationPeriod,
  areas,
};

/**
 * Resets the state of the questionnaire form to its initial values.
 */
const resetState = () => {
  initials.value = "";
  age.value = "";
  reviewer.value = "";
  observationPeriod.value = "";
  areas.value.forEach((area) => {
    area.questions.forEach((question) => {
      question.value = "";
      if ("comment" in question) {
        question.comment = "";
      }
    });
  });
};

/**
 * Checks whether the form has been modified from its initial state.
 */
const isDirty: () => boolean = () => {
  return (
    initials.value !== "" ||
    age.value !== "" ||
    reviewer.value !== "" ||
    observationPeriod.value !== "" ||
    areas.value.some((area) =>
      area.questions.some(
        (question) =>
          question.value !== "" ||
          ("comment" in question && question.comment !== "")
      )
    )
  );
};

/**
 * Export the composable function.
 */
export const useQuestionnaireState = () => {
  return { state, resetState, isDirty };
};
