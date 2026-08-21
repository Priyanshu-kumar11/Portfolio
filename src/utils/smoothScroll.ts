/**
 * Premium custom smooth scrolling utility with quintic easing, velocity scaling,
 * and header offset compensation for silky-smooth section-to-section navigation.
 */
import type React from 'react';

// Cancelable active scroll animation controller
let activeScrollAnimationId: number | null = null;

export function smoothScrollTo(
  target: string | HTMLElement, 
  offset: number = 75, 
  baseDuration: number = 850
) {
  let targetElement: HTMLElement | null = null;

  if (typeof target === 'string') {
    const selector = target.startsWith('#') ? target : `#${target}`;
    targetElement = document.querySelector(selector);
  } else {
    targetElement = target;
  }

  if (!targetElement) return;

  // Cancel any ongoing scroll animation to prevent conflicting velocity
  if (activeScrollAnimationId !== null) {
    cancelAnimationFrame(activeScrollAnimationId);
    activeScrollAnimationId = null;
  }

  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - offset;
  const distance = targetPosition - startPosition;

  // If already at target, return
  if (Math.abs(distance) < 2) return;

  // Dynamic duration scaling: longer distance gets slightly more duration for cinematic glide
  const distanceMagnitude = Math.abs(distance);
  const calculatedDuration = Math.min(
    1200,
    Math.max(500, baseDuration + Math.log10(distanceMagnitude + 10) * 80)
  );

  let startTime: number | null = null;

  // Visual highlight pulse on target section container
  targetElement.classList.add('section-highlight-pulse');
  setTimeout(() => {
    targetElement?.classList.remove('section-highlight-pulse');
  }, 1600);

  function step(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / calculatedDuration, 1);

    // Quintic Ease-Out Curve (ultra smooth deceleration without abrupt stop)
    // f(t) = 1 - (1 - t)^5
    const ease = 1 - Math.pow(1 - progress, 5);

    const nextScrollY = startPosition + distance * ease;
    window.scrollTo(0, nextScrollY);

    if (timeElapsed < calculatedDuration) {
      activeScrollAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
      activeScrollAnimationId = null;

      // Update hash in URL cleanly without sudden browser jump
      if (typeof target === 'string' && target.startsWith('#')) {
        history.replaceState(null, '', target);
      }
    }
  }

  activeScrollAnimationId = requestAnimationFrame(step);
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

