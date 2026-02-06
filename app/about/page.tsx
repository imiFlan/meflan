'use client';

import { useState } from 'react';

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/poland-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
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
            <span style={{ width: '24px', height: '3px', backgroundColor: 'white', display: 'block' }} />
            <span style={{ width: '24px', height: '3px', backgroundColor: 'white', display: 'block' }} />
            <span style={{ width: '24px', height: '3px', backgroundColor: 'white', display: 'block' }} />
          </button>

          <div style={{
            display: 'flex',
            gap: '2rem',
          }}>
            <a href="/" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}>
              Home
            </a>
            <a href="/about" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}>
              About
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <a href="/" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.2rem',
              padding: '0.5rem',
            }}>
              Home
            </a>
            <a href="/about" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.2rem',
              padding: '0.5rem',
            }}>
              About
            </a>
          </div>
        )}

        {/* Main content */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 70px)',
          padding: '2rem',
        }}>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '600px',
          }}>
            <h1 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              About
            </h1>
            <p style={{
              color: 'white',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              Welcome to meflan! This is our website dedicated to Poland.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
