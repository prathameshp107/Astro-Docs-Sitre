/** Hand-built device frames used for premium product photography of the app. */

type ImageSource = string | { src: string };

function resolveSrc(src: ImageSource): string {
  return typeof src === "string" ? src : src.src;
}

export function MacBook({
  src,
  alt,
  className = "",
}: {
  src: ImageSource;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      {/* lid */}
      <div className="rounded-t-[14px] border border-border-strong bg-elevated p-[8px] pb-0 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.65)]">
        <div className="relative overflow-hidden rounded-t-[7px] border border-border bg-card">
          <div className="flex items-center justify-center border-b border-border bg-surface py-1">
            <span className="h-1 w-1 rounded-full bg-border-strong" />
          </div>
          <img src={resolveSrc(src)} alt={alt} loading="lazy" className="block w-full object-cover" />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(115deg, color-mix(in oklab, var(--color-foreground) 7%, transparent) 0%, transparent 38%, transparent 62%, color-mix(in oklab, var(--color-foreground) 4%, transparent) 100%)",
            }}
          />
        </div>
      </div>
      {/* base */}
      <div className="relative h-[10px] rounded-b-[6px] border border-t-0 border-border-strong bg-surface">
        <span className="absolute top-0 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-b-full bg-border-strong" />
      </div>
      <div className="mx-auto h-[3px] w-[86%] rounded-b-full bg-border" />
    </div>
  );
}

export function Monitor({
  src,
  alt,
  label,
  className = "",
}: {
  src: ImageSource;
  alt: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-xl border border-border-strong bg-elevated p-[10px] shadow-[0_60px_100px_-60px_rgba(0,0,0,0.7)]">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {label ? (
            <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
                {label}
              </span>
            </div>
          ) : null}
          <img src={resolveSrc(src)} alt={alt} loading="lazy" className="block w-full object-cover" />
        </div>
      </div>
      {/* stand */}
      <div className="mx-auto h-6 w-14 border-x border-border-strong bg-surface" />
      <div className="mx-auto h-[6px] w-40 rounded-full border border-border-strong bg-elevated" />
    </div>
  );
}

/** A screenshot floating on its own, slightly angled — used for depth in collages. */
export function FloatingShot({
  src,
  alt,
  label,
  className = "",
  style,
}: {
  src: ImageSource;
  alt: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_80px_-45px_rgba(0,0,0,0.75)] ${className}`}
      style={style}
    >
      {label ? (
        <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">{label}</span>
        </div>
      ) : null}
      <img src={resolveSrc(src)} alt={alt} loading="lazy" className="block w-full object-cover" />
    </div>
  );
}
