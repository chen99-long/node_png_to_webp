const fs = require('fs');
const sharp = require('sharp');

// 输入文件夹路径和输出文件夹路径
const inputFolder = 'path/to/input/folder';
const outputFolder = 'path/to/output/folder';

// 读取输入文件夹中的所有文件
fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Error reading input folder:', err);
        return;
    }

    // 循环处理每个文件
    files.forEach(file => {
        // 仅处理PNG文件
        if (file.endsWith('.png')) {
            // 输入文件的完整路径
            const inputFilePath = `${inputFolder}/${file}`;
            // 输出文件的完整路径（以.webp格式保存）
            const outputFilePath = `${outputFolder}/${file.replace('.png', '.webp')}`;

            // 使用sharp来调整图像的大小并转换为WebP格式
            sharp(inputFilePath)
                .resize({ percentage: 80 }) // 将图像大小降低20%
                .toFormat('webp') // 转换为WebP格式
                .toFile(outputFilePath, err => {
                    if (err) {
                        console.error(`Error processing file ${file}:`, err);
                    } else {
                        console.log(`File ${file} processed successfully.`);
                    }
                });
        }
    });
});
