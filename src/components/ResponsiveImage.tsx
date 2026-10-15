import { assetUrl } from '../lib/assetUrl';

const WIDTHS = [640, 1024, 1400] as const;

interface ResponsiveImageProps {
  /** Base path without width/extension, e.g. /images/services/stucco-repairs */
  base: string;
  alt: string;
  /** Intrinsic aspect ratio of the source files */
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  /** Above-the-fold hero: eager + fetchpriority=high */
  priority?: boolean;
}

export default function ResponsiveImage({
  base,
  alt,
  width,
  height,
  sizes = '100vw',
  className,
  priority = false,
}: ResponsiveImageProps) {
  const srcSet = WIDTHS.map((w) => `${assetUrl(`${base}-${w}.webp`)} ${w}w`).join(', ');
  return (
    <img
      src={assetUrl(`${base}-1024.webp`)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React 18 warns on camelCase fetchPriority; the lowercase attribute renders correctly.
      {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
    />
  );
}
