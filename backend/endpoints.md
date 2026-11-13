# Backend endpoints

Base URL for local development: `http://localhost:8000`

Send JSON requests with `Content-Type: application/json`, except registration
when uploading a profile photo (use `multipart/form-data`).

## API endpoints

### Register

`POST /api/users/register/`

Creates an account. Required fields: `full_name`, `email`, `password`, and
`confirm_password`. Passwords must match. Optional fields: `phone_number`,
`country`, and `profile_photo`.

Example JSON body:

```json
{
  "full_name": "Alex Black",
  "email": "alex@gmail.com",
  "password": "my-password",
  "confirm_password": "my-password",
  "phone_number": "+233123456789",
  "country": "GH"
}
```

Returns the created user data on success. Use `multipart/form-data` instead of
JSON when including `profile_photo`.

### Log in

`POST /api/users/login/`

Example request:

```json
{
  "email": "alex@gmail.com",
  "password": "my-password"
}
```

On success, returns `access` and `refresh`. Invalid credentials return `401`;
suspended accounts return `403`.

### Request a password reset

`POST /api/users/forgot-password/`

Example request:

```json
{
  "email": "alex@gmail.com"
}
```

If the email belongs to an account, sends a reset link and returns a message.
The link points to the frontend `/reset-password/` page with `uid` and `token`
query parameters. Unknown email addresses will return `404`.


### Reset password

`POST /api/users/reset-password/`

Send the `uid` and `token` from the reset link together with the new password:

```json
{
  "uid": 1,
  "token": "token-from-reset-link",
  "new_password": "my-new-password"
}
```

Returns a success message if the token is valid and the password passes the
configured Django password validators. Invalid user IDs or tokens return
`400`.

## Profile endpoints

All profile routes require authentication and use the same base path:
`/api/profiles/`.

### Current user profile

`GET /api/profiles/me/`
`PATCH /api/profiles/me/`

Returns the authenticated user’s basic profile and allows updates to their
profile fields.

Example response:

```json
{
  "id": 1,
  "username": "alexblack",
  "email": "alex@gmail.com",
  "first_name": "Alex",
  "last_name": "Black"
}
```

Example PATCH payload:

```json
{
  "first_name": "Alex",
  "last_name": "Black"
}
```

### Host profile

`GET /api/profiles/hosts/`
`POST /api/profiles/hosts/`
`PATCH /api/profiles/hosts/`
`PUT /api/profiles/hosts/`

Creates or updates a host profile for the authenticated user. This is used for
users listing homes or hotels.

Required on create:

```json
{
  "id_type": "national_id",
  "citizenship_card": "<image-file>",
  "business_name": "Blumber Homes"
}
```

`citizenship_card` is uploaded as a file, typically via
`multipart/form-data`.

### Driver profile

`GET /api/profiles/drivers/`
`POST /api/profiles/drivers/`
`PATCH /api/profiles/drivers/`
`PUT /api/profiles/drivers/`

Creates or updates a driver profile for the authenticated user. This is used
for users providing transportation services.

Required on create:

```json
{
  "drivers_license": "<image-file>",
  "license_number": "DL-123456"
}
```

### Vendor profile

`GET /api/profiles/vendors/`
`POST /api/profiles/vendors/`
`PATCH /api/profiles/vendors/`
`PUT /api/profiles/vendors/`

Creates or updates a vendor profile for the authenticated user. This is used
for restaurants and local service providers.

Required on create:

```json
{
  "store_name": "Kofi's Grill",
  "category": "Restaurant",
  "store_address": "123 Main Street, Accra"
}
```

## Other route

`/admin/` is Django's administrative site, primarily for admin testing.
