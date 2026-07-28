import { useState } from "react";

export function CompanyLogo({
  name,
  domain,
  size = 24,
  className = "",
}: {
  name: string;
  domain: string;
  size?: number;
  className?: string;
}) {
  const [srcIndex, setSrcIndex] = useState(0);

  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const sources = [
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`,
  ];

  if (srcIndex >= sources.length) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center font-display font-bold text-accent ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {name[0]}
      </span>
    );
  }

  return (
    <img
      src={sources[srcIndex]}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setSrcIndex((prev) => prev + 1)}
      className={`shrink-0 rounded-[4px] object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
