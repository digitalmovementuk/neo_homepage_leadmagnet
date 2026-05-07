import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Lead-modal copy. Each service page passes its own bespoke text here when
 * the lead-magnet button is clicked — overrides the homepage default.
 */
export type LeadModalContent = {
  eyebrow: string;
  headline: string;
  sub: string;
  submit: string;
  successHeadline: string;
  successBody: string;
};

type LeadModalState = {
  open: boolean;
  content: LeadModalContent | null;
  openWith: (content: LeadModalContent) => void;
  close: () => void;
  setOpen: (v: boolean) => void;
};

const LeadModalCtx = createContext<LeadModalState | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<LeadModalContent | null>(null);

  const openWith = useCallback((c: LeadModalContent) => {
    setContent(c);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<LeadModalState>(
    () => ({ open, content, openWith, close, setOpen }),
    [open, content, openWith, close]
  );

  return <LeadModalCtx.Provider value={value}>{children}</LeadModalCtx.Provider>;
}

export function useLeadModal() {
  const ctx = useContext(LeadModalCtx);
  if (!ctx) throw new Error("useLeadModal must be used inside <LeadModalProvider>");
  return ctx;
}
