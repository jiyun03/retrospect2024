<template>
  <div class="fixed bottom-5 left-5">
    <audio ref="bgAudio" autoplay loop>
      <source src="/audio/christmas.mp3" type="audio/mpeg" />
    </audio>
    <button @click="toggleMusic" class="hover:opacity-30">
      <NuxtImg src="/icon/music.svg" alt="음악 On/Off" :class="['w-12', { 'animate-move': isPlaying }]" />
    </button>
  </div>
</template>

<script setup>
const bgAudio = ref(null)
const isPlaying = ref(false)

// 음악 재생
const toggleMusic = () => {
  const audio = bgAudio.value
  if (audio) {
    if (isPlaying.value) {
      audio.pause()
    } else {
      audio.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

// 마운트
onMounted(() => {
  const audio = bgAudio.value
  if (audio) {
    audio.volume = 0.5
  }
})
</script>
