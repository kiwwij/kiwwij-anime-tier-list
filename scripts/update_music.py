import json
import os
from ytmusicapi import YTMusic

# --- НАСТРОЙКА ПУТЕЙ ---
# Получаем путь к папке, где лежит этот скрипт (/scripts)
script_dir = os.path.dirname(os.path.abspath(__file__))
# Получаем путь к корню проекта (на уровень выше)
project_root = os.path.dirname(script_dir)
# Формируем путь к файлу данных (/data/music-data.js)
output_path = os.path.join(project_root, 'data', 'music-data.js')

# --- СКРАПИНГ ---
yt = YTMusic()

# Плейлисты
playlists = [
    {"id": "PLov5IgTS5pqlgCtFnLEi7x7uFdu6mQj-C", "name": "Main"},
    {"id": "PLov5IgTS5pqmmF8hmlVcQXWpUBai2C7EZ", "name": "Japan"}
]

all_tracks = []

print("Начинаю скачивание треков...")

for pl in playlists:
    try:
        response = yt.get_playlist(pl["id"], limit=None)
        print(f"Плейлист {pl['name']}: найдено {len(response['tracks'])} треков")
        
        for track in response['tracks']:
            if track['title'] and track['artists']:
                all_tracks.append({
                    "title": track['title'],
                    "artist": track['artists'][0]['name'],
                    "playlist": pl["name"]
                })
    except Exception as e:
        print(f"Ошибка с плейлистом {pl['name']}: {e}")

# Формируем JS контент
js_content = f"const musicData = {json.dumps(all_tracks, ensure_ascii=False, indent=4)};"

# Записываем в файл по правильному пути
# os.makedirs(os.path.dirname(output_path), exist_ok=True) # Создаст папку data, если её нет
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Готово! Файл сохранен: {output_path}")
print(f"Всего треков: {len(all_tracks)}")