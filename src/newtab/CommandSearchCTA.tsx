export const CommandSearchCTA = () => {
  return (
    <p className="h-[36px] text-sm text-white glass py-[.5rem] px-[1rem] flex items-center gap-3">
      Press{' '}
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </p>
  )
}
