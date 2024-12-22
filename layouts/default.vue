<template>
  <main class="min-h-dvh bg-blue-900/70">
    <!-- container -->
    <div class="mx-auto max-w-[1000px] py-5">
      <div class="relative min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-3xl bg-blue-950/70">
        <slot />
      </div>
    </div>
    <!-- music -->
    <Music />
  </main>
</template>
