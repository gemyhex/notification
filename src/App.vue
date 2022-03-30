<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
}
</script>
<style lang="scss">
label#lbl_inp {
  font-size: 1rem !important;
  line-height: 1rem !important;
}
body {
  overflow: hidden;
}
table tbody tr td {
  min-width: 200px;
}
ul {
  list-style: none;
}

/* Scrollbar */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #555555;
}
.liquid {
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    stroke-width: 1;
    stroke: white;
    path {
      stroke-dasharray: 700;
      stroke-dashoffset: 700;
      animation: animate-fill 1.5s linear forwards infinite;
    }
  }
}

@keyframes animate-fill {
  50% {
    stroke-dashoffset: 1400;
    fill: transparent;
  }
  100% {
    stroke-width: 0;
    stroke-dashoffset: 1400;
    fill: aqua;
  }
}
</style>
