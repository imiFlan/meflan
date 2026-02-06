'use client';

import { useState } from 'react';

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="background-container">
      {/* Light overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar - Light theme */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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

          <div style={{
            display: 'none',
            gap: '2rem',
          }}
          className="desktop-nav">
            <a href="/" style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}>
              Home
            </a>
            <a href="/about" style={{
              color: '#333',
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
            position: 'fixed',
            top: '66px',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
          }}>
            <a href="/" style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '1.2rem',
              padding: '0.5rem',
            }}>
              Home
            </a>
            <a href="/about" style={{
              color: '#333',
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
          minHeight: '100vh',
          paddingTop: '70px',
          padding: '2rem',
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '600px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          }}>
            <h1 style={{
              color: '#333',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              About
            </h1>
            <p style={{
              color: '#555',
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
