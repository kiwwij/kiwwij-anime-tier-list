import json
import os
import re
from ytmusicapi import YTMusic

# --- НАСТРОЙКИ ---
# Имя выходного файла (Для страницы HUB)
OUTPUT_FILENAME = 'all-music-data.js'

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir) 
output_path = os.path.join(project_root, 'data', 'all-music-data.js')

# --- СПИСОК ПЛЕЙЛИСТОВ (ВСЕ 4) ---
playlists = [
    {"id": "PLov5IgTS5pqlgCtFnLEi7x7uFdu6mQj-C", "name": "Main"},
    {"id": "PLov5IgTS5pqmmF8hmlVcQXWpUBai2C7EZ", "name": "Japan"},
    {"id": "PLov5IgTS5pqktJQvn8Qsd9tMlrR1XNnu2", "name": "Dead inside"},
    {"id": "PLov5IgTS5pqkDuC__SDej4G0zxH4KKTCJ", "name": "Chill"}
]

# --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
def parse_views(view_text):
    if not view_text: return 0
    text = view_text.lower().replace('views', '').strip().replace(',', '')
    try:
        if 'k' in text: return int(float(text.replace('k', '')) * 1000)
        elif 'm' in text: return int(float(text.replace('m', '')) * 1_000_000)
        elif 'b' in text: return int(float(text.replace('b', '')) * 1_000_000_000)
        else: return int(text)
    except ValueError: return 0

def parse_duration(duration_text):
    if not duration_text: return 0
    parts = duration_text.split(':')
    if len(parts) == 2: return int(parts[0]) * 60 + int(parts[1])
    elif len(parts) == 3: return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    return 0

# --- ОСНОВНАЯ ЛОГИКА ---
def main():
    yt = YTMusic(language='en')
    all_tracks = []
    total_duration_seconds = 0
    total_playlist_views = 0

    print(f"🚀 [All] Обновление {OUTPUT_FILENAME}...")

    for pl in playlists:
        try:
            print(f"📥 Скачиваю: {pl['name']}...")
            response = yt.get_playlist(pl["id"], limit=None)
            
            raw_views = str(response.get('views', '0'))
            clean_views = parse_views(raw_views)
            total_playlist_views += clean_views
            
            for track in response.get('tracks', []):
                if not track.get('title'): continue

                seconds = track.get('duration_seconds')
                if not seconds and 'duration' in track:
                    seconds = parse_duration(track['duration'])
                
                if seconds: total_duration_seconds += seconds

                artist_name = "Unknown"
                if track.get('artists') and len(track['artists']) > 0:
                    artist_name = track['artists'][0]['name']

                all_tracks.append({
                    "title": track['title'],
                    "artist": artist_name,
                    "playlist": pl["name"],
                    "duration": track.get('duration', '0:00')
                })
        except Exception as e:
            print(f"❌ ОШИБКА с {pl['name']}: {e}")

    stats_obj = {
        "totalViews": total_playlist_views,
        "totalDurationSec": total_duration_seconds,
        "lastUpdated": "Auto-generated"
    }

    # Мы сохраняем переменные с теми же именами (musicData, musicStats),
    # т.к. они загружаются на РАЗНЫХ html страницах.
    js_content = f"""// Этот файл сгенерирован автоматически скриптом update_all_music.py
const musicData = {json.dumps(all_tracks, ensure_ascii=False, indent=4)};
const musicStats = {json.dumps(stats_obj, ensure_ascii=False, indent=4)};
"""

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"✅ Готово: {OUTPUT_FILENAME}")

if __name__ == "__main__":
    main()