/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_ZAPIER_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** public/images path → short content hash, injected by vite.config.ts */
declare const __IMAGE_VERSIONS__: Record<string, string> | undefined;
