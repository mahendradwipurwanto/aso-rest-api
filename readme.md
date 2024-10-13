# ASO REST API - Sequence

### Check the [Postman Documentation Here](https://documenter.getpostman.com/view/27591148/2sAXxS9BtE)

## Play Store

### 1. Search Apps
Search apps based on query keyword and set the limit on each request from play store data

```url
[GET] {your-host-api}/api/play-store/search
```

#### Example Query Params

```json
{
  "query": "chrome",
  "limit": 10
}
```

### 2. App Info
Get the app info of selected app on play store based on app id

```url
[GET] {your-host-api}/api/play-store/app-info
```

#### Example Query Params

```json
{
  "id": "com.gojek.app"
}
```

### 3. Competitors
Get list of competitors based on id of preferred app at play store

```url
[GET] {your-host-api}/api/play-store/competitors
```

#### Example Query Params

```json
{
  "id": "com.android.chrome"
}
```

## 2. App Store

### 1. Search Apps
Search apps based on query keyword and set the limit on each request from app store data

```url
[GET] {your-host-api}/api/app-store/search
```

#### Example Query Params

```json
{
  "query": "Gojek",
  "limit": 10
}
```

### 2. App Info
Get the app info of selected app on app store based on id

```url
[GET] {your-host-api}/api/app-store/app-info
```

#### Example Query Params

```json
{
  "id": 944875099
}
```

### 3. Competitors
Get list of competitors based on id of preferred app at app store

```url
[GET] {your-host-api}/api/app-store/competitors
```

#### Example Query Params

```json
{
  "id": 944875099
}
```