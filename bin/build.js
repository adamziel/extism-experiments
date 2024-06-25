import esbuild from 'esbuild';
import fs from 'fs';
import http from 'node:http'

const ctx = await esbuild.context({
    entryPoints: ['index.ts'],
    bundle: true,
    format: 'esm',
    minify: false,
    sourcemap: false,
    
    outfile: 'index.built.js',
});

if (process.argv.includes('--serve')) {
    let { host, port } = await ctx.serve({
        servedir: '.',
    });

    // Then start a proxy server on port 3000
    http.createServer((req, res) => {
    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }
  
    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", send a custom 404 page
      if (proxyRes.statusCode === 404) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('<h1>A custom 404 page</h1>')
        return
      }
  
        proxyRes.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
        proxyRes.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
        
      // Otherwise, forward the response from esbuild to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res, { end: true })
    })
  
    // Forward the body of the request to esbuild
    req.pipe(proxyReq, { end: true })
  }).listen(3000)

    console.log(`App server is running on http://localhost:${port}`);
} else {
    await ctx.build();
}