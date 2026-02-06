'use client';

import { useState } from 'react';

type SortKey = 'price' | 'model' | 'chip';
type SortDir = 'asc' | 'desc';

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

const macbooks: MacBook[] = [
  { model: 'MacBook Air 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 399, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/b/MacBook-Air/111422/bn_339956' },
  { model: 'MacBook Air 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 499, source: 'eBay', condition: 'Good', url: 'https://www.ebay.com/b/MacBook-Air/111422/bn_339956' },
  { model: 'MacBook Air 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 599, source: 'Amazon', condition: 'Renewed', url: 'https://www.amazon.com/Macbook-Air-M1/s?k=Macbook+Air+M1' },
  { model: 'MacBook Air 13"', chip: 'M1', ram: '16GB', storage: '256GB', price: 549, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/b/MacBook-Air/111422/bn_339956' },
  { model: 'MacBook Air 13"', chip: 'M2', ram: '8GB', storage: '256GB', price: 549, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/shop/mac-air-m2?_nkw=mac+air+m2' },
  { model: 'MacBook Air 13"', chip: 'M2', ram: '16GB', storage: '256GB', price: 679, source: 'Amazon', condition: 'Renewed', url: 'https://www.amazon.com/s?k=macbook+air+m2' },
  { model: 'MacBook Air 13"', chip: 'M2', ram: '16GB', storage: '512GB', price: 749, source: 'Amazon', condition: 'New (Old Stock)', url: 'https://www.amazon.com/s?k=macbook+air+m2' },
  { model: 'MacBook Air 15"', chip: 'M2', ram: '8GB', storage: '256GB', price: 699, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/shop/mac-air-m2?_nkw=mac+air+m2' },
  { model: 'MacBook Air 15"', chip: 'M2', ram: '16GB', storage: '512GB', price: 899, source: 'Amazon', condition: 'Renewed', url: 'https://www.amazon.com/s?k=macbook+air+m2+15+inch' },
  { model: 'MacBook Pro 13"', chip: 'M1', ram: '8GB', storage: '256GB', price: 449, source: 'eBay', condition: 'Good', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 13"', chip: 'M1', ram: '16GB', storage: '512GB', price: 599, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 13"', chip: 'M2', ram: '8GB', storage: '256GB', price: 699, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/itm/204034705059' },
  { model: 'MacBook Pro 13"', chip: 'M2', ram: '16GB', storage: '512GB', price: 849, source: 'Amazon', condition: 'Renewed', url: 'https://www.amazon.com/s?k=macbook+pro+m2' },
  { model: 'MacBook Pro 14"', chip: 'M1 Pro', ram: '16GB', storage: '512GB', price: 799, source: 'eBay', condition: 'Good', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 14"', chip: 'M2 Pro', ram: '16GB', storage: '512GB', price: 1099, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 14"', chip: 'M2 Pro', ram: '16GB', storage: '512GB', price: 1299, source: 'Amazon', condition: 'Renewed', url: 'https://www.amazon.com/s?k=macbook+pro+m2+pro' },
  { model: 'MacBook Pro 16"', chip: 'M1 Pro', ram: '16GB', storage: '512GB', price: 899, source: 'eBay', condition: 'Good', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 16"', chip: 'M2 Pro', ram: '16GB', storage: '512GB', price: 1199, source: 'eBay', condition: 'Refurbished', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 16"', chip: 'M2 Max', ram: '32GB', storage: '1TB', price: 1599, source: 'eBay', condition: 'Good', url: 'https://www.ebay.com/b/Apple-MacBook-Pro/111422/bn_7116383' },
  { model: 'MacBook Pro 16"', chip: 'M2 Max', ram: '32GB', storage: '1TB', price: 1799, source: 'Amazon', condition: 'Renewed', url: 'https://www.amazon.com/s?k=macbook+pro+m2+max' },
];

export default function MacBooks() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [chipFilter, setChipFilter] = useState<string>('all');

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
    return sortDir === 'asc' ? ' \u25B2' : ' \u25BC';
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
              Cheapest MacBooks (M1 & M2)
            </h1>
            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              Prices from Amazon and eBay. M1/M2 models are being phased out — grab them while stock lasts.
            </p>

            {/* Filter by chip */}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#555', fontSize: '0.9rem', fontWeight: '600', fontFamily: 'system-ui, sans-serif' }}>Filter by chip:</span>
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
                  {chip === 'all' ? 'All' : chip}
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
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Storage</th>
                    <th
                      onClick={() => handleSort('price')}
                      style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                    >
                      Price{sortIndicator('price')}
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Source</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: '#333', whiteSpace: 'nowrap' }}>Condition</th>
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
                      <td style={{ padding: '0.75rem 0.5rem', color: '#333', fontWeight: '700' }}>${mb.price}</td>
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
              Prices are approximate and may vary. Last checked February 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
