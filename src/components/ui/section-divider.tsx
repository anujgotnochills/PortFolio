export function SectionDivider() {
  return (
    <div className="w-full py-8 sm:py-12">
      <div className="container px-6 sm:px-8">
        <div className="relative h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
