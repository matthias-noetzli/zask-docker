<template>
  <div class="hfh-content bg-fantasy-light pt-8 p-4">
    <h2 ref="pageHeadings" tabindex="-1" class="scroll-mt-8">Anleitung</h2>
    <div class="bg-white p-4 shadow">
      <p>
        Zu Beginn geben Sie die Stammdaten (Bsp. Initialen des Kindes, Alter)
        ein. Wichtig: Die Daten werden rein browserbasiert erfasst und es findet
        keinerlei Speicherung der Daten statt. Bei Abbruch der Eingabe oder nach
        dem Verlassen der Website werden alle Daten gelöscht. Am Ende können Sie
        eine Zusammenfassung ausdrucken oder diese als PDF speichern.
      </p>
      <p>
        Nach der Eingabe der Stammdaten klicken Sie unten rechts auf den Button
        Weiter und kommen zum ersten Beobachtungsblock «Soziale Wahrnehmung und
        Soziale Kommunikation». Halten Sie fest, ob Sie bei den benannten
        Kriterien für das beobachtete Kind Unterschiede im Vergleich zum
        erwarteten Verhalten bei gleichaltrigen Kindern sehen. Unterschiede
        können qualitativ («ungewöhnlich»; «anders» als bei anderen Kindern)
        und/oder quantitativ (geringere/höhere Häufigkeit) sein.
      </p>
      <dl class="my-[1.625rem] lg:my-[2rem]">
        <div v-for="option in options" class="flex gap-x-2">
          <dt>{{ option.label }}</dt>
          <dd>{{ option.description }}</dd>
        </div>
      </dl>

      <p>
        So gehen Sie auch in den zwei weiteren Beobachtungsblöcken «Interessen,
        Aktivitäten und Verhaltensmuster» sowie «kognitiver und
        verbalsprachlicher Entwicklungsstand» vor. Die obere
        Übersichtszusammenstellung zeigt an, welcher Block gerade bearbeitet
        wird (rote Schriftfarbe).
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScaleOptions } from "@/composables/useScaleOptions";

const { options } = useScaleOptions();
</script>

<style scoped>
dt::after {
  content: ":";
}
</style>
