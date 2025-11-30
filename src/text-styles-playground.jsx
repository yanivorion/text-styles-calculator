import React, { useState } from 'react';
import { Info, Settings, Eye, Link, ChevronLeft, ChevronRight } from 'lucide-react';

function TextStylesPlayground() {
  // Default values for reset
  const defaultHeadings = [
    { name: 'Heading1', actualSize: 88, lineHeight: 88, font: 'Wix Madefor Display' },
    { name: 'Heading2', actualSize: 64, lineHeight: 72, font: 'Wix Madefor Display' },
    { name: 'Heading3', actualSize: 56, lineHeight: 64, font: 'Wix Madefor Display' },
    { name: 'Heading4', actualSize: 48, lineHeight: 52, font: 'Wix Madefor Display' },
    { name: 'Heading5', actualSize: 32, lineHeight: 40, font: 'Wix Madefor Display' },
    { name: 'Heading6', actualSize: 24, lineHeight: 30, font: 'Wix Madefor Display' },
  ];

  const defaultParagraphs = [
    { name: 'Paragraph 1', actualSize: 20, lineHeight: 28, font: 'Wix Madefor Display' },
    { name: 'Paragraph 2', actualSize: 16, lineHeight: 22, font: 'Wix Madefor Display' },
    { name: 'Paragraph 3', actualSize: 14, lineHeight: 20, font: 'Wix Madefor Display' },
  ];

  // State
  const [headings, setHeadings] = useState(defaultHeadings);
  const [paragraphs, setParagraphs] = useState(defaultParagraphs);
  const [minThumbnail, setMinThumbnail] = useState(12);
  const [maxThumbnail, setMaxThumbnail] = useState(24);
  const [minParagraphThumbnail, setMinParagraphThumbnail] = useState(8);
  const [maxParagraphThumbnail, setMaxParagraphThumbnail] = useState(12);
  const [isLinked, setIsLinked] = useState(false);
  const [viewMode, setViewMode] = useState('preview');
  const [panelWidth, setPanelWidth] = useState(576);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(false);
  
  // Panel dimensions
  const minPanelWidth = 420;
  const maxPanelWidth = 660;
  const snapWidth = 576;
  const containerHeight = 64;
  const containerGap = 12;
  const containerBg = '#F8F6F6';
  const containerPadding = 8;
  const containerRadius = 6;
  
  // Calculate scale factor
  const baseWidth = 576;
  const scaleFactor = panelWidth / baseWidth;
  const scaledContainerHeight = Math.round(containerHeight * scaleFactor);
  const scaledGap = Math.round(containerGap * scaleFactor);
  const scaledPadding = Math.round(containerPadding * scaleFactor);
  const scaledRadius = Math.round(containerRadius * scaleFactor);

  // Calculate ranges for headings
  const actualSizes = headings.map(h => h.actualSize);
  const minActualSize = Math.min(...actualSizes);
  const maxActualSize = Math.max(...actualSizes);
  const actualRange = maxActualSize - minActualSize;
  const thumbnailRange = maxThumbnail - minThumbnail;

  // Calculate ranges for paragraphs
  const paragraphActualSizes = paragraphs.map(p => p.actualSize);
  const minParagraphActualSize = Math.min(...paragraphActualSizes);
  const maxParagraphActualSize = Math.max(...paragraphActualSizes);
  const paragraphActualRange = maxParagraphActualSize - minParagraphActualSize;
  const paragraphThumbnailRange = maxParagraphThumbnail - minParagraphThumbnail;

  // Calculate thumbnail size
  const calculateThumbnailSize = (actualSize) => {
    if (actualRange === 0) return minThumbnail;
    const normalized = (actualSize - minActualSize) / actualRange;
    return Math.round(minThumbnail + (normalized * thumbnailRange));
  };

  const calculateParagraphThumbnailSize = (actualSize) => {
    if (paragraphActualRange === 0) return minParagraphThumbnail;
    const normalized = (actualSize - minParagraphActualSize) / paragraphActualRange;
    return Math.round(minParagraphThumbnail + (normalized * paragraphThumbnailRange));
  };

  // Update functions
  const updateHeadingSize = (index, newSize) => {
    const updated = [...headings];
    updated[index].actualSize = parseInt(newSize) || 0;
    setHeadings(updated);
  };

  const updateHeadingLineHeight = (index, newLineHeight) => {
    const updated = [...headings];
    updated[index].lineHeight = parseInt(newLineHeight) || 0;
    setHeadings(updated);
  };

  const updateHeadingName = (index, newName) => {
    const updated = [...headings];
    updated[index].name = newName;
    setHeadings(updated);
  };

  const updateParagraphSize = (index, newSize) => {
    const updated = [...paragraphs];
    updated[index].actualSize = parseInt(newSize) || 0;
    setParagraphs(updated);
  };

  // Link/unlink thumbnail settings
  const toggleLink = () => {
    if (!isLinked) {
      setMinParagraphThumbnail(minThumbnail);
      setMaxParagraphThumbnail(maxThumbnail);
    }
    setIsLinked(!isLinked);
  };

  const updateMinThumbnail = (value) => {
    setMinThumbnail(value);
    if (isLinked) setMinParagraphThumbnail(value);
  };

  const updateMaxThumbnail = (value) => {
    setMaxThumbnail(value);
    if (isLinked) setMaxParagraphThumbnail(value);
  };

  // Reset functions
  const resetThumbnailSettings = () => {
    setMinThumbnail(12);
    setMaxThumbnail(24);
    setMinParagraphThumbnail(8);
    setMaxParagraphThumbnail(12);
    setIsLinked(false);
  };

  const resetAll = () => {
    setHeadings([...defaultHeadings]);
    setParagraphs([...defaultParagraphs]);
    resetThumbnailSettings();
  };

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#111'
    }}>
      
      {/* Top Bar - Resizing Controls */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        {/* Breakpoint Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setPanelWidth(420)}
            style={{
              width: '40px',
              height: '32px',
              backgroundColor: panelWidth === 420 ? '#2563eb' : '#fff',
              color: panelWidth === 420 ? '#fff' : '#666',
              border: `1px solid ${panelWidth === 420 ? '#2563eb' : '#e5e7eb'}`,
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (panelWidth !== 420) {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (panelWidth !== 420) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            </svg>
          </button>
          <button
            onClick={() => setPanelWidth(576)}
            style={{
              width: '40px',
              height: '32px',
              backgroundColor: panelWidth === 576 ? '#2563eb' : '#fff',
              color: panelWidth === 576 ? '#fff' : '#666',
              border: `1px solid ${panelWidth === 576 ? '#2563eb' : '#e5e7eb'}`,
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (panelWidth !== 576) {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (panelWidth !== 576) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </button>
          <button
            onClick={() => setPanelWidth(660)}
            style={{
              width: '40px',
              height: '32px',
              backgroundColor: panelWidth === 660 ? '#2563eb' : '#fff',
              color: panelWidth === 660 ? '#fff' : '#666',
              border: `1px solid ${panelWidth === 660 ? '#2563eb' : '#e5e7eb'}`,
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (panelWidth !== 660) {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (panelWidth !== 660) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
              <polyline points="17 2 12 7 7 2"/>
            </svg>
          </button>
        </div>

        {/* Resize Slider */}
        <div style={{ width: '400px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '6px',
            fontSize: '11px',
            fontWeight: '500',
            color: '#9ca3af'
          }}>
            <span>{minPanelWidth}px</span>
            <span style={{ color: '#2563eb', fontSize: '13px', fontWeight: '600' }}>{panelWidth}px</span>
            <span>{maxPanelWidth}px</span>
          </div>
          <input 
            type="range" 
            min={minPanelWidth}
            max={maxPanelWidth}
            value={panelWidth}
            onChange={(e) => setPanelWidth(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 57px)',
        position: 'relative'
      }}>
        
        {/* Center - Elements Panel */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '40px 20px',
          overflow: 'auto'
        }}>
          <div 
            id="preview-panel"
            style={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '18px',
              width: `${panelWidth}px`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
            {/* Header */}
            <div style={{ 
              marginBottom: `${Math.round(24 * scaleFactor)}px`,
              paddingBottom: `${Math.round(16 * scaleFactor)}px`,
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ 
                fontSize: `${Math.round(18 * scaleFactor)}px`, 
                fontWeight: '600',
                color: '#111'
              }}>
                Add Elements
              </h2>
            </div>

            {/* Branded Titles */}
            <div style={{ marginBottom: `${Math.round(32 * scaleFactor)}px` }}>
              <h3 style={{ 
                fontSize: `${Math.round(14 * scaleFactor)}px`, 
                fontWeight: '600',
                marginBottom: `${Math.round(16 * scaleFactor)}px`,
                color: '#111'
              }}>
                Branded Titles
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: `${scaledGap}px`
              }}>
                {headings.map((heading, index) => {
                  const thumbnailSize = calculateThumbnailSize(heading.actualSize);
                  const scaledThumbnailSize = thumbnailSize * scaleFactor;
                  const maxThumbnailSize = scaledContainerHeight - (scaledPadding * 2);
                  const finalThumbnailSize = Math.min(scaledThumbnailSize, maxThumbnailSize);
                  
                  return (
                    <div 
                      key={index}
                      style={{
                        height: `${scaledContainerHeight}px`,
                        backgroundColor: containerBg,
                        borderRadius: `${scaledRadius}px`,
                        padding: `0 ${scaledPadding}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeecec'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = containerBg}
                    >
                      <div style={{ 
                        fontSize: `${finalThumbnailSize}px`,
                        fontWeight: '500',
                        lineHeight: '1.2',
                        transition: 'font-size 0.3s ease',
                        textAlign: 'center',
                        color: '#111',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {heading.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Branded Paragraphs */}
            <div style={{ marginBottom: `${Math.round(32 * scaleFactor)}px` }}>
              <h3 style={{ 
                fontSize: `${Math.round(14 * scaleFactor)}px`, 
                fontWeight: '600',
                marginBottom: `${Math.round(16 * scaleFactor)}px`,
                color: '#111'
              }}>
                Branded Paragraphs
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: `${scaledGap}px`
              }}>
                {paragraphs.map((paragraph, index) => {
                  const thumbnailSize = calculateParagraphThumbnailSize(paragraph.actualSize);
                  const scaledThumbnailSize = thumbnailSize * scaleFactor;
                  const paragraphHeight = Math.round(100 * scaleFactor);
                  const maxThumbnailSize = paragraphHeight - (scaledPadding * 2);
                  const finalThumbnailSize = Math.min(scaledThumbnailSize, maxThumbnailSize * 0.12);
                  
                  return (
                    <div 
                      key={index}
                      style={{
                        height: `${paragraphHeight}px`,
                        backgroundColor: containerBg,
                        borderRadius: `${scaledRadius}px`,
                        padding: `${scaledPadding}px`,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeecec'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = containerBg}
                    >
                      <div style={{ 
                        fontSize: `${finalThumbnailSize}px`,
                        lineHeight: '1.4',
                        color: '#666',
                        transition: 'font-size 0.3s ease',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        This is the space to introduce the Services section. Briefly describe the types of services offered and highlight any special benefits or features.
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Branded Buttons */}
            <div style={{ marginBottom: `${Math.round(32 * scaleFactor)}px` }}>
              <h3 style={{ 
                fontSize: `${Math.round(14 * scaleFactor)}px`, 
                fontWeight: '600',
                marginBottom: `${Math.round(16 * scaleFactor)}px`,
                color: '#111'
              }}>
                Branded Buttons
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: `${scaledGap}px`
              }}>
                {['Primary', 'Secondary', 'Tertiary'].map((label, index) => (
                  <div key={index} style={{
                    height: `${scaledContainerHeight}px`,
                    backgroundColor: containerBg,
                    borderRadius: `${scaledRadius}px`,
                    padding: `${scaledPadding}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeecec'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = containerBg}
                  >
                    <button style={{
                      padding: `${Math.round(12 * scaleFactor)}px ${Math.round(32 * scaleFactor)}px`,
                      backgroundColor: index === 0 ? '#4318FF' : index === 1 ? 'white' : 'transparent',
                      color: index === 0 ? 'white' : '#4318FF',
                      border: index === 1 ? `${Math.round(2 * scaleFactor)}px solid #4318FF` : 'none',
                      borderRadius: `${Math.round(8 * scaleFactor)}px`,
                      fontSize: `${Math.round(14 * scaleFactor)}px`,
                      fontWeight: '500',
                      cursor: 'pointer',
                      textDecoration: index === 2 ? 'underline' : 'none',
                      pointerEvents: 'none'
                    }}>
                      {label}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Branded Boxes */}
            <div style={{ marginBottom: `${Math.round(32 * scaleFactor)}px` }}>
              <h3 style={{ 
                fontSize: `${Math.round(14 * scaleFactor)}px`, 
                fontWeight: '600',
                marginBottom: `${Math.round(16 * scaleFactor)}px`,
                color: '#111'
              }}>
                Branded Boxes
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: `${scaledGap}px`
              }}>
                {['#2D6CFF', '#C7DBFF'].map((color, index) => (
                  <div key={index} style={{
                    backgroundColor: containerBg,
                    borderRadius: `${scaledRadius}px`,
                    padding: `${scaledPadding}px`,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeecec'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = containerBg}
                  >
                    <div style={{
                      height: `${Math.round(120 * scaleFactor)}px`,
                      backgroundColor: color,
                      borderRadius: `${Math.round(12 * scaleFactor)}px`,
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Branded Lines */}
            <div>
              <h3 style={{ 
                fontSize: `${Math.round(14 * scaleFactor)}px`, 
                fontWeight: '600',
                marginBottom: `${Math.round(16 * scaleFactor)}px`,
                color: '#111'
              }}>
                Branded Lines
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${Math.round(20 * scaleFactor)}px` }}>
                {[1, 2].map((_, index) => (
                  <div key={index} style={{
                    backgroundColor: containerBg,
                    borderRadius: `${scaledRadius}px`,
                    padding: `${scaledPadding}px`,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeecec'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = containerBg}
                  >
                    <div style={{
                      height: `${Math.round(4 * scaleFactor)}px`,
                      backgroundColor: '#4318FF',
                      borderRadius: `${Math.round(2 * scaleFactor)}px`,
                      width: '100%'
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Settings */}
        <div style={{ 
          width: isSettingsCollapsed ? '0' : '340px',
          transition: 'width 0.3s ease',
          backgroundColor: '#fff',
          borderLeft: '1px solid #e5e7eb',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0
        }}>
          {!isSettingsCollapsed && (
            <div style={{
              padding: '20px',
              height: '100%',
              overflowY: 'auto',
              width: '340px'
            }}>
              {/* Settings Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>
                  Settings
                </h2>
                <button
                  onClick={() => setIsSettingsCollapsed(true)}
                  style={{
                    padding: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.color = '#111';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Thumbnail Settings */}
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>
                    Thumbnail Range
                  </h3>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={resetThumbnailSettings}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#fff',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.color = '#ef4444';
                      }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={toggleLink}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: isLinked ? '#2563eb' : '#fff',
                        color: isLinked ? '#fff' : '#6b7280',
                        border: `1px solid ${isLinked ? '#2563eb' : '#d1d5db'}`,
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Link size={12} />
                      {isLinked ? 'Linked' : 'Link'}
                    </button>
                  </div>
                </div>

                {/* Headings Section */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '12px'
                  }}>
                    Headings
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      <span>Min Thumbnail</span>
                      <span style={{ color: '#2563eb', fontWeight: '600' }}>{minThumbnail}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="8" 
                      max="20" 
                      value={minThumbnail}
                      onChange={(e) => updateMinThumbnail(parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      <span>Max Thumbnail</span>
                      <span style={{ color: '#2563eb', fontWeight: '600' }}>{maxThumbnail}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="16" 
                      max="40" 
                      value={maxThumbnail}
                      onChange={(e) => updateMaxThumbnail(parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                {/* Paragraphs Section */}
                <div>
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '12px'
                  }}>
                    Paragraphs
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: '#6b7280',
                      opacity: isLinked ? 0.5 : 1
                    }}>
                      <span>Min Thumbnail</span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>{minParagraphThumbnail}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="6" 
                      max="16" 
                      value={minParagraphThumbnail}
                      onChange={(e) => setMinParagraphThumbnail(parseInt(e.target.value))}
                      disabled={isLinked}
                      style={{ width: '100%', opacity: isLinked ? 0.5 : 1 }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: '#6b7280',
                      opacity: isLinked ? 0.5 : 1
                    }}>
                      <span>Max Thumbnail</span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>{maxParagraphThumbnail}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="24" 
                      value={maxParagraphThumbnail}
                      onChange={(e) => setMaxParagraphThumbnail(parseInt(e.target.value))}
                      disabled={isLinked}
                      style={{ width: '100%', opacity: isLinked ? 0.5 : 1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Font Sizes Section */}
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>
                    Font Sizes
                  </h3>
                  <button
                    onClick={resetAll}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                  >
                    Reset All
                  </button>
                </div>

                {/* Headings */}
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '12px'
                }}>
                  Headings
                </div>
                {headings.map((heading, index) => (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      <span>{heading.name}</span>
                      <span style={{ color: '#2563eb', fontWeight: '600' }}>{heading.actualSize}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="12" 
                      max="160" 
                      value={heading.actualSize}
                      onChange={(e) => updateHeadingSize(index, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}

                {/* Paragraphs */}
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginTop: '20px',
                  marginBottom: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  Paragraphs
                </div>
                {paragraphs.map((paragraph, index) => (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      <span>{paragraph.name}</span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>{paragraph.actualSize}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="32" 
                      value={paragraph.actualSize}
                      onChange={(e) => updateParagraphSize(index, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expand Button - shows when collapsed */}
          {isSettingsCollapsed && (
            <button
              onClick={() => setIsSettingsCollapsed(false)}
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '80px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderLeft: 'none',
                borderRadius: '0 8px 8px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                transition: 'all 0.2s',
                boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.color = '#111';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TextStylesPlayground;
