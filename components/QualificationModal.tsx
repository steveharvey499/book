"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface QualificationFormData {
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  companyFocus?: string;
  biggestChallenge?: string;
  teamSize?: string;
  referralSource?: string;
  honeypot?: string;
}

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
}

const QualificationModal = ({ isOpen, onClose, redirectUrl }: QualificationModalProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState<Partial<QualificationFormData>>({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QualificationFormData>();

  const onEmailSubmit = (data: Partial<QualificationFormData>) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    // Validate email
    if (!data.email) {
      return;
    }

    // Save email and move to next step
    setFormData({ ...formData, email: data.email });
    setCurrentStep(2);
  };

  const onNameSubmit = (data: Partial<QualificationFormData>) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    // Validate first name
    if (!data.firstName) {
      return;
    }

    // Save names and move to questions step
    setFormData({ ...formData, firstName: data.firstName, lastName: data.lastName || "" });
    setCurrentStep(3);
  };

  const onFinalSubmit = async (data: QualificationFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          companyFocus: data.companyFocus,
          biggestChallenge: data.biggestChallenge,
          teamSize: data.teamSize,
          referralSource: data.referralSource,
        }),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorMessage = responseData?.error || responseData?.message || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Success - save to localStorage and redirect to book
      setSubmitStatus("success");
      setSubmitMessage("Thank you for subscribing! Redirecting to the book...");
      
      // Save signup completion to localStorage
      localStorage.setItem('brand-attention-strategy-signed-up', 'true');
      localStorage.setItem('brand-attention-strategy-signup-date', new Date().toISOString());
      
      // Small delay to show success message, then redirect
      setTimeout(() => {
        router.push(redirectUrl);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Subscription error details:", error);
      setSubmitStatus("error");
      
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }
      
      setSubmitMessage(
        `Sorry, there was an error subscribing: ${errorMessage}. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-guanine hover:text-adenine transition-colors z-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress indicator */}
          {(currentStep === 2 || currentStep === 3) && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 1 ? "bg-thymine text-white" : "bg-guanine/20 text-guanine"
              }`}>
                1
              </div>
              <div className={`w-12 h-0.5 ${currentStep >= 2 ? "bg-thymine" : "bg-guanine/20"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 2 ? "bg-thymine text-white" : "bg-guanine/20 text-guanine"
              }`}>
                2
              </div>
              <div className={`w-12 h-0.5 ${currentStep >= 3 ? "bg-thymine" : "bg-guanine/20"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 3 ? "bg-thymine text-white" : "bg-guanine/20 text-guanine"
              }`}>
                3
              </div>
            </div>
          )}

          <h2 className="text-section text-adenine mb-6 text-center">
            {currentStep === 1 ? "Get Started" : currentStep === 2 ? "Tell Us About Yourself" : "Almost There"}
          </h2>

          {currentStep === 1 ? (
            // Step 1: Email
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
              <input
                type="text"
                {...register("honeypot")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="qualification-email" className="block text-sm font-semibold text-adenine mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="qualification-email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors"
              >
                Continue
              </button>
            </form>
          ) : currentStep === 2 ? (
            // Step 2: Name
            <form onSubmit={handleSubmit(onNameSubmit)} className="space-y-4">
              <input
                type="text"
                {...register("honeypot")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                type="hidden"
                {...register("email")}
                value={formData.email}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qualification-first-name" className="block text-sm font-semibold text-adenine mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="qualification-first-name"
                    placeholder="First name"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="qualification-last-name" className="block text-sm font-semibold text-adenine mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="qualification-last-name"
                    placeholder="Last name"
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-guanine/30 text-adenine rounded-lg font-semibold hover:bg-bg-secondary transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          ) : (
            // Step 3: Questions
            <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
              <input
                type="text"
                {...register("honeypot")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" {...register("email")} value={formData.email} />
              <input type="hidden" {...register("firstName")} value={formData.firstName} />
              <input type="hidden" {...register("lastName")} value={formData.lastName} />

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-adenine mb-2">
                  1. Which of these best describes your current role? <span className="text-red-600">*</span>
                </label>
                <select
                  id="role"
                  {...register("role", { required: "Please select your role" })}
                  className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  aria-invalid={errors.role ? "true" : "false"}
                >
                  <option value="">Select your role</option>
                  <option value="founder-ceo">Founder / CEO</option>
                  <option value="scientific-founder-cso">Scientific Founder / CSO</option>
                  <option value="operations-commercial">Operations / Commercial Lead</option>
                  <option value="investor-board">Investor / Board Member</option>
                  <option value="aspiring-founder">Aspiring Founder / Researcher</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="companyFocus" className="block text-sm font-semibold text-adenine mb-2">
                  2. What is your company&apos;s current primary focus? <span className="text-red-600">*</span>
                </label>
                <select
                  id="companyFocus"
                  {...register("companyFocus", { required: "Please select company focus" })}
                  className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  aria-invalid={errors.companyFocus ? "true" : "false"}
                >
                  <option value="">Select company focus</option>
                  <option value="rd-discovery">R&D / Early-Stage Discovery</option>
                  <option value="pre-seed-seed">Pre-Seed / Seed Fundraising</option>
                  <option value="series-a-scaling">Series A+ Scaling</option>
                  <option value="commercial-validation">Commercial Validation & Partnerships</option>
                  <option value="clinical-regulatory">Clinical Trials / Regulatory Approval</option>
                </select>
                {errors.companyFocus && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.companyFocus.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="biggestChallenge" className="block text-sm font-semibold text-adenine mb-2">
                  3. What is your biggest challenge right now? <span className="text-red-600">*</span>
                </label>
                <select
                  id="biggestChallenge"
                  {...register("biggestChallenge", { required: "Please select your biggest challenge" })}
                  className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  aria-invalid={errors.biggestChallenge ? "true" : "false"}
                >
                  <option value="">Select your challenge</option>
                  <option value="attention">Attention: Building a brand to attract top-tier talent or investors.</option>
                  <option value="trajectory">Trajectory: Deciding whether to pivot, persevere, or raise capital.</option>
                  <option value="culture">Culture: Bridging the gap between our technical and business teams.</option>
                  <option value="gains">Gains: Securing our first revenue-generating partners or customers.</option>
                </select>
                {errors.biggestChallenge && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.biggestChallenge.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-semibold text-adenine mb-2">
                  4. What is your current team size? <span className="text-red-600">*</span>
                </label>
                <select
                  id="teamSize"
                  {...register("teamSize", { required: "Please select team size" })}
                  className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  aria-invalid={errors.teamSize ? "true" : "false"}
                >
                  <option value="">Select team size</option>
                  <option value="solo-duo">Solo Founder / Duo</option>
                  <option value="3-10">3–10 (The Core Team)</option>
                  <option value="11-50">11–50 (The Scaling Phase)</option>
                  <option value="51-plus">51+ (The Principles-Led Organization)</option>
                </select>
                {errors.teamSize && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.teamSize.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="referralSource" className="block text-sm font-semibold text-adenine mb-2">
                  5. How did you first hear about The Brand Attention Strategy? <span className="text-red-600">*</span>
                </label>
                <select
                  id="referralSource"
                  {...register("referralSource", { required: "Please select how you heard about us" })}
                  className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                  aria-invalid={errors.referralSource ? "true" : "false"}
                >
                  <option value="">Select referral source</option>
                  <option value="linkedin">LinkedIn / Founder Brand</option>
                  <option value="podcast">Podcast Episode</option>
                  <option value="referral">Personal Referral</option>
                  <option value="event">Speaking Event / Webinar</option>
                  <option value="search">Search Engine</option>
                  <option value="other">Other</option>
                </select>
                {errors.referralSource && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.referralSource.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border border-guanine/30 text-adenine rounded-lg font-semibold hover:bg-bg-secondary transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing..." : "Start Reading"}
                </button>
              </div>
            </form>
          )}

          {/* Status Message */}
          {submitStatus !== "idle" && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                submitStatus === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
              role="alert"
            >
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualificationModal;
