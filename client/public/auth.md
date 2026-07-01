# Huiyi Jianpin - Agent Authentication

## Overview

This document provides authentication information for AI agents accessing Huiyi Jianpin's services.

## OAuth 2.0 Configuration

- **Authorization Server**: https://lecprima.com
- **Metadata**: https://lecprima.com/.well-known/oauth-authorization-server
- **Protected Resource**: https://lecprima.com/.well-known/oauth-protected-resource

## Registration

To register as an agent:

1. Visit: https://lecprima.com/oauth/register
2. Provide your agent identity and credentials
3. Receive client_id and client_secret

## Supported Authentication Methods

- Client Credentials Grant (for machine-to-machine)
- Authorization Code Grant (for user-delegated access)

## Scopes

- `openid` - Basic identity
- `profile` - Profile information
- `email` - Email address
- `api:read` - Read access to product APIs

## API Documentation

For API documentation, visit: https://lecprima.com/about

## Contact

For authentication issues, contact: support@lecprima.com