# Gym Frontend – Ocean Professional Scaffold

A clean React scaffold aligned with the Ocean Professional theme. Provides a minimal layout shell (TopBar + SideNav), React Router setup, and placeholder pages.

## Features

- Ocean Professional theme (colors, shadows, surface)
- Minimal app shell: top bar + side navigation
- React Router pages:
  - `/login` (Google sign-in button placeholder)
  - `/` (Dashboard)
  - `/classes`
  - `/bookings`
  - `/memberships`
- Lightweight AuthContext exposing `signInWithGoogle()` placeholder (no secrets stored)

## Getting Started

In the project directory:

- `npm start` – start development server
- `npm run build` – create production build
- `npm test` – run tests (if configured)

This project uses the existing CRA toolchain (react-scripts). No extra UI libraries are required.

## Environment Variables

The following keys are read at runtime. Values are not included in the repository and should be provided via `.env` or environment configuration.

- `REACT_APP_GOOGLE_CLIENT_ID`
- `REACT_APP_GOOGLE_CLIENT_SECRET`
- `REACT_APP_GOOGLE_REDIRECT_URI`
- `REACT_APP_GOOGLE_AUTHORIZED_ORIGIN`
- Optional: `REACT_APP_APP_NAME` (defaults to `Gym Manager`)

Note:
- The Login page contains a Google Sign-In button wired to a placeholder that logs presence of env keys. No secrets are hardcoded or persisted.
- When you implement a real OAuth flow later, wire `signInWithGoogle()` to redirect/start OAuth using your backend or Google SDK as needed.

## Structure

- `src/theme/colors.js` – Ocean palette constants
- `src/components/Layout/` – `TopBar.jsx`, `SideNav.jsx`, `Layout.jsx`
- `src/pages/` – `Login.jsx`, `Dashboard.jsx`, `Classes.jsx`, `Bookings.jsx`, `Memberships.jsx`
- `src/context/AuthContext.jsx` – simple auth stub exposing `signInWithGoogle()`
- `src/App.jsx` – routes and shell usage
- `src/main.jsx` – entrypoint
- `src/index.css` – base theme styles

## Styling

Basic inline styles and simple CSS are used. No complex dependencies.

## Next Steps

- Connect real authentication and user state.
- Replace placeholder content with live data from backend APIs.
- Expand navigation and access control as required.
