'use client';

import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({
  href,
  label = 'Back',
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
    >
      <span className="text-lg">←</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">Back</span>
    </Link>
  );
}
