/**
 * Page-to-page navigation. Every page is its own HTML file, so moving between
 * them is a real page load; the curtain (three slabs, the same ink → gold →
 * paper as the menu) wipes in before we leave and wipes out once the next
 * page has mounted, so the hard load reads as one continuous move.
 */

import type {MouseEvent} from 'react';

type Leave = (href: string) => void;

let leave: Leave | null = null;

export function registerLeave(fn: Leave | null) {
  leave = fn;
}

/** Same-site, same-tab, different-page link? Then animate out first. */
export function onNavClick(e: MouseEvent<HTMLAnchorElement>) {
  const a = e.currentTarget;
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (a.target && a.target !== '_self') return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname) return; // in-page hash: let Lenis handle it
  if (!leave) return;
  e.preventDefault();
  leave(url.href);
}
