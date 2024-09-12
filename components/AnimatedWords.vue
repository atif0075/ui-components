<template>
  <div :class="['font-bold', className]">
    <div class="mt-4">
      <div class="dark:text-white text-black text-2xl leading-snug tracking-wide">
        <div ref="scope">
          <span
            v-for="(word, idx) in wordsArray"
            :key="word + idx"
            class="dark:text-white text-black inline-block"
            :style="getWordStyle(idx)"
          >
            {{ word }}&nbsp;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { cn } from '~/utils/cn'

interface Props {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  filter: true,
  duration: 0.5
})

const scope = ref<HTMLDivElement | null>(null)
const animatedWords = ref<number[]>([])

const wordsArray = computed(() => props.words.split(' '))

const getWordStyle = (idx: number) => {
  const style: Record<string, string> = {
    opacity: animatedWords.value.includes(idx) ? '1' : '0',
    transition: `opacity ${props.duration}s, filter ${props.duration}s`
  }
  
  if (props.filter) {
    style.filter = animatedWords.value.includes(idx) ? 'blur(0px)' : 'blur(10px)'
  }

  return style
}

const animateWords = () => {
  wordsArray.value.forEach((_, idx) => {
    useTimeoutFn(() => {
      animatedWords.value.push(idx)
    }, idx * 200)
  })
}

onMounted(() => {
  animateWords()
})
</script>
