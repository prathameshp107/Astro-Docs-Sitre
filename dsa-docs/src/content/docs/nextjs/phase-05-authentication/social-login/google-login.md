# Google Login

## Introduction

Google Login lets users sign in with their Google account. Auth.js makes this straightforward — you just configure the provider and add the environment variables.

## Why Google Login?

- Users don't need to create another account
- Higher sign-up conversion rates
- Google handles security (2FA, suspicious login detection)
- Access to Google profile data (name, email, avatar)

## Setup

### 1. Create a Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to APIs & Services → Credentials
4. Create OAuth 2.0 Client ID
5. Set Application type to "Web application"
6. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Copy the Client ID and Client Secret

### 2. Add Environment Variables

```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### 3. Configure the Provider

```ts
// lib/auth.ts
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}
```

### 4. Add Login Button

```tsx
<button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
  Sign in with Google
</button>
```

## Production Setup

For production, add your production URL to the authorized redirect URIs:

```
https://yourdomain.com/api/auth/callback/google
```

## Common Mistakes

- **Wrong redirect URI** — Must match exactly, including the trailing path `/api/auth/callback/google`
- **Missing environment variables** — The provider won't work without `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- **Testing on localhost without HTTPS** — Some Google features require HTTPS, even for local development

## Best Practices

- Add both localhost and production redirect URIs
- Use separate OAuth apps for development and production
- Verify the email domain if your app is internal

## Summary

Google Login requires creating an OAuth app in Google Cloud Console, adding environment variables, and configuring the Google provider in Auth.js. The callback URL must match exactly.

## Related Topics

- [GitHub Login](./github-login.md)
- [Custom Provider](./custom-provider.md)
- [Auth.js Providers](../authjs/providers.md)
