<template>
  <Report class="hfh-content print:hidden"></Report>
  <table class="hidden print:table w-full">
    <tbody>
      <Report class="hfh-content"></Report>
    </tbody>
    <tfoot class="print:break-inside-avoid">
      <tr>
        <td class="pt-4 text-sm">
          <div class="print:break-inside-avoid print:inline-block">
            <dl class="grid grid-cols-2">
              <div class="flex gap-x-2">
                <dt>1:</dt>
                <dd>nicht beobachtbar</dd>
              </div>
              <div class="flex gap-x-2">
                <dt>2:</dt>
                <dd>nicht eindeutig beobachtbar</dd>
              </div>
              <div class="flex gap-x-2">
                <dt>3:</dt>
                <dd>eindeutig, jedoch unregelmässig beobachtbar</dd>
              </div>
              <div class="flex gap-x-2">
                <dt>4:</dt>
                <dd>eindeutig und regelmässig beobachtbar</dd>
              </div>
            </dl>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
/**
 * The report page of the ORKA questionnaire.
 * It contains both a printable and a screen version of the report.
 * The printable version uses a table to provide a footer with the scale explanation on each printed page.
 * This does not work on Safari.
 */
import Report from "@/components/Report.vue";
</script>

<style scoped></style>
