<template>
  <template v-if="isMounted">
    <div v-if="!answer || Object.values(answer).every((el) => el === '')" class="font-neodgm absolute top-2/4 w-full text-center text-3xl">
      답변을 먼저 작성해줘!
    </div>
    <template v-else>
      <div class="mb-5 border-b-2 border-white/30 pb-5">
        <TextDialogue currentText="올해도 정말 고생 많았어! 2025년도 즐겁고 행복한 일만 가득하길 빌게!" />
      </div>
      <div class="border-b-2 border-white/30">
        <!-- 결과 -->
        <div class="bg-blue-950 p-10" ref="captureArea">
          <h1 class="font-neodgm mb-5 text-center text-4xl">회고록</h1>
          <div v-for="(item, idx) in answer" :key="idx">
            <div v-if="item !== ''" class="py-10">
              <p class="font-neodgm mb-5 flex gap-1 break-keep text-xl">
                <span>{{ idx }}.</span> <span>{{ questionLists[idx - 1] }}</span>
              </p>
              <p class="ml-6 whitespace-break-spaces text-lg">{{ item }}</p>
            </div>
          </div>
        </div>
        <!-- 이미지 저장 버튼 -->
        <div class="font-neodgm flex flex-col gap-5 p-10 pt-0 text-xl md:flex-row">
          <button @click="captureToImage" class="rounded-full border-2 p-3 px-5">이미지로 저장</button>
          <button @click="router.push('/')" class="rounded-full border-2 p-3 px-5">답변으로 돌아가기</button>
          <button @click="onReset" class="rounded-full border-2 p-3 px-5">답변 초기화</button>
        </div>
      </div>
      <div class="p-10 pt-20">
        <!-- 결과 -->
        <h1 class="font-neodgm mb-10 text-center text-4xl">미작성 질문</h1>
        <div v-for="(item, idx) in answer" :key="idx">
          <div v-if="item === ''" class="py-2">
            <p class="font-neodgm mb-5 flex gap-1 break-keep text-xl">
              <span>{{ idx }}.</span> <span>{{ questionLists[idx - 1] }}</span>
            </p>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import html2canvas from 'html2canvas'
import { questionLists } from '@/utils/question'

// type
type Answer = {
  [key: number]: string
}

// 상태
const isMounted = ref(false)
const answer = ref<Answer | null>(null)
const captureArea = ref<HTMLElement | null>(null)
const router = useRouter()

// 캡쳐
const captureToImage = () => {
  if (captureArea.value) {
    html2canvas(captureArea.value).then((canvas) => {
      const imageUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = 'captured-image.png'
      link.click()
    })
  }
}

// 초기화
const onReset = () => {
  localStorage.removeItem('currentStep')
  localStorage.removeItem('answers')
  localStorage.removeItem('questionStep')
  router.push('/')
}

// 마운트
onMounted(() => {
  isMounted.value = true
  const storedAnswers = localStorage.getItem('answers')
  if (storedAnswers) {
    answer.value = JSON.parse(storedAnswers)
  }
})
</script>
