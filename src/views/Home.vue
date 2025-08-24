<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

//信息展开
const infoExpanded = ref({
    hobbies: true,
    media: true,
    social: true
})

// 展开/收起
function toggleInfo(type) {
    infoExpanded.value[type] = !infoExpanded.value[type]
}

// 个人信息
const info = ref({
    name: '李耀庭 Leo',
    age: 27,
    location: '中山',
    occupation: '码农',
    avatar: '/image/headImage.jpg',
    intro: 'INFP / ENTP  鬼五马六   '
})

// 兴趣爱好
const hobbies = ref([
    { name: 'camera',  label: '摄影', icon: '📸', desc: '光影交织 绘就绮丽', click: true },
    { name: 'driving', label: '驾驶', icon: '🚗', desc: '沥青海浪 远山淡影', click: false },
    { name: 'cooking', label: '烹饪', icon: '👨‍🍳', desc: '五味调和 烟火写意', click: false },
    { name: 'fishing', label: '垂钓', icon: '🎣', desc: '涟漪荡漾 静候惊喜', click: false }
])

function toAlbum(hobby) {
    if (hobby.name === 'camera') {
        router.push({
            path: '/photo',
            query: {
                type: "camera"
            }
        })
    }
}

// 喜爱媒体
const movies = ref([
    { title: '孤独摇滚', type: '动漫', genre: '' },
    { title: '坂本日常', type: '动漫', genre: '' },
    { title: '神秘博士', type: '电视剧', genre: '英剧' },
    { title: '葬送的芙莉莲', type: '动漫', genre: '' },
    { title: '迷宫饭', type: '动漫', genre: '' },
    { title: 'JOJO的奇幻冒险', type: '动漫', genre: '' },
    { title: '破地狱', type: '电影', genre: '港片' },
    { title: '走走停停', type: '电影', genre: '胡歌、高圆圆' },
    { title: '"骗骗"喜欢你', type: '电影', genre: '' },
])

const music = ref([
    { title: '词人', author: '黄伟文 ' },
    { title: '歌手', author: '' },
])

const books = ref([
    { title: '挪威的森林', author: '村上春树', genre: '文学' },
    { title: '三体', author: '刘慈欣', genre: '科幻' },
    { title: '百年孤独', author: '马尔克斯', genre: '魔幻现实主义' }
])

const games = ref([
    { title: '星之卡比', genre: '探索发现/重返梦幻岛/新星同盟', platform: 'Switch' },
    { title: '英雄联盟', genre: '大乱斗', platform: 'PC' },
])

// 社交平台
const socialPlatforms = ref([
    {
        name: '微博',
        icon: '📱',
        iconUrl: '/image/weibo.png',
        username: 'LeeYiuTing',
        url: 'https://weibo.com/u/3966599608'
    },
    {
        name: 'B站',
        icon: '📺',
        iconUrl: '/image/bilibili.png',
        username: 'LeeYiuTing',
        url: 'https://space.bilibili.com/4385026'
    },
    {
        name: '豆瓣',
        icon: '📚',
        iconUrl: '/image/douban.png',
        username: 'LeeYiuTing',
        url: 'https://www.douban.com/people/202367928',
    },
    {
        name: '网易云音乐',
        icon: '🎵',
        iconUrl: '/image/wyy.png',
        username: '司徒钟意',
        url: 'https://music.163.com/#/user/home?id=54444014',
    },
    {
        name: '微信',
        icon: '💬',
        iconUrl: '/image/weixin.png',
        username: 'MrYaoTing',
        url: '',
    }
])

const openPlatform = (url) => {
    if (url) {
        window.open(url, '_blank')
    }
}

const copyUsername = async (username) => {
    try {
        await navigator.clipboard.writeText(username)
        showToast({
            message: "已复制",
            duration: "500"
        })
    } catch (err) {
        // 降级方案：使用传统方法复制
        const textArea = document.createElement('textarea')
        textArea.value = username
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        showToast({
            message: "已复制",
            duration: "700"
        })
    }
}
</script>

