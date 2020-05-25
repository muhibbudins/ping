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
      "ip": "216.239.38.120",
      "bytes": 64,
      "sequence": 0,
      "ttl": 52,
      "time": 16.114
    },
    {
      "ip": "216.239.38.120",
      "bytes": 64,
      "sequence": 1,
      "ttl": 52,
      "time": 15.489
    }
  ],
  "detail": {
    "ip": "216.239.38.120",
    "domain": "forcesafesearch.google.com",
    "bytes": 56
  },
  "result": {
    "transmitted": 2,
    "received": 2,
    "loss": 0
  },
  "stats": {
    "min": 15.489,
    "avg": 15.802,
    "max": 16.114,
    "stddev": 0.312
  }
}
```

### License

This project is under MIT License
