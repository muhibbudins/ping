import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

interface Detail {
  domain: string
  ip: string
  bytes: string
}

interface Hops {
  bytes: string
  ip: string
  icmp_seq: string
  ttl: string
  time: string
}

interface Result {
  transmitted: string
  received: string
  loss: string
}

interface Stats {
  min: string
  avg: string
  max: string
  stddev: string
}

type Output = {
  detail: Detail
  hops: Array<Hops>
  result: Result
  stats: Stats
}

const PATTERN_A = /^PING\s(.+)\s\((.+)\):?\s(\d+)/
const PATTERN_B = /^(\d+).*?from\s(.+)\:.*?icmp_seq=(\d+).*?ttl=(\d+).*?time=(.+)\s\ms.*?/
const PATTERN_C = /^(\d+).+(\d+).+\,\s(\d\.?\d?).+/
const PATTERN_D = /.+\s=\s(.+)\/(.+)\/(.+)\/(.+)\s\ms/

function Parser(raw: string): Output {
  const data = <Output>{}

  data.hops = []

  raw.split('\n')
    .map(line => {
      if (PATTERN_A.test(line)) {
        const [, domain, ip, bytes] = PATTERN_A.exec(line) || []
        data['detail'] = { domain, ip, bytes }
      }
      if (PATTERN_B.test(line)) {
        const [, bytes, ip, icmp_seq, ttl, time] = PATTERN_B.exec(line) || []
        data['hops'].push({ bytes, ip, icmp_seq, ttl, time })
      }
      if (PATTERN_C.test(line)) {
        const [, transmitted, received, loss] = PATTERN_C.exec(line) || []
        data['result'] = { transmitted, received, loss }
      }
      if (PATTERN_D.test(line)) {
        const [, min, avg, max, stddev] = PATTERN_D.exec(line) || []
        data['stats'] = { min, avg, max, stddev }
      }
    })
    .filter(line => line)

  return data
}

export default async function Ping(destination: string, times: number = 4): Promise<Output> {
  let result = await exec(`ping ${destination} -c ${times}`, { output: OutputMode.Capture });
  return Parser(result.output)
}