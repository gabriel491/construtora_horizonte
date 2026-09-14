import { useState, useRef, useCallback } from 'react';

export default function ImageDropZone({ 
  onImagesSelected, 
  multiple = false, 
  currentImages = [],
  onRemoveImage,
  label = 'Arraste a imagem aqui ou clique para selecionar',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const processFiles = useCallback((files) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!imageFiles.length) return;

    const promises = imageFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(dataUrls => {
      onImagesSelected(dataUrls);
    });
  }, [onImagesSelected]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? '#84907a' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: '0',
          padding: currentImages.length > 0 && !multiple ? '0' : '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          background: isDragging ? 'rgba(132,144,122,0.08)' : 'rgba(255,255,255,0.02)',
          overflow: 'hidden',
          position: 'relative',
          minHeight: multiple ? '120px' : '200px',
        }}
      >
        {/* Single image preview (cover photo) */}
        {!multiple && currentImages.length > 0 ? (
          <div style={{ position: 'relative', width: '100%', height: '200px' }}>
            <img
              src={currentImages[0]}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '1rem',
            }}>
              <span style={{
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.7)',
              }}>
                Clique para trocar a foto
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Upload icon */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDragging ? '#84907a' : 'rgba(255,255,255,0.25)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: '12px', transition: 'stroke 0.3s ease' }}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span style={{
              fontSize: '13px',
              color: isDragging ? '#84907a' : 'rgba(255,255,255,0.4)',
              fontFamily: "'Inter', sans-serif",
              textAlign: 'center',
              transition: 'color 0.3s ease',
            }}>
              {label}
            </span>
            <span style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: "'Inter', sans-serif",
              marginTop: '6px',
            }}>
              JPG, PNG ou WEBP
            </span>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Gallery preview grid (multiple mode) */}
      {multiple && currentImages.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '8px',
        }}>
          {currentImages.map((img, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                aspectRatio: '1',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <img
                src={img}
                alt={`Foto ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {onRemoveImage && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(i);
                  }}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '22px',
                    height: '22px',
                    background: 'rgba(0,0,0,0.75)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
