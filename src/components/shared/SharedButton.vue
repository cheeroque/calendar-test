<template>
  <button
    class="
      flex items-center justify-center text-center
      disabled:opacity-50
      not-disabled:cursor-pointer not-disabled:hover:text-blue-600
    "
  >
    <slot />
  </button>
</template>