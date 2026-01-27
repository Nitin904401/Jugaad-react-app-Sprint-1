import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorRegister } from "../../api/vendor";
import Modal from "../../Components/common/Modal";
import Step1 from "./registration-steps/Step1.tsx";
import Step2 from "./registration-steps/Step2.tsx";
import Step3 from "./registration-steps/Step3.tsx";

interface RegistrationData {
  // Step 1: Company Profile
  business_name: string;
  contact_person: string;
  phone_number: string;
  email: string;

  // Step 2: Business Details
  legal_business_name: string;
  tax_id: string;
  business_type: string;
  address: string;
  city: string;
  postal_code: string;

  // Step 3: Bank & KYC
  bank_account_holder: string;
  bank_name: string;
  bank_routing_number: string;
  bank_account_number: string;
  bank_account_confirmation: string;
  pan_document: File | null;
  cheque_document: File | null;

  // Password
  password: string;
  confirmPassword: string;
}

const VendorRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  const [formData, setFormData] = useState<RegistrationData>({
    business_name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    legal_business_name: "",
    tax_id: "",
    business_type: "wholesaler",
    address: "",
    city: "",
    postal_code: "",
    bank_account_holder: "",
    bank_name: "",
    bank_routing_number: "",
    bank_account_number: "",
    bank_account_confirmation: "",
    pan_document: null,
    cheque_document: null,
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "pan_document" | "cheque_document"
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const validateStep1 = (): boolean => {
    if (!formData.business_name.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Business name is required",
      });
      return false;
    }
    if (!formData.contact_person.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Contact person name is required",
      });
      return false;
    }
    if (!formData.phone_number.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Phone number is required",
      });
      return false;
    }
    if (!formData.email.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Email address is required",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!formData.legal_business_name.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Legal business name is required",
      });
      return false;
    }
    if (!formData.tax_id.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Tax ID/GSTIN is required",
      });
      return false;
    }
    if (!formData.address.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Address is required",
      });
      return false;
    }
    if (!formData.city.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "City is required",
      });
      return false;
    }
    if (!formData.postal_code.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Postal code is required",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.bank_account_holder.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Account holder name is required",
      });
      return false;
    }
    if (!formData.bank_name.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Bank name is required",
      });
      return false;
    }
    if (!formData.bank_routing_number.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "IFSC/SWIFT code is required",
      });
      return false;
    }
    if (!formData.bank_account_number.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Account number is required",
      });
      return false;
    }
    if (formData.bank_account_number !== formData.bank_account_confirmation) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Account numbers do not match",
      });
      return false;
    }
    if (!formData.pan_document) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "PAN Card document is required",
      });
      return false;
    }
    if (!formData.cheque_document) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Cheque/Bank statement document is required",
      });
      return false;
    }
    if (!formData.password.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Password is required",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Passwords do not match",
      });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsLoading(true);

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.contact_person);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("company_name", formData.business_name);
      formDataToSend.append("business_type", formData.business_type);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("legal_business_name", formData.legal_business_name);
      formDataToSend.append("tax_id", formData.tax_id);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("postal_code", formData.postal_code);
      formDataToSend.append("bank_account_holder", formData.bank_account_holder);
      formDataToSend.append("bank_name", formData.bank_name);
      formDataToSend.append("bank_routing_number", formData.bank_routing_number);
      formDataToSend.append("bank_account_number", formData.bank_account_number);

      if (formData.pan_document) {
        formDataToSend.append("pan_document", formData.pan_document);
      }
      if (formData.cheque_document) {
        formDataToSend.append("cheque_document", formData.cheque_document);
      }

      await vendorRegister(formDataToSend as any);

      setModal({
        isOpen: true,
        type: "success",
        title: "Registration Successful",
        message:
          "Your vendor registration has been submitted for approval. You will be notified once it's reviewed.",
      });

      setTimeout(() => {
        navigate("/vendor/login");
      }, 2000);
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Registration Failed",
        message: err.response?.data?.message || "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / 3) * 100;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-mesh overflow-x-hidden dark:bg-background-dark">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-6 md:px-20 py-4 bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_535)">
                <path
                  clipRule="evenodd"
                  d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_535">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">
            AutoParts Vendor Portal
          </h2>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <a
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Platform
            </a>
            <a
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Resources
            </a>
            <a
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Pricing
            </a>
          </div>
          <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 active:scale-95">
            Log In
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[600px] flex flex-col gap-8">
          {/* Progress Section */}
          <div className="flex flex-col gap-3 px-4">
            <div className="flex gap-6 justify-between items-end">
              <p className="text-white text-base font-semibold leading-normal">
                Step {currentStep}: {currentStep === 1 ? "Company Profile" : currentStep === 2 ? "Business Details" : "Bank & KYC Documents"}
              </p>
              <p className="text-primary text-sm font-bold leading-normal">
                {currentStep} / 3
              </p>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(6,127,249,0.5)] transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">
              {currentStep === 1 && "Initial Registration"}
              {currentStep === 2 && "Business Information"}
              {currentStep === 3 && "Verification & Payment"}
            </p>
          </div>

          {/* Step Components */}
          {currentStep === 1 && (
            <Step1 formData={formData} handleInputChange={handleInputChange} />
          )}
          {currentStep === 2 && (
            <Step2 formData={formData} handleInputChange={handleInputChange} />
          )}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 px-4">
            {currentStep > 1 && (
              <button
                onClick={handlePreviousStep}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border border-white/10 hover:bg-white/5 text-white text-sm font-semibold transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Previous Step
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={handleNextStep}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-14 bg-primary text-white text-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(6,127,249,0.4)] active:scale-[0.98] disabled:opacity-50"
              >
                Continue to Step {currentStep + 1}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
            {currentStep === 3 && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-14 bg-primary text-white text-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(6,127,249,0.4)] active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Submit for Approval"}
                <span className="material-symbols-outlined">send</span>
              </button>
            )}
          </div>

          {/* Footer Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/50 text-sm">
              Already have an account?{" "}
              <a
                className="text-primary font-bold hover:underline"
                href="/vendor/login"
              >
                Log in
              </a>
            </p>
            <div className="flex items-center gap-6 mt-4">
              <a
                className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-medium"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">help</span>
                Help & Support
              </a>
              <a
                className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-medium"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">shield</span>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

export default VendorRegister;
export { VendorRegister as VendorRegisterPage };
