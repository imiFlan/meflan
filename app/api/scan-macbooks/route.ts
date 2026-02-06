import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const log = (msg: string) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ log: msg })}\n\n`));
      };

      try {
        log('🇵🇱 Starting scan of Polish stores...');
        
        // Simulate scanning different stores
        const stores = [
          'Allegro.pl',
          'OLX.pl',
          'eBay.pl',
          'Amazon.pl',
          'Ceneo.pl',
          'FB Marketplace'
        ];

        const results: any[] = [];

        for (const store of stores) {
          log(`🔍 Scanning ${store}${store === 'FB Marketplace' ? ' (Katowice area)' : ''}...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulate finding some listings
          const count = Math.floor(Math.random() * 5) + 2;
          log(`✅ Found ${count} listings on ${store}`);
          
          // Add mock results
          for (let i = 0; i < count; i++) {
            const type = ['Air', 'Pro'][Math.floor(Math.random() * 2)];
            const size = ['13"', '14"', '15"', '16"'][Math.floor(Math.random() * 4)];
            const chip = ['M1', 'M2', 'M1 Pro', 'M2 Pro'][Math.floor(Math.random() * 4)];
            const ram = ['8GB', '16GB', '32GB'][Math.floor(Math.random() * 3)];
            const storage = ['256GB', '512GB', '1TB'][Math.floor(Math.random() * 3)];
            const price = Math.floor(Math.random() * 6000) + 2000;
            const listingId = Math.floor(Math.random() * 900000) + 100000;
            const slug = `macbook-${type.toLowerCase()}-${chip.toLowerCase().replace(' ', '-')}-${ram.toLowerCase()}-${storage.toLowerCase()}`;

            const storeUrls: Record<string, string> = {
              'Allegro.pl': `https://allegro.pl/oferta/${slug}-${listingId}`,
              'OLX.pl': `https://olx.pl/d/oferta/${slug}-${listingId}`,
              'eBay.pl': `https://ebay.pl/itm/${slug}-${listingId}`,
              'Amazon.pl': `https://amazon.pl/dp/${slug}-${listingId}`,
              'Ceneo.pl': `https://ceneo.pl/oferta/${slug}-${listingId}`,
              'FB Marketplace': `https://www.facebook.com/marketplace/katowice/item/${slug}-${listingId}`,
            };

            results.push({
              model: `MacBook ${type} ${size}`,
              chip,
              ram,
              storage,
              price,
              source: store,
              condition: ['Nowy', 'Używany', 'Odnowiony'][Math.floor(Math.random() * 3)],
              url: storeUrls[store] || `https://${store.toLowerCase()}/listing/${listingId}`
            });
          }
          
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        log(`✨ Scan complete! Found ${results.length} total listings.`);
        
        // Send final results
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
          log: '📦 Updating results...', 
          results 
        })}\n\n`));
        
        await new Promise(resolve => setTimeout(resolve, 500));
        log('✅ Results updated!');
        
      } catch (error) {
        log(`❌ Error: ${error}`);
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
