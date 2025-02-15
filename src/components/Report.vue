<template>
  <div class="bg-fantasy-light pt-8 p-4 print:bg-inherit print:p-0 print:my-0">
    <div
      class="flex items-baseline justify-between print:hidden flex-wrap gap-x-8 gap-y-8 mb-4"
    >
      <h2 ref="pageHeadings" tabindex="-1" class="scroll-mt-8 mb-0">
        Auswertung
      </h2>
      <div class="flex gap-x-4 gap-y-4 items-center flex-wrap">
        <PrintButton></PrintButton>
        <button
          :id="`print-info-toggle`"
          :aria-expanded="showPrintInfo"
          aria-controls="print-info-content"
          @click="showPrintInfo = !showPrintInfo"
          class="hover:text-thunderbird-red"
        >
          <div class="hfh-sr-only">Erklärung zum Speichern oder Ausdrucken</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 hover:text-thunderbird-red"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div id="print-info-content" class="w-full mb-8" v-show="showPrintInfo">
      <div>
        <h3 class="mb-4">Auswertung als PDF speichern oder ausdrucken</h3>
        <div class="text-base p-4 bg-white shadow">
          <ol class="list-decimal">
            <li>
              <strong>Klicken Sie auf Auswertung Speichern / Drucken</strong>:
              <div class="inline-flex items-center gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                /
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                  />
                </svg>
              </div>
            </li>
            <li>
              <strong>Ziel auswählen</strong>:
              <ol class="list-decimal">
                <li>
                  Unter
                  <strong>Ziel</strong>
                  öffnen Sie die Dropdown-Liste.
                </li>
                <li>
                  Wählen Sie eine der folgenden Optionen:
                  <ul>
                    <li>
                      <strong>Als PDF speichern</strong>: Wählen Sie diese
                      Option unter Lokale Ziele, um die Webseite als PDF zu
                      speichern.
                    </li>
                    <li>
                      <strong>Drucker</strong>: Wählen Sie den gewünschten
                      Drucker, um die Webseite direkt auszudrucken.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>
            <li>
              <strong>Speichern oder drucken</strong>:
              <ul>
                <li>
                  <strong>Für PDF</strong>: Klicken Sie auf
                  <strong>Speichern</strong>, wählen Sie den Speicherort und
                  Dateinamen, und klicken Sie erneut auf Speichern.
                </li>
                <li>
                  <strong>Für Ausdruck</strong>: Klicken Sie auf
                  <strong>Drucken</strong>, um die Seite mit dem ausgewählten
                  Drucker auszudrucken.
                </li>
              </ul>
            </li>
          </ol>
          <p class="m-0">
            <strong>Hinweis</strong>: Die Bezeichnungen und Funktionen können je
            nach verwendetem Browser leicht variieren.
          </p>
        </div>
      </div>
    </div>

    <div class="items-center justify-between mb-8 hidden print:flex">
      <Logo></Logo>
    </div>
    <h2 class="hidden print:block text-lg mb-4" aria-hidden="true">
      Zürcher Autismus-Screening für das Kindesalter
    </h2>
    <div
      class="p-4 bg-white border border-white shadow mb-4 print:shadow-none print:border-none print:bg-none print:p-0 print:mb-0"
    >
      <dl
        class="grid sm:grid-cols-4 gap-y-4 print:gap-y-2 text-base hyphens-auto"
      >
        <div>
          <dt
            class="text-thunderbird-red font-bold uppercase text-sm print:text-xs"
          >
            Initialen des Kindes
          </dt>
          <dd>{{ initials || "-" }}</dd>
        </div>
        <div>
          <dt
            class="text-thunderbird-red font-bold uppercase text-sm print:text-xs"
          >
            Alter des Kindes
          </dt>
          <dd>{{ age || "-" }}</dd>
        </div>
        <div>
          <dt
            class="text-thunderbird-red font-bold uppercase text-sm print:text-xs"
          >
            Überprüfer:in
          </dt>
          <dd>{{ reviewer || "-" }}</dd>
        </div>
        <div>
          <dt
            class="text-thunderbird-red font-bold uppercase text-sm print:text-xs"
          >
            Beobachtungszeitraum
          </dt>
          <dd>{{ observationPeriod || "-" }}</dd>
        </div>
      </dl>
    </div>

    <div class="mt-4">
      <div
        v-for="(area, index) in areas"
        class="pt-4 first:pt-0"
        :class="{
          'print:break-before-page': index > 0,
        }"
      >
        <table
          v-if="area.type == 'scale'"
          class="bg-white shadow print:shadow-none table-auto relative"
        >
          <caption
            class="flex justify-between gap-x-8 p-4 print:px-2 text-base font-bold bg-white top-2 print:top-2.5 leading-none m-0 print:break-after-avoid"
          >
            <span>{{ area.title }}</span>
            <div
              aria-hidden="true"
              class="w-fit grid gap-x-2 min-h-4"
              :class="[`grid-cols-${options.length}`]"
            >
              <div
                v-for="option in options"
                class="w-4 text-base text-center leading-none text-black hidden md:block print:block"
              >
                {{ option.label }}
              </div>
            </div>
          </caption>
          <thead class="hfh-sr-only">
            <tr
              class="py-2 grid grid-cols-1 gap-y-4 sm:grid-cols-[1fr_auto] items-center border-t-0"
            >
              <th class="py-0 px-4 print:px-2">
                <span class="hfh-sr-only">Sachverhalt</span>
              </th>
              <th class="py-0 px-4 print:px-2">
                <span class="hfh-sr-only">Bewertung</span>
                <div
                  aria-hidden="true"
                  class="w-fit grid gap-x-2 min-h-4 grid-cols-5"
                >
                  <div
                    v-for="option in options"
                    class="w-4 text-base text-center leading-none text-black hidden md:block"
                  >
                    {{ option.label }}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="question in area.questions"
              class="py-4 print:py-1 grid grid-cols-1 gap-y-4 md:grid-cols-[1fr_auto] print:grid-cols-[1fr_auto] items-center border-t-1"
            >
              <th
                class="py-0 px-4 print:px-2 text-base text-inherit font-normal normal-case"
              >
                {{ question.id }}. {{ question.text }}
              </th>
              <td class="py-0 px-4 print:px-2">
                <span class="hfh-sr-only">{{ question.value }}</span>
                <div
                  aria-hidden="true"
                  class="w-fit grid gap-x-2"
                  :class="[`grid-cols-${options.length}`]"
                >
                  <div
                    v-for="(option, index) in options"
                    class="font-bold text-base text-center leading-none text-black mb-2 md:hidden print:hidden"
                  >
                    {{ index }}
                  </div>

                  <svg
                    v-for="(option, index) in options"
                    class="w-4 h-4"
                    :class="{
                      'text-thunderbird-red fill-thunderbird-red':
                        index === parseInt(question.value),
                      'text-thunderbird-red fill-none':
                        index !== parseInt(question.value),
                    }"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke-width="2"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="area.type == 'radio'"
          class="bg-white shadow print:shadow-none print:break-before-page text-base font-normal"
        >
          <div class="py-4">
            <h3
              class="px-4 text-base text-black font-bold normal-case border-b-0 leading-none m-0 print:break-after-avoid"
            >
              {{ area.title }}
            </h3>
          </div>
          <div
            v-for="question in area.questions"
            class="p-4 border-t-2 border-fantasy-plain"
          >
            <div>{{ question.id }}. {{ question.text }}</div>
            <ul class="p-0 m-0">
              <li
                v-for="(option) in (question as RadioQuestion).options"
                aria-hidden="true"
                class="p-0 m-0 flex items-start gap-x-1"
              >
                <svg
                  class="w-4 h-4 flex-shrink-0 mt-1"
                  :class="{
                    'text-thunderbird-red fill-thunderbird-red':
                      option.value === question.value,
                    'text-thunderbird-red fill-none':
                      option.value !== question.value,
                  }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke-width="2"
                    stroke="currentColor"
                  />
                </svg>
                <span>
                  <span
                    class="hfh-sr-only"
                    v-if="option.value === question.value"
                    >Ausgewählt:</span
                  >
                </span>
                {{ option.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Report component which displays the questionnaire report.
 */
import { ref } from "vue";
import { useQuestionnaireState } from "@/composables/useQuestionnaireState";
import PrintButton from "@/components/PrintButton.vue";
import Logo from "@/components/Logo.vue";
import { useScaleOptions } from "@/composables/useScaleOptions";
import type { RadioQuestion } from "@/types";

const { initials, age, reviewer, observationPeriod, areas } =
  useQuestionnaireState().state;

const { options } = useScaleOptions();

const showPrintInfo = ref(false);
</script>

<style scoped>
dt {
  hyphens: auto;
}
tr,
th,
td {
  break-inside: avoid;
  page-break-inside: avoid;
}
h3 {
  font-size: 1rem;
}
</style>
