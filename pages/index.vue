<template>
  <div v-if="isMounted" class="pt-10">
    <!-- intro -->
    <div v-if="localStep === 'intro'" class="font-neodgm text-center">
      <NuxtImg src="/img/decoration.png" class="mx-auto mb-4 w-20" />
      <h1 class="text-7xl">Goodbye<br />2024</h1>
      <button
        v-if="currentIndex >= introDialogues.length - 1 && !isTyping"
        class="mt-5 rounded-full border-4 p-3 px-10 text-3xl leading-none transition-[background] hover:bg-white/30"
        @click="onStart"
      >
        Start
      </button>
    </div>
    <!-- question -->
    <div v-else-if="localStep === 'question'" class="w-full px-10 text-center">
      <!-- 네비게이션 -->
      <div class="font-neodgm flex gap-2">
        <div v-for="(item, idx) in questionDialogues" :key="item" class="h-3 w-2/3 bg-black" @click="onStepMove(idx + 1)">
          {{ idx + 1 }}
        </div>
      </div>
      <!-- question -->
      <h1 class="font-neodgm mb-5 text-7xl">Q {{ localQuestionStep }}</h1>
      <textarea
        rows="10"
        :placeholder="questionDialogues[Number(localQuestionStep) - 1]"
        class="w-full resize-none rounded-lg p-5 text-lg text-black"
        :value="localQuestionStep && answer[Number(localQuestionStep)]"
        @input="(event) => handleAnswerChange(Number(localQuestionStep), event)"
      />
      <div class="font-neodgm mt-5 flex justify-center gap-5">
        <button
          class="font-neodgm rounded-full border-4 p-3 px-10 text-right text-2xl transition-[background] hover:bg-white/30 disabled:bg-blue-950 disabled:opacity-70"
          @click="onAnswer(Number(localQuestionStep) + 1)"
          :disabled="!answer[Number(localQuestionStep)]"
        >
          답변제출
        </button>
        <button
          class="rounded-full border-4 p-3 px-10 text-right text-2xl transition-[background] hover:bg-white/30 disabled:bg-blue-950 disabled:opacity-70"
          @click="$router.push('/result')"
        >
          결과보기
        </button>
      </div>
    </div>
    <!-- 하단 -->
    <div class="absolute bottom-0 w-full">
      <TextDialogue :currentText="currentText" />
      <!-- 이미지 -->
      <div class="h-16 bg-contain bg-center bg-repeat-x" style="background-image: url('/img/decoration_tree.png')"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isMounted = ref(false)
const isTyping = ref(false) // 타이핑 중인지 확인
const currentText = ref('') // 현재 출력 중인 텍스트
const currentIndex = ref(0) // 현재 대사 인덱스
const typingInterval = ref<NodeJS.Timeout | null>(null) // 타이핑 타이머
const localStep = ref<string | null>('') // intro, question, end
const localQuestionStep = ref<string | null>('0')

// type
type Answer = {
  [key: number]: string | null
}

// intro
const introDialogues = [
  '안녕? 2024 연말 회고 작성해보지 않을래?',
  '총 20가지의 질문을 준비해봤어, 답하고 싶지 않은 질문은 넘어갈 수도 있으니까, 원하는 질문에만 답을 해도 좋아!',
  '페이지에서 벗어나도 이어서 작성할 수 있게 답변을 저장해둘게, 사용자의 브라우저에만 저장하니까 답변 유출에 대한 걱정은 하지 않아도 돼!',
  '답변을 제출하면 이미지로 저장하고 다른 사람들에게 공유도 할 수 있어, 그럼 즐거운 시간 되길!',
]

// question
const questionDialogues = [
  '질문 1...',
  '질문 2...',
  '질문 3...',
  '질문 4...',
  '질문 5...',
  '질문 6...',
  '질문 7...',
  '질문 8...',
  '질문 9...',
  '질문 10...',
  '질문 11...',
  '질문 12...',
  '질문 13...',
  '질문 14...',
  '질문 15...',
  '질문 16...',
  '질문 17...',
  '질문 18...',
  '질문 19...',
  '질문 20...',
]

