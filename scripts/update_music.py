import json
import os
import re
from ytmusicapi import YTMusic

# --- НАСТРОЙКА ПУТЕЙ ---
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, 'data', 'music-data.js')

# --- СКРАПИНГ ---
yt = YTMusic(language='en')

playlists = [
    {"id": "PLov5IgTS5pqlgCtFnLEi7x7uFdu6mQj-C", "name": "Main"},
    # {"id": "PLov5IgTS5pqmmF8hmlVcQXWpUBai2C7EZ", "name": "Japan"}
    # {"id": "PLov5IgTS5pqktJQvn8Qsd9tMlrR1XNnu2", "name": "Dead inside"}
    # {"id": "PLov5IgTS5pqkDuC__SDej4G0zxH4KKTCJ", "name": "chill"}
]

all_tracks = []
total_duration_seconds = 0
total_playlist_views = 0

print("Начинаю скачивание треков...")

for pl in playlists:
    try:
        response = yt.get_playlist(pl["id"], limit=None)
        
        # --- ПРОСТОЙ ПАРСИНГ ---
        # Получаем строку (например "12K views" или "12,345 views")
        raw_views = str(response.get('views', '0'))
        
        # Оставляем ТОЛЬКО цифры (удаляем K, M, views, запятые и т.д.)
        digits_only = re.sub(r'\D', '', raw_views)
        
        clean_views = int(digits_only) if digits_only else 0
        
        total_playlist_views += clean_views
        print(f"Плейлист {pl['name']}: {clean_views} (сырые данные: {raw_views})")
        # -----------------------

        for track in response['tracks']:
            if track.get('title') and track.get('artists'):
                seconds = track.get('duration_seconds')
                if not seconds and 'duration' in track:
                    parts = track['duration'].split(':')
                    if len(parts) == 2:
                        seconds = int(parts[0]) * 60 + int(parts[1])
                    elif len(parts) == 3:
                        seconds = int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
                
                if seconds:
                    total_duration_seconds += seconds

                all_tracks.append({
                    "title": track['title'],
                    "artist": track['artists'][0]['name'],
                    "playlist": pl["name"]
                })
    except Exception as e:
        print(f"Ошибка с плейлистом {pl['name']}: {e}")

# Формируем данные
stats_obj = {
    "totalViews": total_playlist_views,
    "totalDurationSec": total_duration_seconds
}

js_content = f"""// Этот файл сгенерирован автоматически скриптом update_music.py
const musicData = {json.dumps(all_tracks, ensure_ascii=False, indent=4)};
const musicStats = {json.dumps(stats_obj, ensure_ascii=False, indent=4)};
"""

with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Готово! Файл сохранен.")