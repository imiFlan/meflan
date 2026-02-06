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
          'Ceneo.pl'
        ];

        const results: any[] = [];

        for (const store of stores) {
          log(`🔍 Scanning ${store}...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulate finding some listings
          const count = Math.floor(Math.random() * 5) + 2;
          log(`✅ Found ${count} listings on ${store}`);
          
          // Add mock results
          for (let i = 0; i < count; i++) {
            results.push({
              model: `MacBook ${['Air', 'Pro'][Math.floor(Math.random() * 2)]} ${['13"', '14"', '15"', '16"'][Math.floor(Math.random() * 4)]}`,
              chip: ['M1', 'M2', 'M1 Pro', 'M2 Pro'][Math.floor(Math.random() * 4)],
              ram: ['8GB', '16GB', '32GB'][Math.floor(Math.random() * 3)],
              storage: ['256GB', '512GB', '1TB'][Math.floor(Math.random() * 3)],
              price: Math.floor(Math.random() * 6000) + 2000,
              source: store,
              condition: ['Nowy', 'Używany', 'Odnowiony'][Math.floor(Math.random() * 3)],
              url: `https://${store.toLowerCase()}`
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
