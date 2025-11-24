import json
import os
import re
from ytmusicapi import YTMusic

# --- НАСТРОЙКА ПУТЕЙ ---
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, 'data', 'music-data.js')

# --- СКРАПИНГ ---
yt = YTMusic()

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
        # Получаем данные плейлиста
        response = yt.get_playlist(pl["id"], limit=None)
        
        # 1. Парсим просмотры плейлиста (удаляем всё кроме цифр)
        raw_views = response.get('views', '0') # Например: "1,543 views"
        clean_views = int(re.sub(r'\D', '', str(raw_views))) if raw_views else 0
        total_playlist_views += clean_views
        
        print(f"Плейлист {pl['name']}: {len(response['tracks'])} треков, {clean_views} просмотров")

        for track in response['tracks']:
            if track['title'] and track['artists']:
                # 2. Считаем длительность (ytmusicapi обычно отдает duration_seconds)
                # Если duration_seconds нет, можно попробовать распарсить 'duration': '3:50'
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

# Формируем объект дополнительной статистики
stats_obj = {
    "totalViews": total_playlist_views,
    "totalDurationSec": total_duration_seconds
}

# Формируем JS контент (теперь две переменные)
js_content = f"""
const musicData = {json.dumps(all_tracks, ensure_ascii=False, indent=4)};
const musicStats = {json.dumps(stats_obj, ensure_ascii=False, indent=4)};
"""

# Записываем в файл
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Готово! Файл сохранен: {output_path}")
print(f"Всего треков: {len(all_tracks)}")
print(f"Общая длительность: {total_duration_seconds} сек")