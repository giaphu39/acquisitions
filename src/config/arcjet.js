import arcjet, { shield, detectBot } from '@arcjet/node';

let aj;

if (process.env.NODE_ENV === 'test') {
  aj = {
    withRule: () => ({
      protect: async () => ({
        isDenied: () => false,
        reason: {
          isBot: () => false,
          isShield: () => false,
          isRateLimit: () => false,
        },
      }),
    }),
  };
} else {
  const rules = [shield({ mode: 'LIVE' })];

  // Chỉ bật kiểm tra Bot tự động trong môi trường production để không chặn Postman/cURL khi phát triển
  if (process.env.NODE_ENV === 'production') {
    rules.push(
      detectBot({
        mode: 'LIVE',
        allow: [
          'CATEGORY:SEARCH_ENGINE',
          'CATEGORY:PREVIEW',
          'CATEGORY:API_CLIENT',
          'CATEGORY:MONITOR',
        ],
      })
    );
  }

  aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules,
  });
}

export default aj;
