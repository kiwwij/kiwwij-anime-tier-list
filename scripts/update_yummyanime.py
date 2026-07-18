import json
import os
import re
import sys
from playwright.sync_api import sync_playwright

PROFILE_URL = "https://ru.yummyani.me/users/id114344"
OUTPUT_FILENAME = "yummyanime-data.js"

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, "data", OUTPUT_FILENAME)

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
        page = context.new_page()
        
        try:
            print("🚀 Переход на страницу...")
            page.goto(PROFILE_URL, timeout=40000)
            
            print("⏳ Ожидание статистики...")
            page.wait_for_selector(".xU", timeout=25000)
            
            clean_text = page.locator("body").inner_text()

            matches = re.findall(r'(\d+)\s*ч', clean_text)
            
            hours = max(map(int, matches)) if matches else 0
            
            print(f"✅ Найдено часов: {hours}")

            anime_data = {
                "totalHours": hours,
                "profileUrl": PROFILE_URL
            }

            js_content = f"// AUTO-GENERATED YUMMYANIME DATA\nconst yummyAnimeData = {json.dumps(anime_data, ensure_ascii=False, indent=4)};\n"
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(js_content)
            print(f"✅ Файл сохранен.")

        except Exception as e:
            page.screenshot(path="error_screenshot.png")
            print(f"❌ Ошибка: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    main()
