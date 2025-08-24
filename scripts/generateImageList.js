const fs = require('fs');
const path = require('path');

// 图片文件扩展名
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];

// 读取目录下的所有图片文件
function getImageFiles(dirPath) {
    const imageFiles = [];

    try {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                const ext = path.extname(file).toLowerCase();
                if (IMAGE_EXTENSIONS.includes(ext)) {
                    // 生成相对于public目录的路径
                    const relativePath = path.join('image/camera', file).replace(/\\/g, '/');
                    imageFiles.push({
                        name: file,
                        path: `/${relativePath}`,
                        size: stat.size,
                        extension: ext
                    });
                }
            }
        });

        return imageFiles;
    } catch (error) {
        console.error('读取目录失败:', error.message);
        return [];
    }
}

// 生成JSON文件
function generateImageList() {
    const folderName = 'camera';
    const imageDir = path.join(__dirname, `../public/image/${folderName}`);
    const outputFile = path.join(__dirname, `../src/data/${folderName}List.json`);

    console.log('正在扫描图片目录:', imageDir);

    // 检查目录是否存在
    if (!fs.existsSync(imageDir)) {
        console.error('图片目录不存在:', imageDir);
        console.log('请确保 public/image 目录存在');
        return;
    }

    const images = getImageFiles(imageDir);

    if (images.length === 0) {
        console.log('未找到任何图片文件');
        return;
    }

    // 创建输出目录
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 生成JSON数据
    const imageList = images;

    // 写入JSON文件
    try {
        fs.writeFileSync(outputFile, JSON.stringify(imageList, null, 2), 'utf8');
        console.log(`✅ 成功生成图片列表文件: ${outputFile}`);
        console.log(`📊 共找到 ${images.length} 张图片:`);

        images.forEach((img, index) => {
            console.log(`  ${index + 1}. ${img.name} (${img.path})`);
        });

    } catch (error) {
        console.error('写入文件失败:', error.message);
    }
}

// 运行脚本
if (require.main === module) {
    generateImageList();
}

module.exports = { generateImageList, getImageFiles }; 