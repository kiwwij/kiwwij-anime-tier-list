import json
import os
import re
import requests

PROFILE_URL = "https://ru.yummyani.me/users/id114344"
OUTPUT_FILENAME = "yummyanime-data.js"

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, "data", OUTPUT_FILENAME)

def main():
    print("🚀 Сбор данных с YummyAnime...")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
    }

    try:
        response = requests.get(PROFILE_URL, headers=headers, timeout=10)
        response.raise_for_status()
        
        match = re.search(r'>\s*(\d+)\s*ч\s*<', response.text)
        
        if match:
            hours = int(match.group(1))
            print(f"✅ Найдено часов: {hours}")
        else:
            print("⚠️ Точное совпадение не найдено. Проверьте структуру HTML.")
            hours = 0

        anime_data = {
            "totalHours": hours,
            "profileUrl": PROFILE_URL
        }

        js_content = f"// AUTO-GENERATED YUMMYANIME DATA\nconst yummyAnimeData = {json.dumps(anime_data, ensure_ascii=False, indent=4)};\n"
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(js_content)
            
        print(f"✅ Данные успешно сохранены в {OUTPUT_FILENAME}")

    except Exception as e:
        print(f"❌ Ошибка получения профиля: {e}")

if __name__ == "__main__":
    main()