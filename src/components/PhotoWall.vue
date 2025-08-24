<style lang="less" scoped>
.photo-wall {

    .picList {
        margin-top: 50px;
    }

    padding: @padding-md;
    background: @background-color;
    min-height: 100vh;

    :deep(.van-grid-item__content) {
        background: transparent !important;
        box-shadow: none !important;
        padding: 0 !important;
    }

    .photo-img {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    .photo-img:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    /* 浮动返回按钮样式已在FloatingBackButton组件中定义 */
}
</style>

<template>
    <div class="photo-wall">
        <van-nav-bar title="相册" fixed left-text="返回" left-arrow @click-left="goBack" />
        <van-grid class="picList" :column-num="1" :gutter="12" clickable :border="false">
            <van-grid-item v-for="(img, idx) in images" :key="img" @click="showPreview(idx)">
                <van-image :src="img" class="photo-img" alt="照片加载失败">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                     <template v-slot:error>加载失败</template>
                </van-image>
            </van-grid-item>
        </van-grid>

        <!-- 右下角浮动返回按钮 -->
        <!--<FloatingBackButton :initialRight="50" :initialBottom="80" />-->
    </div>
    <!--大图浏览-->
    <van-image-preview />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FloatingBackButton from './FloatingBackButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { showImagePreview, Icon } from "vant";
import cameraList from '../data/cameraList.json'


const route = useRoute()
const router = useRouter()

// 使用ref创建响应式图片数组
const images = ref([])

// 组件挂载后执行
onMounted(() => {
    console.log('PhotoWall 组件已挂载')

    // 获取URL查询参数
    console.log('URL参数:', route.query)

    if (route.query.type === 'camera') {
        // 从JSON文件获取图片列表
        images.value = cameraList.map(img => img.path)
        console.log('加载的图片数量:', images.value.length)
    } else {

    }
})

// 组件卸载前执行
onUnmounted(() => {
    console.log('PhotoWall 组件即将卸载')

    // 无需移除拖动事件监听，FloatingBackButton组件内部已处理
})

/**
 * 返回上一页
 */
const goBack = () => {
    router.back()
}

/**
 * 显示图片预览
 * @param index 图片索引
 */
const showPreview = (index) => {
    // 如果有起始参数，使用它作为预览起始位置
    const startPosition = route.query.start ? parseInt(route.query.start) : index

    showImagePreview({
        images: images.value,
        startPosition: startPosition,
        closeable: true,
        showIndex: true,
        loop: true
    })
}
</script>