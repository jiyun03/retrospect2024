<template>
  <div class="m-10 flex w-[calc(100%-5rem)] items-center gap-10">
    <div class="w-64">
      <NuxtImg src="/img/santa_move.gif" alt="움직이는 산타" class="w-full" />
    </div>
    <div class="font-neodgm h-60 w-[calc(100%-18.5rem)] rounded-3xl border-4 p-7">
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
