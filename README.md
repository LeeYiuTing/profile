# 个人资料页面 - Vant重构版

这是一个使用Vue 3 + Vant UI组件库构建的现代化个人资料展示页面，包含相册展示等功能，并实现了可复用的浮动返回按钮组件。

## 技术栈

- Vue 3 Composition API
- Vant 4.x UI组件库
- Vite 构建工具
- Less 预处理器
- Vue Router 路由管理

## 项目结构

```
profile/
├── public/             # 静态资源
├── src/
│   ├── components/     # 组件
│   │   ├── FloatingBackButton.vue  # 浮动返回按钮组件
│   │   ├── PhotoWall.vue           # 相册组件
│   │   └── SkillsSection.vue       # 技能展示组件
│   ├── data/           # 数据文件
│   ├── router/         # 路由配置
│   ├── styles/         # 样式文件
│   ├── views/          # 视图组件
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── style.css       # 全局样式
├── index.html          # 入口HTML
├── package.json        # 依赖配置
├── README.md           # 项目说明
└── vite.config.js      # Vite配置
```

## 功能特点

1. **相册展示**：使用瀑布流布局展示图片，支持点击放大预览
2. **浮动返回按钮**：可拖动的右下角返回按钮，支持PC和移动端
3. **响应式设计**：适配不同屏幕尺寸的设备

## 组件说明

### FloatingBackButton 组件

可拖动的浮动返回按钮组件，支持以下特性：
- 支持鼠标拖动和触摸拖动
- 限制在屏幕可视区域内
- 区分点击和拖动操作
- 可配置初始位置

#### 使用方式

```vue
<FloatingBackButton :initialRight="50" :initialBottom="80" />
```

#### 参数说明

- `initialRight`：初始右距离，默认值50px
- `initialBottom`：初始下距离，默认值80px

## 安装与运行

1. 克隆项目
```bash
git clone <项目地址>
cd profile
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 注意事项

1. 如需使用自定义域名访问，需在`vite.config.js`中配置`allowedHosts`
2. 图片资源需放在`public/image`目录下
3. 项目使用了Vue 3的Composition API，建议熟悉相关语法后进行开发

## 更新日志

- 添加可拖动的浮动返回按钮组件
- 优化相册展示效果
- 修复移动端拖动问题
- 提取公共组件，提高代码复用性

## 项目特性

- 🎨 使用Vant组件库，提供现代化的移动端UI体验
- 📱 响应式设计，适配移动端和桌面端
- 🎯 模块化组件设计
- 🎨 使用Less预处理器，支持变量和嵌套

## 组件结构

- `PersonalInfo.vue` - 个人信息展示
- `SkillsSection.vue` - 技能专长展示
- `Hobbies.vue` - 兴趣爱好展示
- `FavoriteMedia.vue` - 喜爱的媒体展示

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 主要改进

1. **UI组件化**: 使用Vant组件替换原生HTML元素
2. **样式系统**: 引入Less预处理器，使用变量管理样式
3. **移动端优化**: 采用移动端优先的设计理念
4. **组件库集成**: 完整的Vant组件库集成

## 使用的Vant组件

- `van-nav-bar` - 导航栏
- `van-cell-group` - 单元格组
- `van-cell` - 单元格
- `van-image` - 图片组件
- `van-grid` - 宫格组件
- `van-grid-item` - 宫格项
- `van-tag` - 标签
- `van-progress` - 进度条