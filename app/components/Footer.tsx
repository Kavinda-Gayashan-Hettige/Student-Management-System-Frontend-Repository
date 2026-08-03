export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600 py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand / Copyright */}
        <div className="text-sm font-medium">
          © {currentYear} <span className="text-blue-600 font-semibold">EduSystem</span>. All rights reserved.
        </div>

        {/* Links or Status */}
        <div className="flex items-center space-x-6 text-sm">
          <span className="flex items-center gap-2 text-emerald-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Online
          </span>
          <span className="text-zinc-400">|</span>
          <span className="text-zinc-500">User Portal</span>
        </div>
      </div>
    </footer>
  );
}