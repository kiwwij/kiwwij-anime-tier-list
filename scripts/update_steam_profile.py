import json
import os
import requests

# --- НАСТРОЙКИ ---
# Для GitHub Actions используем os.environ.get
STEAM_API_KEY = os.environ.get('STEAM_API_KEY',)
STEAM_ID = os.environ.get('STEAM_ID',)

# Имя файла, которое мы подключили в HTML
OUTPUT_FILENAME = 'steam-profile-data.js'
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, 'data', OUTPUT_FILENAME)

def get_profile_data():
    """Получает аватар, ник, статус и текущую игру"""
    url = f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={STEAM_API_KEY}&steamids={STEAM_ID}"
    try:
        r = requests.get(url)
        data = r.json()['response']['players'][0]
        
        # Статусы на английском
        status_map = {
            0: 'Offline',
            1: 'Online',
            2: 'Busy',
            3: 'Away',
            4: 'Snooze',
        }
        
        # Базовый статус
        status_text = status_map.get(data.get('personastate', 0), 'Offline')
        
        # Проверяем, запущена ли игра
        game_name = data.get('game_extrainfo')
        
        # --- ОТЛАДКА (Покажет в консоли, что видит скрипт) ---
        print(f"🔍 DEBUG: Статус ID: {data.get('personastate')}")
        print(f"🔍 DEBUG: Игра (game_extrainfo): {game_name}")
        # -----------------------------------------------------

        if game_name:
            # Если игра запущена, ставим фиксированный статус "In Game"
            status_text = "In Game"

        return {
            "nickname": data.get('personaname'),
            "avatar": data.get('avatarfull'), 
            "profileUrl": data.get('profileurl'),
            "status": status_text,
            "game_extrainfo": game_name 
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

    js_content = f"""// Этот файл сгенерирован автоматически скриптом update_steam_profile.py
const steamData = {json.dumps(steam_data, ensure_ascii=False, indent=4)};
"""
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"✅ УСПЕХ! Данные сохранены в {OUTPUT_FILENAME}")
    print(f"   👤 Ник: {profile['nickname']}")
    # Выводим финальный статус, который записался в файл
    print(f"   ℹ️  Финальный статус: {profile['status']}")

if __name__ == "__main__":
    main()