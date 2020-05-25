# Ping

Simple watcher file for build an application using deno

### Usage

```typescript
import Ping from "https://denopkg.com/muhibbudins/ping/mod.ts";

const result = await Ping("google.com", 2);
console.log(result);
```

Result content

```json
{
  "hops": [
    {
      "bytes": 64,
      "ip": "216.239.38.120",
      "sequence": 0,
      "ttl": 52,
      "time": 17.125
    },
    {
      "bytes": 64,
      "ip": "216.239.38.120",
      "sequence": 1,
      "ttl": 52,
      "time": 15.484
    }
  ],
  "detail": {
    "domain": "forcesafesearch.google.com",
    "ip": "216.239.38.120",
    "bytes": 56
  },
  "result": {
    "transmitted": 2,
    "received": 2,
    "loss": 0
  },
  "stats": {
    "min": 15.484,
    "avg": 16.305,
    "max": 17.125,
    "stddev": 0.82
  }
}
```

### License

This project is under MIT License
