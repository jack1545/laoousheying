import os
from PIL import Image

def convert_to_webp(source_folder):
    for root, _, files in os.walk(source_folder):
        for file in files:
            if file.lower().endswith('.jpg') and file.lower() != 'cover.jpg':
                file_path = os.path.join(root, file)
                try:
                    img = Image.open(file_path).convert("RGB")
                    webp_path = os.path.splitext(file_path)[0] + '.webp'
                    img.save(webp_path, 'webp')
                    print(f'Converted {file_path} to {webp_path}')
                    os.remove(file_path) # Delete original jpg file
                    print(f'Deleted {file_path}')
                except Exception as e:
                    print(f'Could not convert {file_path}: {e}')

if __name__ == '__main__':
    image_folders = [
        'f:\\2025\\project\\laodoublog\\public\\images\\1.第一课  摄影简史、相机的发展及现代摄影的范畴',
        'f:\\2025\\project\\laodoublog\\public\\images\\2.第二课  相机、附件及各种功能设置',
        'f:\\2025\\project\\laodoublog\\public\\images\\3.第三课   摄影曝光原理（一）',
        'f:\\2025\\project\\laodoublog\\public\\images\\4..第四课  摄影曝光原理（二）',
        'f:\\2025\\project\\laodoublog\\public\\images\\5.第五课  摄影构图（一）',
        'f:\\2025\\project\\laodoublog\\public\\images\\6.第六课  摄影构图（二）',
        'f:\\2025\\project\\laodoublog\\public\\images\\7.第七课  摄影用光',
        'f:\\2025\\project\\laodoublog\\public\\images\\8.第八课  摄影色彩的运用',
        'f:\\2025\\project\\laodoublog\\public\\images\\9.第九课  作品赏析与创作思路',
        'f:\\2025\\project\\laodoublog\\public\\images\\10.第十课  学员作业点评'
    ]
    for folder in image_folders:
        convert_to_webp(folder)