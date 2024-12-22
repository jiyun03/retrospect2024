<template>
  <h1 class="font-neodgm mb-5 text-7xl">Q {{ localQuestionStep }}</h1>
  <textarea
    rows="10"
    :placeholder="questionDialogues[Number(localQuestionStep) - 1]"
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
      v-if="localQuestionStep !== String(questionDialogues.length)"
      class="rounded-full border-4 p-3 px-10 transition-[background] hover:bg-white/30 disabled:bg-blue-950 disabled:opacity-70"
      @click="handleNext(Number(localQuestionStep) + 1)"
    >
      다음질문
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

type Props = {
  localQuestionStep: string | null
  questionDialogues: string[]
  answer: Record<number, string | null>
  handleAnswerChange: (step: number, event: Event) => void
  handleNext: (step: number) => void
}

// Props 선언
const props = defineProps<Props>()
</script>
