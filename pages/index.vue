<template>
  <div>
    <h1 class="font-neodgm pt-40 text-center text-7xl text-white">Goodbye<br />2024</h1>
    <button v-if="currentStep === 'intro' && currentIndex === introDialogues.length" class="text-white">Start</button>
  </div>
  <!-- 하단 -->
  <div class="absolute bottom-0 w-full">
    <TextDialogue :currentText="currentText" :isMounted="isMounted" />
    <!-- 이미지 -->
    <div class="h-16 bg-contain bg-center bg-repeat-x" style="background-image: url('/icon/decoration_tree.png')"></div>
  </div>
</template>

<script setup lang="ts">
/*
저장해야되는 값
currentStep
질문 step
질문 답
*/

// 상태 관리
const isMounted = ref(false)
const isTyping = ref(false) // 타이핑 중인지 확인
const currentText = ref('') // 현재 출력 중인 텍스트
const currentIndex = ref(0) // 현재 대사 인덱스
const typingInterval = ref<NodeJS.Timeout | null>(null) // 타이핑 타이머
const currentStep = ref('intro') // intro, question, end
const localStep = ref<string | null>('') // intro, question, end
const localQuestionStep = ref<string | null>('0') // intro, question, end

// intro
const introDialogues: string[] = [
  '안녕? 2024 연말 회고 작성해보지 않을래?',
  '총 20가지의 질문을 준비해봤어, 답하고 싶지 않은 질문은 넘어갈 수도 있으니까, 원하는 질문에만 답을 해도 좋아!',
  '페이지에서 벗어나도 이어서 작성할 수 있게 답변을 저장해둘게, 사용자의 브라우저에만 저장하니까 답변 유출에 대한 걱정은 하지 않아도 돼!',
  '답변을 제출하면 이미지로 저장하고 다른 사람들에게 공유도 할 수 있어, 그럼 즐거운 시간 되길!',
]

// question
const questionDialogues: string[] = [
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

// 대사 타이핑 함수
const typeDialogue = (dialogue: string): void => {
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

// 대사 전체 출력
const showFullDialogue = (): void => {
  if (typingInterval.value) {
    clearInterval(typingInterval.value)
  }
  currentText.value = currentStep.value === 'intro' ? introDialogues[currentIndex.value] : questionDialogues[currentIndex.value]
  isTyping.value = false
}

// 다음 대사 출력
const handleNext = (): void => {
  if (isTyping.value) {
    // 타이핑 중이면 전체 대사 출력
    showFullDialogue()
  } else {
    if (currentStep.value === 'intro') {
      // 키보드나 마우스 입력으로 넘어가게
      currentIndex.value++
      if (currentIndex.value < introDialogues.length) {
        typeDialogue(introDialogues[currentIndex.value])
      }
    } else if (currentStep.value === 'question') {
      // 버튼 클릭으로 넘어가게
      currentIndex.value++
      if (currentIndex.value < questionDialogues.length) {
        typeDialogue(questionDialogues[currentIndex.value])
      }
    }
  }
}

// 키보드, 마우스 이벤트 핸들러
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    if ((currentStep.value === 'intro' && currentIndex.value !== introDialogues.length) || currentStep.value === 'question') {
      handleNext()
      console.log('키보드')
    }
  }
}

const handleRightClick = () => {
  if ((currentStep.value === 'intro' && currentIndex.value !== introDialogues.length) || currentStep.value === 'question') {
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
      currentStep.value = 'intro'
      // intro 대사 출력
      typeDialogue(introDialogues[currentIndex.value])
    } else if (localStep.value === 'question') {
      currentStep.value = 'question'
      // question 대사 출력
      typeDialogue(questionDialogues[Number(localQuestionStep.value)])
    }
  } else {
    localStorage.setItem('currentStep', 'intro')
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
