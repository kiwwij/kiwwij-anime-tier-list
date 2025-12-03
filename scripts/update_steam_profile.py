import json
import os
import requests

# --- НАСТРОЙКИ ---
# Для GitHub Actions используем os.environ.get
STEAM_API_KEY = os.environ.get('STEAM_API_KEY')
STEAM_ID = os.environ.get('STEAM_ID')

# Имя файла, которое мы подключили в HTML
OUTPUT_FILENAME = 'steam-profile-data.js'
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, 'data', OUTPUT_FILENAME)

def get_profile_data():
    """Получает аватар, ник, статус и цвет"""
    url = f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={STEAM_API_KEY}&steamids={STEAM_ID}"
    try:
        r = requests.get(url)
        data = r.json()['response']['players'][0]
        
        # Текст статусов
        status_map = {
            0: 'Offline',
            1: 'Online',
            2: 'Busy',
            3: 'Away',
            4: 'Snooze',
            5: 'In Game',
        }

        # Цвета статусов (любой будешь использовать одинаковым стилем)
        status_colors = {
            0: '#9E9E9E',
            1: '#4CAF50',
            2: '#F44336',
            3: '#FFC107',
            4: '#673AB7',
            5: '#4CAF50',  
        }
        
        personastate = data.get('personastate', 0)

        # Проверка "просто в игре" без названия игры
        is_in_game = bool(data.get('gameextrainfo') or data.get('game_extrainfo'))

        if is_in_game:
            current_state_id = 5
        else:
            current_state_id = 1 if personastate in [5, 6] else personastate

        status_text = status_map.get(current_state_id, 'Offline')
        status_color = status_colors.get(current_state_id, '#9E9E9E')

        # DEBUG
        print(f"🔍 DEBUG: Steam State: {personastate}")
        print(f"🔍 DEBUG: In Game: {is_in_game}")
        print(f"🔍 DEBUG: Final Status: {status_text} (Color: {status_color})")

        return {
            "nickname": data.get('personaname'),
            "avatar": data.get('avatarfull'),
            "profileUrl": data.get('profileurl'),
            "status": status_text,      # Только текст
            "statusColor": status_color # Только цвет
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
            img_url = f"https://cdn.cloudflare.steamstatic.com/steam/apps/{g['appid']}/header.jpg"
            parsed_games.append({
                "appid": g['appid'],
                "name": g['name'],
                "playtime_2weeks": round(g.get('playtime_2weeks', 0) / 60, 1),
                "hours": round(g.get('playtime_forever', 0) / 60, 1),
                "image": img_url,
                "url": f"https://store.steampowered.com/app/{g['appid']}"
            })
        return parsed_games
    except Exception as e:
        print(f"❌ Ошибка Recent Games: {e}")
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
            hours = round(g.get('playtime_forever', 0) / 60, 1)
            img_url = f"https://cdn.cloudflare.steamstatic.com/steam/apps/{g['appid']}/header.jpg"
            parsed_games.append({
                "appid": g['appid'],
                "name": g['name'],
                "hours": hours,
                "image": img_url,
                "url": f"https://store.steampowered.com/app/{g['appid']}"
            })
        return parsed_games
    except Exception as e:
        print(f"❌ Ошибка All Games: {e}")
        return []

def main():
    if 'ВСТАВЬ' in STEAM_API_KEY:
        print("🛑 ОШИБКА: Ключи не найдены! Вставь их в скрипт.")
        return

    print("🎮 Сбор данных Steam...")
    
    profile = get_profile_data()
    recent_games = get_recent_games()
    all_games = get_owned_games()
    
    if not profile:
        print("❌ Не удалось получить профиль.")
        return

    steam_data = {
        "profile": profile,
        "stats": {
            "total_games": len(all_games)
        },
        "recent_games": recent_games,      
        "top_games": all_games[:20]
    }

    js_content = f"""// AUTO-GENERATED STEAM DATA
const steamData = {json.dumps(steam_data, ensure_ascii=False, indent=4)};
"""
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"✅ УСПЕХ! Данные сохранены в {OUTPUT_FILENAME}")
    print(f"   👤 Ник: {profile['nickname']}")
    print(f"   ℹ️  Статус: {profile['status']}")
    print(f"   🎨 Цвет: {profile['statusColor']}")

if __name__ == "__main__":
    main()