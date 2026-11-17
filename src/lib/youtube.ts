export function youtubeVideoId(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;
    const host = url.hostname.toLowerCase();
    const parts = url.pathname.split('/').filter(Boolean);
    let id: string | null | undefined;
    if (host === 'youtu.be') id = parts[0];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v')
        : ['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : undefined;
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : undefined;
  } catch {
    return undefined;
  }
}

export function youtubeEmbedUrl(value?: string): string | undefined {
  const id = youtubeVideoId(value);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : undefined;
}

const thumbnailCache = new Map<string, Promise<string | undefined>>();

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

export async function youtubeThumbnailDataUrl(value?: string): Promise<string | undefined> {
  const id = youtubeVideoId(value);
  if (!id) return undefined;
  const cached = thumbnailCache.get(id);
  if (cached) return cached;

  const result = (async () => {
    for (const filename of ['maxresdefault.jpg', 'hqdefault.jpg']) {
      try {
        const response = await fetch(`https://i.ytimg.com/vi/${id}/${filename}`, { signal: AbortSignal.timeout(6000) });
        if (!response.ok) continue;
        const bytes = new Uint8Array(await response.arrayBuffer());
        if (bytes.length === 0) continue;
        return `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${bytesToBase64(bytes)}`;
      } catch {
        // Keep trying the smaller fallback; the designed placeholder remains if both fail.
      }
    }
    return undefined;
  })();

  thumbnailCache.set(id, result);
  return result;
}
