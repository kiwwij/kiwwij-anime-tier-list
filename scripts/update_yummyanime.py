import json
import os
import re
from playwright.sync_api import sync_playwright

PROFILE_URL = "https://ru.yummyani.me/users/id114344"
OUTPUT_FILENAME = "yummyanime-data.js"

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, "data", OUTPUT_FILENAME)

def main():
    print("🚀 Запуск браузера для сбора данных с YummyAnime...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            page.goto(PROFILE_URL, timeout=30000)
            
            print("⏳ Ожидание загрузки статистики (может занять пару секунд)...")
            page.wait_for_selector("text='Время продолжительности эпизодов'", timeout=15000)
            
            clean_text = page.locator("body").inner_text()
            
            hours = 0
            block_keyword = "Время продолжительности эпизодов"
            block_index = clean_text.find(block_keyword)
            
            if block_index != -1:
                print("✅ Найден нужный блок. Анализируем...")
                block_text = clean_text[block_index : block_index + 250]
                
                matches = re.findall(r'(\d+)\s*[чЧ]', block_text)
                
                if matches:
                    hours = max(map(int, matches))
                    print(f"✅ Найдено часов: {hours}")
                else:
                    print("⚠️ Не удалось найти цифры внутри блока.")
            else:
                print("⚠️ Блок 'Время продолжительности эпизодов' не найден.")

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
            print(f"❌ Ошибка парсинга: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    main()