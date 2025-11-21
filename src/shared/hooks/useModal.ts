import { useCallback, useState } from "react";
import type { ModalController } from "../types/modal";

export const useModal = (): ModalController => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};
