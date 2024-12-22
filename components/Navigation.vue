<template>
  <div class="font-neodgm mb-10 flex flex-wrap gap-2">
    <div
      v-for="(item, idx) in questionDialogues"
      :key="item"
      :class="[
        'w-[calc(10%-0.5rem)] rounded-lg bg-blue-950 p-1 shadow-sm',
        { 'bg-red-600': Number(localQuestionStep) === idx + 1 }, // idx와 localQuestionStep 비교 시 idx+1
      ]"
      @click="() => handleNext(idx + 1)"
    >
      {{ idx + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

type Props = {
  questionDialogues: string[] // 질문 목록
  localQuestionStep: string | null // 현재 질문 단계
  handleNext: (index: number) => void // 단계 이동 함수
}

const props = defineProps<Props>()
</script>
