import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

interface Detail {
  domain: string
  ip: string
  bytes: number
}

interface Hops {
  bytes: number
  ip: string
  sequence: number
  ttl: number
  time: number
}

interface Result {
  transmitted: number
  received: number
  loss: number
}

interface Stats {
  min: number
  avg: number
  max: number
  stddev: number
}

type Output = {
  hops: Array<Hops>
  stats: Stats
  detail: Detail
  result: Result
}

const PATTERN_HOPS = /^(\d+).*?from\s(.+)\:.*?icmp_seq=(\d+).*?ttl=(\d+).*?time=(.+)\s\ms.*?/
const PATTERN_STATS = /.+\s=\s(.+)\/(.+)\/(.+)\/(.+)\s\ms/
const PATTERN_RESULT = /^(\d+).+(\d+).+\,\s(\d\.?\d?).+/
const PATTERN_DETAIL = /^PING\s(.+)\s\((.+)\):?\s(\d+)/

function Parser(raw: string): Output {
  const data = <Output>{}

  data.hops = []

  raw.split('\n')
    .map(line => {
      if (PATTERN_HOPS.test(line)) {
        const [,
          bytes,
          ip,
          icmp_seq,
          ttl,
          time
        ] = PATTERN_HOPS.exec(line) || []

        data['hops'].push({
          ip,
          bytes: parseFloat(bytes),
          sequence: parseFloat(icmp_seq),
          ttl: parseFloat(ttl),
          time: parseFloat(time)
        })
      }
      if (PATTERN_STATS.test(line)) {
        const [,
          min,
          avg,
          max,
          stddev
        ] = PATTERN_STATS.exec(line) || []
        
        data['stats'] = {
          min: parseFloat(min),
          avg: parseFloat(avg),
          max: parseFloat(max),
          stddev: parseFloat(stddev)
        }
      }
      if (PATTERN_RESULT.test(line)) {
        const [,
          transmitted,
          received,
          loss
        ] = PATTERN_RESULT.exec(line) || []

        data['result'] = {
          transmitted: parseFloat(transmitted),
          received: parseFloat(received),
          loss: parseFloat(loss)
        }
      }
      if (PATTERN_DETAIL.test(line)) {
        const [,
          domain,
          ip,
          bytes] = PATTERN_DETAIL.exec(line) || []

        data['detail'] = {
          ip,
          domain,
          bytes: parseFloat(bytes)
        }
      }
    })
    .filter(line => line)

  return data
}

export default async function Ping(
  destination: string,
  times: number = 4
): Promise<Output> {
  let result = await exec(
    `ping ${destination} -c ${times}`,
    {
      output: OutputMode.Capture
    }
  );

  return Parser(result.output)
}
