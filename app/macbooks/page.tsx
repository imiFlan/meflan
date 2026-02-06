'use client';

import { useState } from 'react';

type SortKey = 'price' | 'model' | 'chip';
type SortDir = 'asc' | 'desc';

const PLN_TO_USD = 0.25;

interface MacBook {
  model: string;
  chip: string;
  ram: string;
  storage: string;
  price: number;
  source: string;
  condition: string;
  url: string;
}

const initialMacbooks: MacBook[] = [
  { model: 'MacBook Air 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 2499, source: 'Allegro.pl', condition: 'Używany', url: 'https://allegro.pl/oferta/macbook-air-m1-8gb-256gb-13-2499' },
  { model: 'MacBook Air 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 2899, source: 'OLX.pl', condition: 'Używany', url: 'https://olx.pl/d/oferta/macbook-air-m1-8gb-256gb-2899' },
  { model: 'MacBook Air 13"', chip: 'M2', ram: '8GB', storage: '256GB', price: 3499, source: 'Allegro.pl', condition: 'Nowy', url: 'https://allegro.pl/oferta/macbook-air-m2-8gb-256gb-nowy-3499' },
  { model: 'MacBook Air 13"', chip: 'M2', ram: '16GB', storage: '512GB', price: 4299, source: 'Amazon.pl', condition: 'Odnowiony', url: 'https://amazon.pl/dp/B0MACBOOKAIR-M2-16-512' },
  { model: 'MacBook Pro 14"', chip: 'M1 Pro', ram: '16GB', storage: '512GB', price: 5499, source: 'Allegro.pl', condition: 'Używany', url: 'https://allegro.pl/oferta/macbook-pro-14-m1-pro-16gb-512gb-5499' },
  { model: 'MacBook Pro 14"', chip: 'M2 Pro', ram: '16GB', storage: '512GB', price: 7299, source: 'eBay.pl', condition: 'Odnowiony', url: 'https://ebay.pl/itm/macbook-pro-14-m2-pro-16gb-512gb-7299' },
  { model: 'MacBook Pro 16"', chip: 'M2 Max', ram: '32GB', storage: '1TB', price: 9999, source: 'Allegro.pl', condition: 'Nowy', url: 'https://allegro.pl/oferta/macbook-pro-16-m2-max-32gb-1tb-9999' },
  { model: 'MacBook Air 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 2199, source: 'FB Marketplace', condition: 'Używany', url: 'https://www.facebook.com/marketplace/katowice/item/macbook-air-m1-8gb-256gb-2199' },
  { model: 'MacBook Pro 14"', chip: 'M1 Pro', ram: '16GB', storage: '512GB', price: 4899, source: 'FB Marketplace', condition: 'Używany', url: 'https://www.facebook.com/marketplace/katowice/item/macbook-pro-14-m1-pro-16gb-512gb-4899' },
];

export default function MacBooks() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [chipFilter, setChipFilter] = useState<string>('all');
  const [macbooks, setMacbooks] = useState<MacBook[]>(initialMacbooks);
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const chips = ['all', ...Array.from(new Set(macbooks.map(m => m.chip)))];

  const filtered = chipFilter === 'all' ? macbooks : macbooks.filter(m => m.chip === chipFilter);

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortKey === 'price') cmp = a.price - b.price;
    else if (sortKey === 'model') cmp = a.model.localeCompare(b.model);
    else if (sortKey === 'chip') cmp = a.chip.localeCompare(b.chip);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  };

  const handleScan = async () => {
    setScanning(true);
    setLogs([]);
    
    try {
      const response = await fetch('/api/scan-macbooks', {
        method: 'POST',
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.log) {
                setLogs(prev => [...prev, data.log]);
              }
              if (data.results) {
                setMacbooks(data.results);
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      setLogs(prev => [...prev, `❌ Error: ${error}`]);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="background-container">
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: menuOpen ? 'white' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: menuOpen ? 'none' : 'blur(10px)',
          boxShadow: menuOpen ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#333',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginRight: '1rem',
            }}
            aria-label="Menu"
          >
            <span style={{ width: '24px', height: '3px', backgroundColor: '#333', display: 'block' }} />
            <span style={{ width: '24px', height: '3px', backgroundColor: '#333', display: 'block' }} />
            <span style={{ width: '24px', height: '3px', backgroundColor: '#333', display: 'block' }} />
          </button>

          <div style={{ display: 'none', gap: '2rem' }} className="desktop-nav">
            <a href="/" style={{ color: '#333', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>Home</a>
            <a href="/about" style={{ color: '#333', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>About</a>
            <a href="/macbooks" style={{ color: '#333', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>MacBooks</a>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'none',
            borderTop: 'none',
            zIndex: 999,
          }}>
            <a href="/" style={{ color: '#333', textDecoration: 'none', fontSize: '1.2rem', padding: '0.5rem' }}>Home</a>
            <a href="/about" style={{ color: '#333', textDecoration: 'none', fontSize: '1.2rem', padding: '0.5rem' }}>About</a>
            <a href="/macbooks" style={{ color: '#333', textDecoration: 'none', fontSize: '1.2rem', padding: '0.5rem' }}>MacBooks</a>
          </div>
        )}

        {/* Main content */}
        <div style={{
          paddingTop: '90px',
          padding: '90px 1rem 2rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          }}>
            <h1 style={{
              color: '#333',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              Najtańsze MacBooki M1 i M2 🇵🇱
            </h1>
            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              Ceny z polskich sklepów: Allegro, OLX, eBay.pl, Amazon.pl, FB Marketplace (Katowice)
            </p>

            {/* Scan button */}
            <button
              onClick={handleScan}
              disabled={scanning}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: scanning ? '#999' : '#0071e3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: scanning ? 'not-allowed' : 'pointer',
                marginBottom: '1rem',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {scanning ? '🔄 Skanowanie...' : '🔍 Skanuj teraz'}
            </button>

            {/* Scan log */}
            {logs.length > 0 && (
              <div style={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                maxHeight: '200px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}>
                {logs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '0.25rem' }}>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Filter by chip */}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#555', fontSize: '0.9rem', fontWeight: '600', fontFamily: 'system-ui, sans-serif' }}>Filtruj według chipa:</span>
              {chips.map(chip => (
                <button
                  key={chip}
                  onClick={() => setChipFilter(chip)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    border: chipFilter === chip ? '2px solid #0071e3' : '1px solid #ccc',
                    borderRadius: '20px',
                    backgroundColor: chipFilter === chip ? '#0071e3' : 'white',
                    color: chipFilter === chip ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: chipFilter === chip ? '600' : '400',
                  }}
                >
                  {chip === 'all' ? 'Wszystkie' : chip}
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '0.9rem',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th
                      onClick={() => handleSort('model')}
                      style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                    >
                      Model{sortIndicator('model')}
                    </th>
                    <th
                      onClick={() => handleSort('chip')}
                      style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                    >
                      Chip{sortIndicator('chip')}
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>RAM</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Dysk</th>
                    <th
                      onClick={() => handleSort('price')}
                      style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                    >
                      Cena{sortIndicator('price')}
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Sklep</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Stan</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((mb, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid #eee',
                        backgroundColor: i % 2 === 0 ? 'white' : '#f9f9f9',
                      }}
                    >
                      <td style={{ padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>{mb.model}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span style={{
                          backgroundColor: mb.chip.startsWith('M1') ? '#e8f5e9' : '#e3f2fd',
                          color: mb.chip.startsWith('M1') ? '#2e7d32' : '#1565c0',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          whiteSpace: 'nowrap',
                        }}>
                          {mb.chip}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: '#555' }}>{mb.ram}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: '#555' }}>{mb.storage}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span style={{ color: '#333', fontWeight: '700' }}>{mb.price} zł</span>
                        <br />
                        <span style={{ color: '#888', fontSize: '0.8rem' }}>~${Math.round(mb.price * PLN_TO_USD)}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <a
                          href={mb.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0071e3', textDecoration: 'none', fontWeight: '500' }}
                        >
                          {mb.source}
                        </a>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: '#555', whiteSpace: 'nowrap' }}>{mb.condition}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <a
                          href={mb.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'white',
                            backgroundColor: '#0071e3',
                            padding: '0.3rem 0.7rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Zobacz →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{
              color: '#999',
              fontSize: '0.8rem',
              marginTop: '1.5rem',
              fontFamily: 'system-ui, sans-serif',
            }}>
              Ceny są orientacyjne i mogą się różnić. Kurs USD przybliżony (1 PLN ≈ ${PLN_TO_USD} USD). Ostatnia aktualizacja: Luty 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
