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
        'f:\\2025\\project\\laodoublog\\public\\images\\gallery',
        'f:\\2025\\project\\laodoublog\\public\\images\\blog'
    ]
    for folder in image_folders:
        convert_to_webp(folder)