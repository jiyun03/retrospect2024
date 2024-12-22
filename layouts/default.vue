<template>
  <main class="min-h-dvh bg-blue-900/70">
    <!-- container -->
    <div class="mx-auto max-w-full xl:max-w-[1000px] xl:py-5">
      <div class="relative min-h-dvh bg-blue-950 xl:min-h-[calc(100vh-2.5rem)] xl:overflow-hidden xl:rounded-3xl">
        <slot />
      </div>
    </div>
    <!-- music -->
    <Music />
  </main>
</template>
