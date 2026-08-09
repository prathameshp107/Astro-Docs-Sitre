/// <reference types="astro/client" />

// Starlight only exposes this virtual module's type in its internal
// virtual-internal.d.ts (not re-exported through virtual.d.ts, which our
// tsconfig picks up), even though the module itself resolves fine at
// runtime via Vite. Mirrored here so `Sidebar.astro`'s override can import
// it without a type error.
declare module 'virtual:starlight/components/MobileMenuFooter' {
  const MobileMenuFooter: typeof import('@astrojs/starlight/components/MobileMenuFooter.astro').default;
  export default MobileMenuFooter;
}
