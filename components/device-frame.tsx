import Image from 'next/image';

type DeviceFrameProps = {
  device: 'desktop' | 'tablet' | 'mobile';
  image: string;
  alt: string;
  className?: string;
};

export function DeviceFrame({ device, image, alt, className = '' }: DeviceFrameProps) {
  if (device === 'mobile') {
    return (
      <div
        className={className}
        style={{
          background: '#111010',
          borderRadius: 'clamp(22px, 20%, 44px)',
          border: '2px solid rgba(237,232,224,0.28)',
          padding: '10px 7px 8px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.5)',
        }}
      >
        {/* Dynamic island — proportional width */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 7 }}>
          <div style={{ width: '38%', maxWidth: 80, height: 15, background: '#000', borderRadius: 10 }} />
        </div>
        {/* Screen */}
        <div style={{ position: 'relative', borderRadius: 'clamp(8px, 7%, 18px)', overflow: 'hidden', aspectRatio: '9 / 19.5' }}>
          <Image src={image} alt={alt} fill className="object-cover object-top" sizes="260px" />
        </div>
        {/* Home indicator — proportional width */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <div style={{ width: '34%', maxWidth: 56, height: 4, background: '#EDE8E0', borderRadius: 3, opacity: 0.35 }} />
        </div>
      </div>
    );
  }

  if (device === 'tablet') {
    return (
      <div
        className={className}
        style={{
          background: '#0E0C0B',
          borderRadius: 28,
          border: '2px solid rgba(237,232,224,0.13)',
          padding: '12px 8px 10px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
        }}
      >
        {/* Camera pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div style={{ width: 60, height: 18, background: '#080706', borderRadius: 12 }} />
        </div>
        {/* Screen */}
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4 / 3' }}>
          <Image src={image} alt={alt} fill className="object-cover object-top" sizes="500px" />
        </div>
        {/* Home indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div style={{ width: 44, height: 5, background: '#EDE8E0', borderRadius: 3, opacity: 0.22 }} />
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div
      className={className}
      style={{
        background: '#0E0C0B',
        borderRadius: 14,
        border: '1px solid rgba(237,232,224,0.1)',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: '#1A1815',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderBottom: '1px solid rgba(237,232,224,0.06)',
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            background: '#0F0D0C',
            borderRadius: 6,
            height: 22,
            marginLeft: 10,
            maxWidth: 280,
          }}
        />
      </div>
      {/* Screenshot */}
      <div style={{ position: 'relative', aspectRatio: '16 / 10' }}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>
    </div>
  );
}
