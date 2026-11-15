'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';
import { OCC_HTML_BODY } from './occ-template';

function OCCView() {
  return (
    <div
      id="occ-root"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: OCC_HTML_BODY }}
    />
  );
}

// Disable SSR to prevent React hydration mismatch against the pre-compiled OCC template
const DynamicOCCView = dynamic(() => Promise.resolve(OCCView), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicOCCView />
      <Script src="/occ-client.js" strategy="lazyOnload" />
    </>
  );
}
