import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
interface ModalProps {
  open: boolean,
  onClose: () => void;
}

const Modal = ({ open, onClose }: ModalProps) => {
    useEffect(() => {
        if(open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            };

        }
        if(open) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-500 p-6 rounded-lg shadow-lg min-w-[320px]"
          >
            <h1 className="text-xl font-semibold">DENEME BRO</h1>
            <p className="mt-2 text-muted-foreground">
              Modal animasyon test içerikleri
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal