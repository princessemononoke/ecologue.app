type ModeSwitcherProps = {
  mode: 'pro' | 'public';
};

export function ModeSwitcher({ mode }: ModeSwitcherProps) {
  const isPublic = mode === 'public';
  return (
    <nav className="flex w-full justify-center py-4" aria-label="Choix de version">
      <div className="inline-flex rounded-full border border-[#84A59D]/30 bg-white p-1 shadow-sm">
        <a
          href="/pro"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!isPublic ? 'bg-[#23312D] text-[#F7EDE2]' : 'text-[#23312D] hover:bg-[#F7EDE2]'}`}
        >
          Version Pro
        </a>
        <a
          href="/particuliers"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isPublic ? 'bg-[#F28482] text-white' : 'text-[#23312D] hover:bg-[#F7EDE2]'}`}
        >
          Version particuliers
        </a>
      </div>
    </nav>
  );
}
