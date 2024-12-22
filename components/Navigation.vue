<template>
  <div class="font-neodgm mb-10 flex flex-wrap gap-2">
    <div
      v-for="(item, idx) in questionLists"
      :key="item"
      :class="[
        'w-[calc(10%-0.5rem)] cursor-pointer rounded-lg p-1 shadow-sm',
        { 'bg-red-600': Number(localQuestionStep) === idx + 1 },
        { 'bg-slate-500': Number(localQuestionStep) !== idx + 1 },
      ]"
      @click="() => handleNext(idx + 1)"
    >
      {{ idx + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { questionLists } from '@/utils/question'

type Props = {
  localQuestionStep: string | null // 현재 질문 단계
  handleNext: (index: number) => void // 단계 이동 함수
}

const props = defineProps<Props>()
</script>
