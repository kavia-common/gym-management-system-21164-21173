# Gym Frontend – Ocean Professional Scaffold

A clean React scaffold aligned with the Ocean Professional theme. Provides a minimal layout shell (TopBar + SideNav), React Router setup, and placeholder pages. Authentication is intentionally deferred.

## Features

- Ocean Professional theme (colors, shadows, surface)
- Minimal app shell: top bar + side navigation
- React Router pages:
  - `/` (Welcome landing)
  - `/dashboard`
  - `/classes`
  - `/bookings`
  - `/memberships`
- No authentication or auth context required at this stage

## Getting Started

In the project directory:

- `npm start` – start development server
- `npm run build` – create production build
- `npm test` – run tests (if configured)

This project uses the existing CRA toolchain (react-scripts). No extra UI libraries are required.

## Environment Variables

No environment variables are required for this scaffold to run.
Optional:
- `REACT_APP_APP_NAME` (defaults to `Gym Manager`)

Note:
- Google Sign-In and any OAuth-related configuration will be set up later if needed. This scaffold purposely avoids reading `REACT_APP_GOOGLE_*` keys so builds run cleanly without secrets.

## Structure

- `src/theme/colors.js` – Ocean palette constants
- `src/components/Layout/` – `TopBar.jsx`, `SideNav.jsx`, `Layout.jsx`
- `src/pages/` – `Welcome.jsx`, `Dashboard.jsx`, `Classes.jsx`, `Bookings.jsx`, `Memberships.jsx`
- `src/App.jsx` – routes and shell usage
- `src/main.jsx` – entrypoint
- `src/index.css` – base theme styles

## Styling

Basic inline styles and simple CSS are used. No complex dependencies.

## Next Steps

- Add real authentication and user state when backend is ready (optional).
- Replace placeholder content with live data from backend APIs.
- Expand navigation and access control as required.
