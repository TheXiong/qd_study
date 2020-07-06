const SitemapGenerator = require('sitemap-generator');
 
// create generator
const generator = SitemapGenerator('http://127.0.0.1:8081/', {
  stripQuerystring: false,
  maxDepth: 10,
  filepath: './sitemap_zh.xml',
  lastMod: true,
  priorityMap: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
});
let count = 0
generator.on('add', (url) => {
    count++;
    console.log(url,count);
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.log('done');
  
});
 
// start the crawler
generator.start();