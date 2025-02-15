<template>
  <div class="hfh-content">
    <h1 class="px-4 xl:px-0">Team</h1>
    <div class="px-4 xl:px-0 list-none grid sm:grid-cols-2 gap-12">
      <a
        v-for="member in members"
        :href="member.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-black hover:text-thunderbird-red no-underline"
      >
        <div class="flex items-center gap-4">
          <div class="rounded-full overflow-clip max-size-28">
            <img
              :src="`/images/${member.image}`"
              alt=""
              class="rounded-full p-[2px] border-2 border-fantasy-plain"
            />
          </div>
          <div>
            <span>{{ member.name }},</span>
            <span>&nbsp;</span>

            <span>{{ member.title }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const members = [
  {
    name: "Andreas Eckert",
    title: "Prof. Dr.",
    image: "eckert_andreas.jpg",
    link: "https://www.hfh.ch/person/andreas-eckert",
  },
  {
    name: "Matthias Lütolf",
    title: "MA",
    image: "luetolf_matthias.jpg",
    link: "https://www.hfh.ch/person/matthias-luetolf",
  },
];
</script>

<style scoped></style>
