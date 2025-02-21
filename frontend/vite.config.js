import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    allow: ['public'], // Allow only public folder
    deny: ['._darcs', '.bzr', '.hg', 'BitKeeper'], // Block these hidden files
    headers: {
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline'; " +
        "style-src 'self' https://fonts.googleapis.com; " +
        "img-src 'self' data: https://smiski.com/e/products/; " +
        "frame-ancestors 'none'; " +
        "form-action 'self';",
      'X-Content-Type-Options': 'nosniff', // ZAP alert solve
    },

    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
    },

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },

    fs: {
      strict: true,
    },

    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if (req.url.match(/(^\/\.)|(_darcs|\.bzr|\.hg|BitKeeper|\.git)/)) {
          res.statusCode = 403;
          return res.end('Access Denied');
        }
        next();
      });
    },
  },

  build: {
    minify: 'esbuild',
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },

  hmr: {
    overlay: false,
  },
});
