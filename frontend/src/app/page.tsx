'use client';

import Script from 'next/script';
import { OCC_HTML_BODY } from './occ-template';

export default function Home() {
  return (
    <>
      <div
        id="occ-root"
        dangerouslySetInnerHTML={{ __html: OCC_HTML_BODY }}
      />
      <Script src="/occ-client.js" strategy="afterInteractive" />
    </>
  );
}