<template>
    <div class="app">
        <van-nav-bar title="个人资料" fixed />
        <div class="content">
            <!-- 个人信息 -->
            <div class="personal-info">
                <van-cell-group inset>
                    <van-cell center>
                        <template #icon>
                            <van-image class="image" :src="info.avatar" round width="60" height="60" fit="cover" />
                        </template>
                        <template #title>
                            <div class="user-info">
                                <h3>{{ info.name }}</h3>
                                <p class="basic-info">
                                    {{ info.age }}岁 · {{ info.occupation }}
                                </p>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>

                <van-cell-group inset class="intro-section">
                    <van-cell title="个人简介" />
                    <van-cell>
                        <template #default>
                            <p class="intro-text">{{ info.intro }}</p>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>

            <!-- 兴趣爱好 -->
            <div class="hobbies">
                <van-cell-group inset>
                    <van-cell title="🩵 我的兴趣爱好" @click="toggleInfo('hobbies')"><van-icon :name=" infoExpanded.hobbies ? 'arrow-down':'arrow' " /></van-cell>
                </van-cell-group>

                <van-grid :column-num="2" :gutter="10" class="hobbies-grid" v-if="infoExpanded.hobbies">
                    <van-grid-item v-for="hobby in hobbies" :key="hobby.name" class="grid-item-relative"
                        @click="toAlbum(hobby)">
                        <!-- 斜体 -->
                        <van-tag class="corner-tag" type="success" size="mini" v-if="hobby.click" style="font-style: italic;">click !!</van-tag>
                        <div class="hobby-card">
                            <div class="hobby-icon">{{ hobby.icon }}</div>
                            <h4>{{ hobby.label }}</h4>
                            <p>{{ hobby.desc }}</p>
                        </div>
                    </van-grid-item>
                </van-grid>
            </div>

            <!-- 喜爱媒体 -->
            <div class="favorite-media">
                <van-cell-group inset>
                    <van-cell title="🎬️ 近来赏析" @click="toggleInfo('media')"><van-icon :name=" infoExpanded.media ? 'arrow-down':'arrow' " /></van-cell>
                </van-cell-group>

                <div v-if="infoExpanded.media">
                    <van-cell-group inset class="media-section">
                        <van-cell title="📽️ 观影" />
                        <van-cell v-for="movie in movies" :key="movie.title" :title="movie.title"
                            :label="`${movie.type}  ${movie.genre}`">
                        </van-cell>
                    </van-cell-group>

                    <van-cell-group inset class="media-section">
                        <van-cell title="🎮 游戏" />
                        <van-cell v-for="game in games" :key="game.title" :title="game.title"
                            :label="`${game.platform} · ${game.genre}`">
                        </van-cell>
                    </van-cell-group>

                    <van-cell-group inset class="media-section">
                        <van-cell title="📚 书籍" />
                        <van-cell v-for="book in books" :key="book.title" :title="book.title"
                                  :label="`${book.author}`">
                        </van-cell>
                    </van-cell-group>

                    <van-cell-group inset class="media-section">
                        <van-cell title="🎵 音乐(往下点击网易云)" />
                    </van-cell-group>
                </div>
            </div>

            <!-- 社交平台 -->
            <div class="social-platforms">
                <van-cell-group inset>
                    <van-cell title="👥 社交平台链接" @click="toggleInfo('social')"><van-icon :name=" infoExpanded.social ? 'arrow-down':'arrow' " /></van-cell>
                </van-cell-group>

                <van-cell-group inset class="platforms-list" v-if="infoExpanded.social">
                    <van-cell v-for="platform in socialPlatforms" :key="platform.name" :title="platform.name"
                        :label="platform.description" is-link @click="openPlatform(platform.url)">
                        <template #icon>
                            <van-image class="platform-icon-image" v-if="platform.iconUrl" :src="platform.iconUrl" />
                            <span class="platform-icon" v-else>{{ platform.icon }}</span>
                        </template>
                        <template #right-icon>
                            <div class="platform-info" @click.stop="copyUsername(platform.username)">
                                <span class="username">{{ platform.username }}</span>
                                <van-tag type="success" size="small">Copy</van-tag>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.app {
    min-height: 100vh;
    background: @background-color;

    .content {
        padding-top: 46px;
        padding-bottom: 20px;
    }
}

.personal-info {
    margin: @padding-lg;

    .user-info {
        margin-left: 10px;

        h3 {
            margin: 0 0 @padding-xs 0;
            color: @text-color;
            font-size: @font-size-xl;
            font-weight: 600;
        }

        .basic-info {
            margin: 0;
            color: @text-color-2;
            font-size: @font-size-sm;
        }
    }

    .intro-section {
        margin-top: @padding-md;

        .intro-text {
            margin: 0;
            color: @text-color;
            line-height: 1.6;
            font-size: @font-size-md;
            text-align: left;
        }
    }
}

.hobbies {
    margin: @padding-lg;

    .hobbies-grid {
        margin-top: @padding-md;
        width: 97%;
        margin: 10px auto;

        .grid-item-relative {
            position: relative;
            overflow: visible;

            .corner-tag {
                position: absolute;
                right: -5px;
                top: -4px;
                z-index: 2;
                pointer-events: none;
            }
        }

        .hobby-card {
            text-align: center;
            padding: @padding-md;

            .hobby-icon {
                font-size: 2rem;
                margin-bottom: @padding-xs;
            }

            h4 {
                margin: 0 0 @padding-xs 0;
                color: @text-color;
                font-size: @font-size-md;
                font-weight: 600;
            }

            p {
                margin: 0;
                color: @text-color-2;
                font-size: @font-size-sm;
                line-height: 1.4;
            }
        }
    }
}

.favorite-media {
    margin: @padding-lg;

    .media-section {
        margin-top: @padding-md;
    }
}

.social-platforms {
    margin: @padding-lg;

    .platforms-list {
        margin-top: @padding-md;

        .platform-icon {

            font-size: 1.5rem;
            margin-right: @padding-sm;
        }

        .platform-icon-image {
            width: 25px;
            height: 25px;
            margin-right: @padding-sm;
        }

        .platform-info {
            display: flex;
            align-items: center;
            gap: @padding-xs;

            .username {
                color: @text-color-2;
                font-size: @font-size-sm;
                cursor: pointer;
                padding: 2px 4px;
                border-radius: 4px;
                transition: background-color 0.2s;

                &:hover {
                    background-color: @background-color;
                }
            }
        }
    }
}
</style>