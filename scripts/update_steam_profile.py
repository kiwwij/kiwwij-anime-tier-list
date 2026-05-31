import json
import os
import requests
import time

# --- НАСТРОЙКИ ---
STEAM_API_KEY = os.environ.get('STEAM_API_KEY')
STEAM_ID = os.environ.get('STEAM_ID')

OUTPUT_FILENAME = 'steam-profile-data.js'
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, 'data', OUTPUT_FILENAME)

def get_steam_level():
    """Получает уровень Steam"""
    url = f"http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key={STEAM_API_KEY}&steamid={STEAM_ID}"
    try:
        return requests.get(url).json()['response']['player_level']
    except:
        return "??"

def get_profile_data():
    """Получает аватар, ник, статус, цвет и возраст"""
    url = f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={STEAM_API_KEY}&steamids={STEAM_ID}"
    try:
        r = requests.get(url)
        data = r.json()['response']['players'][0]
        
        status_map = { 0: 'Offline', 1: 'Online', 2: 'Busy', 3: 'Away', 4: 'Snooze', 5: 'In Game' }
        status_colors = { 0: '#9E9E9E', 1: '#4CAF50', 2: '#F44336', 3: '#FFC107', 4: '#673AB7', 5: '#4CAF50' }
        
        personastate = data.get('personastate', 0)
        is_in_game = bool(data.get('gameextrainfo') or data.get('game_extrainfo'))
        current_state_id = 5 if is_in_game else (1 if personastate in [5, 6] else personastate)

        status_text = status_map.get(current_state_id, 'Offline')
        status_color = status_colors.get(current_state_id, '#9E9E9E')

        # Вычисляем возраст аккаунта (в годах)
        timecreated = data.get('timecreated')
        age = round((time.time() - timecreated) / 31536000, 1) if timecreated else "??"

        return {
            "nickname": data.get('personaname'),
            "avatar": data.get('avatarfull'),
            "profileUrl": data.get('profileurl'),
            "status": status_text,
            "statusColor": status_color,
            "level": get_steam_level(),
            "age": age
        }
    except Exception as e:
        print(f"❌ Ошибка получения профиля: {e}")
        return None

def get_recent_games():
    """Получает недавние игры"""
    url = f"http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key={STEAM_API_KEY}&steamid={STEAM_ID}&format=json&count=10"
    try:
        r = requests.get(url)
        games = r.json()['response'].get('games', [])
        parsed_games = []
        for g in games:
            parsed_games.append({
                "appid": g['appid'],
                "name": g['name'],
                "playtime_2weeks": round(g.get('playtime_2weeks', 0) / 60, 1),
                "hours": round(g.get('playtime_forever', 0) / 60, 1),
                "image": f"https://cdn.cloudflare.steamstatic.com/steam/apps/{g['appid']}/header.jpg",
                "url": f"https://store.steampowered.com/app/{g['appid']}"
            })
        return parsed_games
    except Exception as e:
        return []

def get_owned_games():
    """Получает все игры"""
    url = f"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={STEAM_API_KEY}&steamid={STEAM_ID}&include_appinfo=1&include_played_free_games=1&format=json"
    try:
        r = requests.get(url)
        games = r.json()['response'].get('games', [])
        games.sort(key=lambda x: x.get('playtime_forever', 0), reverse=True)
        
        parsed_games = []
        for g in games:
            parsed_games.append({
                "appid": g['appid'],
                "name": g['name'],
                "hours": round(g.get('playtime_forever', 0) / 60, 1),
                "image": f"https://cdn.cloudflare.steamstatic.com/steam/apps/{g['appid']}/header.jpg",
                "url": f"https://store.steampowered.com/app/{g['appid']}"
            })
        return parsed_games
    except Exception as e:
        return []

def main():
    if 'ВСТАВЬ' in STEAM_API_KEY:
        print("🛑 ОШИБКА: Ключи не найдены!")
        return

    print("🎮 Сбор данных Steam...")
    profile = get_profile_data()
    recent_games = get_recent_games()
    all_games = get_owned_games()
    
    if not profile:
        return

    # Автодобавление Dota 2
    dota_in_recent = next((game for game in recent_games if game['appid'] == 570), None)
    if dota_in_recent and not any(g['appid'] == 570 for g in all_games):
        all_games.append({
            "appid": 570, "name": "Dota 2", "hours": dota_in_recent['hours'], 
            "image": dota_in_recent['image'], "url": dota_in_recent['url']
        })
            
    all_games.sort(key=lambda x: x.get('hours', 0), reverse=True)
    top_20 = all_games[:20]

    print("🏷️ Получаем жанры для Топ-20 игр (занимает ~12 сек)...")
    for game in top_20:
        try:
            # АПИ магазина не требует ключа, берем русские названия жанров
            store_url = f"https://store.steampowered.com/api/appdetails?appids={game['appid']}&l=russian"
            res = requests.get(store_url).json()
            if res and str(game['appid']) in res and res[str(game['appid'])]['success']:
                genres = res[str(game['appid'])]['data'].get('genres', [])
                game['tags'] = [g['description'] for g in genres]
            else:
                game['tags'] = ["Без жанра"]
            time.sleep(0.6) # Защита от блокировки IP (Rate Limit)
        except Exception:
            game['tags'] = ["Без жанра"]

    steam_data = {
        "profile": profile,
        "stats": { "total_games": len(all_games) },
        "recent_games": recent_games,      
        "top_games": top_20
    }

    js_content = f"// AUTO-GENERATED STEAM DATA\nconst steamData = {json.dumps(steam_data, ensure_ascii=False, indent=4)};\n"
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"✅ УСПЕХ! Данные сохранены.")

if __name__ == "__main__":
    main()
