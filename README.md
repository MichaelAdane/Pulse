# Pulse — independent music streaming
React music player powered by the Audius public API, plus private device-local audio imports.

## Run locally
Requires Node.js and Python 3.

    npm install
    npm run build
    npm run dev

Open http://localhost:3000. Rebuild after editing source. The build first generates the original demo audio using Python’s standard library. Compiled assets and generated audio are intentionally not committed.

    node tests/player.test.mjs
    node tests/catalog.test.mjs

## Streaming
The Discover tab fetches trending tracks or debounced search results from https://api.audius.co/v1. Genre chips filter the API request. Only available, streamable, non-gated tracks are shown. Playback uses the official /tracks/{id}/stream endpoint (not an extracted or stored third-party URL). No API secret is embedded. Read/search/stream requests were verified without credentials during development on 2026-10-30; availability, API requirements, and rate limits may change.

Audius track art and artist profile images are displayed with artist/title attribution and source links. Album images also appear in the mini-player, expanded player, queue, and supported system media controls. Unavailable artwork has a local fallback. Audius has its own independent catalog; this does not provide every song available on Spotify, SoundCloud, or YouTube. No remote audio is downloaded for offline storage.

SoundCloud was evaluated but requires registered app credentials and OAuth. No third-party credentials or scraping were used. YouTube external search cards were replaced with playable Audius artists.

## Player and library
- Responsive cover grid, featured track, artist portraits and consistent Lucide icons.
- Expanded Now Playing/Up Next dialog, mobile bottom navigation and accessible playlist dialog.
- Stable queue: browsing doesn't change playback until a track is selected.
- Previous/next, shuffle, repeat, seeking, volume and keyboard controls.
- Media Session metadata, play/pause, skip and seek controls where supported.
- Imported audio stored in IndexedDB. Filenames in Artist - Title.mp3 form supply metadata.
- Likes, playlists and remote track metadata persist in localStorage. Imported files remain on the device.
- No accounts, shared playlists, server uploads or payment flows.

## Screen off
Start a song in your mobile browser, then lock the screen or switch apps. Keep the tab open. Browser/OS/battery policy controls continuation and automatic track transitions. Media Session supplies lock-screen controls but cannot force background execution. Hardware playback remains unverified. If a track fails, Pulse shows an error; try another track or check your connection.

## Source
- src/main.jsx: UI, catalog state, player and library
- src/catalog.mjs: API requests and response normalization
- src/media.mjs: Media Session integration and bounded seeking
- src/storage.mjs: IndexedDB imports
- src/queue.mjs: queue selection
- src/style.css: responsive UI
- tests/: catalog and player behavior checks

Local storage can be cleared or evicted; keep original files. Remote track availability can change. Refresh fetches current catalog results; saved metadata is not a permanent streaming guarantee.

## Verification
Build and automated player/catalog checks passed. Direct live HTTP checks returned search/trending data, CORS access, valid JPEG artwork, and partial MP3 audio (206 response) from the stream endpoint. Browser tool failed at startup with a read-only filesystem error; the preview relay was also unavailable. Visual layout, browser playback, IndexedDB persistence, and physical-device background behavior are not claimed as verified.

## Catalog coverage
Amharic catalog coverage has not been verified. Audius search requests from the development environment returned HTTP 403 during follow-up checks on 2026-11-02. The earlier successful audio checks do not guarantee current availability.
