import json
import os
import re
import random
from ytmusicapi import YTMusic

# --- НАСТРОЙКА ПУТЕЙ ---
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, 'data', 'music-data.js')

# --- СКРАПИНГ (На английском, чтобы получать K/M) ---
yt = YTMusic(language='en')

playlists = [
    {"id": "PLov5IgTS5pqlgCtFnLEi7x7uFdu6mQj-C", "name": "Main"},
    # {"id": "PLov5IgTS5pqmmF8hmlVcQXWpUBai2C7EZ", "name": "Japan"}
]

all_tracks = []
total_duration_seconds = 0
total_playlist_views = 0

print("Начинаю скачивание треков...")

for pl in playlists:
    try:
        response = yt.get_playlist(pl["id"], limit=None)
        
        # --- ГЕНЕРАТОР КРАСИВЫХ ПРОСМОТРОВ ---
        raw_views = str(response.get('views', '0')).lower().strip()
        print(f"YouTube отдал: {raw_views}") 

        clean_views = 0
        
        # Убираем запятые (12,5K -> 12.5K)
        safe_raw = raw_views.replace(',', '.')
        # Ищем число (12 или 12.5)
        match = re.search(r'[\d\.]+', safe_raw)
        
        if match:
            number = float(match.group())
            
            if 'k' in raw_views:
                # Если это тысячи (12K)
                base = int(number * 1000)
                
                # ЛОГИКА РАНДОМА:
                # Если число целое (12K), добавляем от 100 до 999
                # Если число дробное (12.5K), добавляем от 10 до 99 (чтобы не перепрыгнуть 12.6K)
                if '.' in match.group():
                     noise = random.randint(0, 99)
                else:
                     noise = random.randint(123, 987) # Случайный хвост
                
                clean_views = base + noise
                
            elif 'm' in raw_views:
                # Если это миллионы (1.2M)
                base = int(number * 1000000)
                noise = random.randint(10000, 99999)
                clean_views = base + noise
            
            else:
                # Если просто число (мало просмотров, например 500)
                clean_views = int(number)

        total_playlist_views += clean_views
        print(f"--> Красивое число для сайта: {clean_views}")
        # --------------------------------

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

js_content = f"""
const musicData = {json.dumps(all_tracks, ensure_ascii=False, indent=4)};
const musicStats = {json.dumps(stats_obj, ensure_ascii=False, indent=4)};
"""

with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Готово! Файл сохранен: {output_path}")
print(f"Всего треков: {len(all_tracks)}")