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
      "bytes": "64",
      "ip": "216.239.38.120",
      "icmp_seq": "0",
      "ttl": "52",
      "time": "16.244"
    },
    {
      "bytes": "64",
      "ip": "216.239.38.120",
      "icmp_seq": "1",
      "ttl": "52",
      "time": "16.571"
    }
  ],
  "detail": {
    "domain": "forcesafesearch.google.com",
    "ip": "216.239.38.120",
    "bytes": "56"
  },
  "result": {
    "transmitted": "2",
    "received": "2",
    "loss": "0.0"
  },
  "stats": {
    "min": "16.244",
    "avg": "16.407",
    "max": "16.571",
    "stddev": "0.164"
  }
}
```

### License

This project is under MIT License
