'use client';

import * as React from 'react';
import { Drawer } from 'vaul';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function ResponsiveModal({ open, onOpenChange, children }: ResponsiveModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/80 z-50" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[90vh] bg-white rounded-t-[24px] z-50 flex flex-col">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mt-4 mb-6" />
            <div className="overflow-y-auto flex-1 px-6 pb-6">
              {children}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-50 shadow-xl flex flex-col">
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
          <div className="overflow-y-auto flex-1 p-8">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