// answer 배열
const answerDefault = questionDialogues.reduce((acc, _, index) => {
  acc[index + 1] = ''
  return acc
}, {} as Answer)
const answer = ref(answerDefault)

// 값이 null이 아닌지 확인하는 함수
const hasNonNullValue = () => {
  const storedAnswers = localStorage.getItem('answers')
  if (storedAnswers) {
    console.log(Object.values(JSON.parse(storedAnswers)))
    return Object.values(JSON.parse(storedAnswers)).some((value) => value !== '') && Object.values(answer).some((value) => value !== '')
  }
  return false
}

// start
const onStart = () => {
  localStep.value = 'question'
  localQuestionStep.value = '1'
  typeDialogue(questionDialogues[0])
}

// 네비게이션
const onStepMove = (index: number) => {
  console.log(index)
  handleNext(index)
}

// 답변 제출
const onAnswer = (index: number) => {
  handleNext(index)
  localStorage.setItem('answers', JSON.stringify(answer.value))
}

// 대사 타이핑
const typeDialogue = (dialogue: string) => {
  let charIndex = 0
  currentText.value = '' // 현재 텍스트 초기화
  isTyping.value = true

  typingInterval.value = setInterval(() => {
    if (charIndex < dialogue.length) {
      currentText.value += dialogue[charIndex]
      charIndex++
    } else {
      if (typingInterval.value) {
        clearInterval(typingInterval.value)
      }
      isTyping.value = false // 타이핑 완료
    }
  }, 50)
}

// textarea 입력 저장
const handleAnswerChange = (questionNumber: number, event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target) {
    answer.value[questionNumber] = target.value
  }
}

// 대사 전체 출력
const showFullDialogue = () => {
  if (typingInterval.value) {
    clearInterval(typingInterval.value)
  }
  currentText.value = localStep.value === 'intro' ? introDialogues[currentIndex.value] : questionDialogues[Number(localQuestionStep.value)]
  isTyping.value = false
}

// 다음 대사 출력
const handleNext = (step?: number) => {
  if (isTyping.value) {
    // 타이핑 중이면 전체 대사 출력
    showFullDialogue()
  } else {
    if (localStep.value === 'intro') {
      // 키보드나 마우스 입력으로 넘어가게
      currentIndex.value++
      if (currentIndex.value < introDialogues.length) {
        typeDialogue(introDialogues[currentIndex.value])
      }
    } else if (localStep.value === 'question') {
      // 버튼 클릭으로 넘어가게
      if (step) {
        console.log(step)
        const stepString = String(step)
        localStorage.setItem('currentStep', 'question')
        localStorage.setItem('questionStep', stepString)
        localQuestionStep.value = stepString
        typeDialogue(questionDialogues[Number(step) - 1])
      }
    }
  }
}

// 키보드, 마우스 이벤트 핸들러
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    if (localStep.value === 'intro' && currentIndex.value < introDialogues.length) {
      handleNext()
      console.log('키보드')
    }
  }
}

const handleRightClick = () => {
  if (localStep.value === 'intro' && currentIndex.value < introDialogues.length) {
    handleNext()
    console.log('클릭')
  }
}

// 마운트
onMounted(() => {
  isMounted.value = true

  // 로컬스토리지 스텝 상태
  localStep.value = localStorage.getItem('currentStep')
  localQuestionStep.value = localStorage.getItem('questionStep')

  if (localStep.value) {
    if (localStep.value === 'intro') {
      // intro 대사 출력
      typeDialogue(introDialogues[currentIndex.value])
    } else if (localStep.value === 'question') {
      // question 대사 출력
      typeDialogue(questionDialogues[Number(localQuestionStep.value) - 1])
      const storedAnswers = localStorage.getItem('answers')
      if (storedAnswers) {
        answer.value = JSON.parse(storedAnswers) as Answer
      } else {
        answer.value = answerDefault
      }
    }
  } else {
    localStorage.setItem('currentStep', 'intro')
    localStep.value = localStorage.getItem('currentStep')
    typeDialogue(introDialogues[currentIndex.value])
  }

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleRightClick)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleRightClick)
})
</script>
1
