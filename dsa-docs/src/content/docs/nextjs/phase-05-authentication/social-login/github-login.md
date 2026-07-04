---
title: "GitHub Login"
description: "GitHub Login lets users sign in with their GitHub account. It's one of the most popular OAuth providers for developer-facing applications."
---

# GitHub Login

## Introduction

GitHub Login lets users sign in with their GitHub account. It's one of the most popular OAuth providers for developer-facing applications.

## Setup

### 1. Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

### 2. Add Environment Variables

```bash
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 3. Configure the Provider

```ts
// lib/auth.ts
import GitHubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
}
```

### 4. Add Login Button

```tsx
<button onClick={() => signIn('github', { callbackUrl: '/dashboard' })}>
  Sign in with GitHub
</button>
```

## Production Setup

Update the GitHub OAuth app with your production URL:

| Field | Development | Production |
|-------|-------------|------------|
| Homepage URL | `http://localhost:3000` | `https://yourdomain.com` |
| Callback URL | `http://localhost:3000/api/auth/callback/github` | `https://yourdomain.com/api/auth/callback/github` |

## Common Mistakes

- **Callback URL mismatch** — The path must end with `/api/auth/callback/github`. A trailing slash difference can break the flow.
- **Forgetting to update URLs for production** — Create separate OAuth apps or use multiple callback URLs.
- **Exposing the client secret** — Never commit the secret to version control.

## Best Practices

- Create separate OAuth apps for development and production
- Use environment variables for all OAuth credentials
- Enable additional OAuth scopes only if needed (e.g., `read:user` is default)

## Summary

GitHub Login requires creating an OAuth app in GitHub Developer Settings, adding environment variables, and configuring the GitHub provider in Auth.js. Use separate apps for dev and production.

## Related Topics

- [Google Login](./google-login.md)
- [Custom Provider](./custom-provider.md)
- [Auth.js Providers](../authjs/providers.md)
