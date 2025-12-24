import json
import os
import re
import requests

YT_HANDLE = "@serhiosergey"
TG_CHANNEL_NAME = "kiwwijs"
OUTPUT_FILENAME = "social-data.js"

# ПУТИ
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
output_path = os.path.join(project_root, "data", OUTPUT_FILENAME)

# YOUTUBE
def get_channel_id_from_handle(handle: str) -> str | None:
    url = f"https://www.youtube.com/{handle}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        html = response.text

        # browseId
        match = re.search(r'"browseId":"(UC[a-zA-Z0-9_-]{20,})"', html)
        if match:
            return match.group(1)

        # canonical
        match = re.search(
            r'<link rel="canonical" href="https://www.youtube.com/channel/(UC[^"]+)"',
            html
        )
        if match:
            return match.group(1)

        print("❌ channelId не найден")
        return None

    except Exception as e:
        print(f"❌ Ошибка получения channelId: {e}")
        return None


def get_last_youtube_video(channel_id: str) -> str | None:
    rss_url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
    try:
        response = requests.get(rss_url, timeout=10)
        response.raise_for_status()

        video_ids = re.findall(r"<yt:videoId>([^<]+)</yt:videoId>", response.text)
        return video_ids[0] if video_ids else None

    except Exception as e:
        print(f"❌ Ошибка YouTube RSS: {e}")
        return None


# TELEGRAM
def get_last_telegram_post() -> int | None:
    url = f"https://t.me/s/{TG_CHANNEL_NAME}"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        matches = re.findall(
            rf'href="https://t.me/{TG_CHANNEL_NAME}/(\d+)"',
            response.text
        )
        return max(map(int, matches)) if matches else None

    except Exception as e:
        print(f"❌ Ошибка Telegram: {e}")
        return None


def main():
    print("🚀 Сбор социальных данных...")

    channel_id = get_channel_id_from_handle(YT_HANDLE)
    if not channel_id:
        print("❌ Не удалось получить YouTube channelId")
        return

    video_id = get_last_youtube_video(channel_id)
    post_id = get_last_telegram_post()

    thumbnail_url = (
        f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg" if video_id else None
    )

    social_data = {
        "youtube": {
            "handle": YT_HANDLE,
            "channelId": channel_id,
            "lastVideoId": video_id,
            "thumbnailUrl": thumbnail_url,
        },
        "telegram": {
            "channelName": TG_CHANNEL_NAME,
            "lastPostId": str(post_id) if post_id else None,
        },
    }

    js_content = (
        "// AUTO-GENERATED SOCIAL DATA\n"
        f"const socialData = {json.dumps(social_data, indent=4, ensure_ascii=False)};\n"
    )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"✅ Данные сохранены в {output_path}")


if __name__ == "__main__":
    main()
