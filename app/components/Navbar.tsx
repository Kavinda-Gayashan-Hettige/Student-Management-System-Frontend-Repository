'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Students', href: '/students' },
    { name: 'Courses', href: '/courses' },
    { name: 'Users', href: '/users' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-zinc-200 text-zinc-800 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-blue-600">
          EduSystem
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition px-3 py-2 rounded-lg ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}