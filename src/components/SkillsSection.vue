<script setup>
import { ref } from 'vue'

const skills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'HTML/CSS', level: 88 },
  { name: 'Node.js', level: 75 },
  { name: 'Git', level: 80 }
])
</script>

<template>
  <div class="skills-section">
    <van-cell-group inset>
      <van-cell title="技能专长" />
    </van-cell-group>
    
    <van-cell-group inset class="skills-list">
      <van-cell 
        v-for="skill in skills" 
        :key="skill.name"
        :title="skill.name"
      >
        <template #default>
          <div class="skill-progress-wrapper">
            <van-progress 
              :percentage="skill.level" 
              :show-pivot="false"
              color="linear-gradient(to right, #1989fa, #07c160)"
            />
            <span class="skill-level">{{ skill.level }}%</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.skills-section {
  margin: @padding-lg;
  
  .skills-list {
    margin-top: @padding-md;
    
    .skill-progress-wrapper {
      display: flex;
      align-items: center;
      gap: @padding-sm;
      
      .skill-level {
        color: @text-color-2;
        font-size: @font-size-sm;
        min-width: 40px;
        text-align: right;
      }
    }
  }
}
</style>