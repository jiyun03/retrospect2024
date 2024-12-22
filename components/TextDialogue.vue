<template>
  <div class="w-full items-center gap-10 p-5 md:p-10 lg:flex">
    <div class="w-32 lg:w-64">
      <NuxtImg src="/img/santa_move.gif" alt="움직이는 산타" class="w-full" />
    </div>
    <div class="font-neodgm min-h-60 rounded-3xl border-4 p-7 lg:w-[calc(100%-18.5rem)]">
      <p class="mb-4 text-2xl font-bold">김산타</p>
      <p class="break-keep text-xl leading-8">
        {{ currentText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  currentText: String,
})
</script>
