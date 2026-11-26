# WorldWise

A travel tracker where you click anywhere on a world map to log the cities you've visited, with the date and your notes. Built with **React 18**, **TypeScript**, **React Router** and **Leaflet**.

**Live demo:** _coming soon_ · Demo login: `jack@example.com` / `qwerty` (pre-filled)

## Features

- **Interactive map.** Click the map to add a city. The city name and country are filled in automatically through reverse geocoding.
- **Use my location.** Jump the map to your current position with the browser's Geolocation API.
- **Cities and countries.** Browse your trips as a list of cities or grouped by country, with flag emojis.
- **City details.** Each city has its own URL (`/app/cities/:id`) showing the date visited, notes and a Wikipedia link.
- **URL as state.** The map position is stored in the query string (`?lat=…&lng=…`), so any view can be shared.
- **Fake auth and protected routes.** The `/app` area is only reachable after logging in.
- **Persistent data.** Your trips are saved in `localStorage`, and sample trips are shown on the first visit.

## Tech stack

| | |
|---|---|
| UI | React 18, CSS Modules |
| Language | TypeScript |
| Routing | React Router v6 (nested routes, protected routes, URL params and query strings) |
| State | Context API + `useReducer` (`CitiesContext`, `AuthContext`) |
| Map | Leaflet + React Leaflet |
| APIs | BigDataCloud reverse geocoding, browser Geolocation |
| Tooling | Vite 5, ESLint |

## Getting started

```bash
git clone https://github.com/Abdel-Fadeel/WorldWise.git
cd WorldWise
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── components/   # Map, Sidebar, CityList, CountryList, CityDetails, Form, …
├── contexts/     # CitiesContext (trips) and AuthContext (fake login)
├── hooks/        # useCities, useAuth, useGeolocation, useUrlPosition
├── pages/        # Homepage, Product, Pricing, Login, AppLayout, ProtectedRoute
├── data/         # Sample trips
└── utils/
```

## Deployment

Deployed on Vercel. `vercel.json` rewrites every route to `index.html`, so deep links like `/app/cities/1` work.

## Author

**Abdel-Fadeel Hamdy**, Front-End Engineer · [GitHub](https://github.com/Abdel-Fadeel)
