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

  const bgColor = type === "success" ? "bg-emerald-500/10" : "bg-red-500/10";
  const borderColor = type === "success" ? "border-emerald-500/30" : "border-red-500/30";
  const iconColor = type === "success" ? "text-emerald-500" : "text-red-500";
  const titleColor = type === "success" ? "text-emerald-400" : "text-red-400";
  const buttonColor = type === "success" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${bgColor} border ${borderColor} rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl`}>
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`${iconColor} text-5xl`}>
            {type === "success" ? "✓" : "✕"}
          </div>
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold text-center mb-2 ${titleColor}`}>
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-300 text-center mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          {actionButton && (
            <button
              onClick={actionButton.onClick}
              className={`flex-1 h-12 rounded-xl font-bold text-white transition-all duration-300 ${buttonColor}`}
            >
              {actionButton.label}
            </button>
          )}
          <button
            onClick={onClose}
            className={`${actionButton ? "flex-1" : "w-full"} h-12 rounded-xl font-bold text-white bg-slate-700 hover:bg-slate-600 transition-all duration-300`}
          >
            {actionButton ? "Close" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
