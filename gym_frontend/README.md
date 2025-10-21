# Gym Frontend – Ocean Professional

A React UI aligned with the Ocean Professional theme, now with a pluggable API layer, entity state via Zustand, and core CRUD pages (Dashboard, Classes, Bookings, Memberships). Authentication is a no-op and can be wired later without changing pages.

## Features

- Ocean Professional theme (colors, shadows, surface)
- Minimal app shell: top bar + side navigation
- React Router pages:
  - `/` (Welcome landing)
  - `/dashboard`
  - `/classes`
  - `/bookings`
  - `/memberships`
- Axios API client with baseURL from `REACT_APP_API_URL` (fallback `http://localhost:4000`)
- Pluggable auth utilities (no-op): `setToken`, `getToken`, `isAuthenticated`
- Zustand store for entities (classes, bookings, memberships)
- Reusable common components: `Table`, `Form`, `Loader`
- No Google Sign-In required or enforced

## Getting Started

In the project directory:

- `npm start` – start development server
- `npm run build` – create production build
- `npm test` – run tests (if configured)

This project uses the CRA toolchain (react-scripts). No extra UI libraries are required.

## Environment Variables

Optional:
- `REACT_APP_APP_NAME` (defaults to `Gym Manager`)
- `REACT_APP_API_URL` (defaults to `http://localhost:4000`)

Note:
- Google Sign-In and any OAuth-related configuration will be set up later if needed. This app does not read `REACT_APP_GOOGLE_*` keys and does not require Google auth to run.

## Structure

- `src/theme/colors.js` – Ocean palette constants
- `src/api/` – `client.js` (axios), `services.js` (entity endpoints)
- `src/state/` – `store.js` (Zustand store)
- `src/components/Layout/` – `TopBar.jsx`, `SideNav.jsx`, `Layout.jsx`
- `src/components/common/` – `Table.jsx`, `Form.jsx`, `Loader.jsx`
- `src/pages/` – `Welcome.jsx`, `Dashboard.jsx`, `Classes.jsx`, `Bookings.jsx`, `Memberships.jsx`
- `src/App.jsx` – routes and shell usage
- `src/main.jsx` – entrypoint
- `src/index.css` – base theme styles

## Styling

Basic inline styles and simple CSS adhering to the Ocean Professional theme.

## Notes on Backend API

The following endpoints are expected by default:
- `GET/POST /classes`, `GET/PUT/DELETE /classes/:id`
- `GET/POST /bookings`, `GET/PUT/DELETE /bookings/:id`
- `GET/POST /memberships`, `GET/PUT/DELETE /memberships/:id`

If your backend differs, adjust `src/api/services.js` accordingly.

## Auth

A no-op token store is provided in `src/utils/auth.js`. You may later call:
```js
import { setToken } from './utils/auth';
setToken('<jwt>');
```
The axios client will automatically attach it as `Authorization: Bearer <jwt>` to all requests.
