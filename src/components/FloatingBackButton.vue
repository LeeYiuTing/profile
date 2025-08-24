<template>
  <div
    class="float-back-btn"
    @mousedown="startDrag"
    @touchstart="startDrag"
    :style="{ right: `${currentX}px`, bottom: `${currentY}px` }"
    @click="goBack"
  >
    <Icon name="arrow-left" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from 'vant'

const router = useRouter()

// 定义props，设置默认值
const props = defineProps({
  initialRight: {
    type: Number,
    default: 50
  },
  initialBottom: {
    type: Number,
    default: 80
  }
})

// 拖动相关变量
const isDragging = ref(false)
const hasDragged = ref(false)
const startX = ref(0)
const startY = ref(0)
const initialX = ref(0)
const initialY = ref(0)
const currentX = ref(props.initialRight)
const currentY = ref(props.initialBottom)

// 拖动开始
const startDrag = (e) => {
  isDragging.value = true
  hasDragged.value = false
  initialX.value = currentX.value
  initialY.value = currentY.value

  if (e.type === 'mousedown') {
    startX.value = e.clientX
    startY.value = e.clientY
  } else if (e.type === 'touchstart') {
    startX.value = e.touches[0].clientX
    startY.value = e.touches[0].clientY
  }
}

// 拖动中
const drag = (e) => {
  if (!isDragging.value) return

  let clientX, clientY
  if (e.type === 'mousemove') {
    clientX = e.clientX
    clientY = e.clientY
  } else if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
    e.preventDefault()
  }

  const deltaX = clientX - startX.value
  const deltaY = clientY - startY.value

  // 计算总移动距离
  const totalDeltaX = initialX.value - currentX.value - deltaX
  const totalDeltaY = initialY.value - currentY.value - deltaY

  // 判断是否为拖动操作
  if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3 || 
      Math.abs(totalDeltaX) > 5 || Math.abs(totalDeltaY) > 5) {
    hasDragged.value = true
  }

  // 更新位置并限制在屏幕内
  const newX = currentX.value - deltaX
  const newY = currentY.value - deltaY

  if (newX >= 0 && newX <= window.innerWidth - 50) {
    currentX.value = newX
  }
  if (newY >= 0 && newY <= window.innerHeight - 50) {
    currentY.value = newY
  }

  startX.value = clientX
  startY.value = clientY
}

// 拖动结束
const endDrag = () => {
  isDragging.value = false
}

// 返回上一页
const goBack = () => {
  if (hasDragged.value) {
    hasDragged.value = false
    return
  }
  router.back()
}

// 挂载和卸载时绑定/解绑全局事件
onMounted(() => {
  window.addEventListener('mousemove', drag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchmove', drag)
  window.addEventListener('touchend', endDrag)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', drag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('touchmove', drag)
  window.removeEventListener('touchend', endDrag)
})
</script>

<style scoped>
.float-back-btn {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #7f8183;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 999;
}
</style>