# FatSecret API Demo

## About the Project

This project is a **frontend-focused** demo that integrates the **FatSecret API** to search for foods and display detailed nutrition information.

Note: This is a **learning-focused personal project**, not intended for production use. The emphasis is on understanding architecture decisions, trade-offs, and real-world API constraints.

Tech stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui

## Features

- Search for foods using the FatSecret API
- Fetch food details by ID
- Display nutrition data in a structured UI
- Client-side and server-side data fetching
- Loading states and skeleton components
- Basic error handling for API responses

## Setup & Installation

### Resigter for FatSecret API Access
1. Resgiter for a Free Platform API account: https://platform.fatsecret.com/register
2. Request a Client ID and Client Secret: https://platform.fatsecret.com/docs/guides/authentication/oauth2#request-id
3. Ensure your development IP is whitelisted (required by fatsecret): https://platform.fatsecret.com/my-account/ip-restrictions

### Environment Variables
Create a `.env.local` file in the root of your project:
```
FATSECRET_CLIENT_ID=your_client_id
FATSECRET_CLIENT_SECRET=your_client_secret
```

### Start the development server
```
pnpm install
pnpm run dev
```
The app should now be running at `http://localhost:3000`.

## Learning Goals

This project focuses on the following learning outcomes:

- API Integration

    - Working with third-party APIs
    - Understanding real-world API limitations

- OAuth 2.0
    - Client credentials flow
    - Token-based authentication

- Data Mapping
    - Transforming API responses into frontend-friendly structures
    - Handling inconsistent or nested API data

- Error Handling
    - Defensive programming against undefined or unexpected responses
    - Graceful UI fallbacks

- SSR vs Client Fetching
    - Understanding when to fetch data on the server vs the client
    - Managing loading states and hydration behavior in Next.js

## Constraints & Design Decisions
Since FatSecret requires **IP address whitelisting**, this makes it incompatible with serverless platforms like Vercel for production use.

Because of this limitation:
- This project is intentionally not a full-stack deployed app
- It focuses on **API usage and frontend data handling**
- Authentication, database, and user-specific data are intentionally excluded