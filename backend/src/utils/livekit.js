import crypto from 'crypto';

/**
 * Generates a signed LiveKit Access Token JWT using HS256 and LIVEKIT_API_SECRET
 * Compliant with LiveKit JWT claim specification.
 */
export function generateLiveKitToken({
  identity,
  name,
  roomName,
  canPublish = false,
  canSubscribe = true,
  ttlSeconds = 3600
}) {
  const apiKey = process.env.LIVEKIT_API_KEY || 'dev_livekit_key';
  const apiSecret = process.env.LIVEKIT_API_SECRET || 'dev_livekit_secret';
  const livekitUrl = process.env.LIVEKIT_URL || 'wss://demo.livekit.cloud';

  const now = Math.floor(Date.now() / 1000);
  const exp = now + ttlSeconds;

  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    sub: identity || `user_${Date.now()}`,
    name: name || 'Tarang User',
    iss: apiKey,
    nbf: now - 5,
    exp,
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: Boolean(canPublish),
      canSubscribe: Boolean(canSubscribe),
      canPublishData: Boolean(canPublish)
    },
    metadata: JSON.stringify({
      app: 'tarang-radio',
      role: canPublish ? 'publisher' : 'subscriber'
    })
  };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${b64Header}.${b64Payload}`)
    .digest('base64url');

  const token = `${b64Header}.${b64Payload}.${signature}`;

  return {
    token,
    livekitUrl,
    room: roomName,
    identity: payload.sub,
    expiresAt: exp
  };
}
