import type { NextApiRequest } from "next";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 10000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

// nginx sets X-Real-IP from $remote_addr, overriding any client-supplied value
export function clientIp(req: NextApiRequest): string {
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real) return real;
  return req.socket?.remoteAddress ?? "unknown";
}
