import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type SeoModalState = {
  open: boolean;
  openSeo: () => void;
  closeSeo: () => void;
};

const SeoModalCtx = createContext<SeoModalState | null>(null);

export function SeoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSeo = useCallback(() => setOpen(true), []);
  const closeSeo = useCallback(() => setOpen(false), []);

  const value = useMemo<SeoModalState>(
    () => ({ open, openSeo, closeSeo }),
    [open, openSeo, closeSeo]
  );

  return <SeoModalCtx.Provider value={value}>{children}</SeoModalCtx.Provider>;
}

export function useSeoModal() {
  const ctx = useContext(SeoModalCtx);
  if (!ctx) throw new Error("useSeoModal must be used inside <SeoModalProvider>");
  return ctx;
}
