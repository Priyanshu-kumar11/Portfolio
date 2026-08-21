/**
 * Custom smooth scrolling utility with easing and header offset handling
 */
import type React from 'react';

export function smoothScrollTo(target: string | HTMLElement, offset: number = 80, duration: number = 700) {
  let targetElement: HTMLElement | null = null;

  if (typeof target === 'string') {
    const selector = target.startsWith('#') ? target : `#${target}`;
    targetElement = document.querySelector(selector);
  } else {
    targetElement = target;
  }

  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // Highlight flash on target element
  targetElement.classList.add('section-highlight-pulse');
  setTimeout(() => {
    targetElement?.classList.remove('section-highlight-pulse');
  }, 1800);

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Ease in-out cubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Update hash in URL cleanly without sudden jump
      if (typeof target === 'string' && target.startsWith('#')) {
        history.replaceState(null, '', target);
      }
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Attaches smooth scroll behavior to any internal anchor link
 */
export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement> | MouseEvent) {
  const target = e.currentTarget as HTMLAnchorElement;
  const href = target.getAttribute('href');

  if (href && href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    smoothScrollTo(href);
  }
}
