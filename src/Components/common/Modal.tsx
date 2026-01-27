import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error";
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type,
  actionButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
      {type === "success" ? (
        // Success Modal - Green Theme
        <div className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col items-center text-center p-12 relative bg-[rgba(16,34,22,0.75)] backdrop-blur-xl border border-white/10">
          {/* Decorative Glow Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -z-10"></div>
          
          {/* Icon Section */}
          <div className="mb-8 relative">
            <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-6xl font-bold" style={{ filter: 'drop-shadow(0 0 8px rgba(37, 244, 106, 0.6))' }}>
                check
              </span>
            </div>
            {/* Small Sparkle Icons */}
            <span className="material-symbols-outlined absolute -top-2 -right-2 text-primary/40 text-xl">auto_awesome</span>
            <span className="material-symbols-outlined absolute bottom-0 -left-4 text-primary/30 text-lg">auto_awesome</span>
          </div>
          
          {/* Text Content */}
          <div className="space-y-4 mb-10">
            <h1 className="text-white text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm mx-auto">
              {message}
            </p>
          </div>
          
          {/* Action Button */}
          <div className="w-full max-w-xs space-y-4">
            {actionButton ? (
              <>
                <button 
                  onClick={actionButton.onClick}
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined mr-2">home</span>
                  <span>{actionButton.label}</span>
                </button>
                <button 
                  onClick={onClose}
                  className="text-white/40 hover:text-white/70 text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </>
            ) : (
              <button 
                onClick={onClose}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                OK
              </button>
            )}
          </div>
          
          {/* Close Icon */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/20 hover:text-white/60 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      ) : (
        // Error Modal - Red Theme
        <div className="relative w-full max-w-[440px] rounded-xl overflow-hidden shadow-2xl bg-[rgba(15,25,35,0.75)] backdrop-blur-xl border border-white/10">
          {/* Inner Red Frosting Layer */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.08) 0%, transparent 70%)' }}></div>
          
          <div className="relative z-10 px-8 py-10 flex flex-col items-center">
            {/* Icon Section */}
            <div className="mb-6 flex items-center justify-center">
              <div className="size-16 rounded-full border-2 border-red-500/30 flex items-center justify-center bg-red-500/10" style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' }}>
                <span className="material-symbols-outlined text-red-500 text-[36px] font-light">close</span>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-white text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-white/70 text-sm leading-relaxed max-w-[320px] mx-auto">
                {message}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-3">
              {actionButton ? (
                <>
                  <button 
                    onClick={actionButton.onClick}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/20"
                  >
                    {actionButton.label}
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-3 bg-transparent hover:bg-white/5 text-white/60 hover:text-white rounded-lg font-bold text-sm transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={onClose}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/20"
                >
                  OK
                </button>
              )}
            </div>
          </div>
          
          {/* Footer Decorative Border */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Modal;
