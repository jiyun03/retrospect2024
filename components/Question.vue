<template>
  <div class="relative mb-5">
    <h1 class="font-neodgm text-7xl">Q {{ localQuestionStep }}</h1>
    <div class="font-neodgm absolute bottom-0 right-0">
      <button @click="$router.push('/result')" class="ml-2 min-w-28 rounded-full border-2 p-2">결과보기</button>
    </div>
  </div>
  <textarea
    rows="10"
    :placeholder="questionLists[Number(localQuestionStep) - 1]"
    class="w-full resize-none rounded-lg p-5 text-lg text-black"
    :value="localQuestionStep && answer[Number(localQuestionStep)]"
    @input="(event) => handleAnswerChange(Number(localQuestionStep), event)"
  />
  <div class="font-neodgm mt-5 flex justify-center gap-5 text-2xl">
    <button
      class="rounded-full border-4 p-3 px-10 transition-[background] hover:bg-white/30 disabled:bg-blue-950 disabled:opacity-70"
      @click="handleNext(Number(localQuestionStep) - 1)"
      :disabled="localQuestionStep === '1'"
    >
      이전질문
    </button>
    <button
      v-if="localQuestionStep !== String(questionLists.length)"
      class="rounded-full border-4 p-3 px-10 transition-[background] hover:bg-white/30 disabled:bg-blue-950 disabled:opacity-70"
      @click="handleNext(Number(localQuestionStep) + 1)"
    >
      다음질문
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { questionLists } from '@/utils/question'

type Props = {
  localQuestionStep: string | null
  answer: Record<number, string | null>
  handleAnswerChange: (step: number, event: Event) => void
  handleNext: (step: number) => void
}

const props = defineProps<Props>()
</script>
