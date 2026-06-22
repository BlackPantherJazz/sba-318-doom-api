# MF DOOM API

ALL CAPS when you spell the man name.

An Express.js REST API celebrating MF DOOM's legacy — albums, aliases, and reviews.

## How to Run

1. Clone the repo: `git clone https://github.com/BLACKPANTHERJAZZ/sba-318-doom-api.git`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. Visit: `http://localhost:3000`

## API Endpoints

### Albums
- GET `/api/albums` — all albums (filter by `?genre=` or `?year=`)
- GET `/api/albums/:id` — single album
- POST `/api/albums` — create album
- PATCH `/api/albums/:id` — update album
- DELETE `/api/albums/:id` — delete album

### Aliases
- GET `/api/aliases` — all aliases (filter by `?active=true`)
- GET `/api/aliases/:id` — single alias

### Reviews
- GET `/api/reviews` — all reviews (filter by `?albumId=`)
- GET `/api/reviews/:id` — single review
- POST `/api/reviews` — create review
- PATCH `/api/reviews/:id` — update review
- DELETE `/api/reviews/:id` — delete review

## Tech Stack
- Node.js
- Express.js
- EJS