import { useState } from 'react';
import { Mail, User, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const validate = () => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^\+?[\d\s\-()]{10,15}$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid 10-15 digit phone number.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFeedbackMessage(data.message || 'Enquiry submitted successfully!');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setSubmitStatus('error');
        setFeedbackMessage(data.errors?.join(', ') || data.message || 'Submission failed. Please check inputs.');
      }
    } catch (err) {
      console.error('API submission error:', err);
      setSubmitStatus('error');
      setFeedbackMessage('Unable to connect to the server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-primary hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300 rounded-3xl p-8 md:p-14 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blur-[80px] rounded-full -ml-32 -mb-32 -z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Info Details column */}
          <div className="text-white flex flex-col items-start text-left">
            <span className="bg-white/20 border border-white/10 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              Limited Seats Available
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Secure Your Child's Spot Today
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Fill out the enquiry form, and our admissions advisor will contact you within 24 hours to complete registration and cohort placement.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="font-bold text-sm">₹</span>
                </div>
                <div>
                  <p className="text-xs text-white/60">Workshop Fee</p>
                  <p className="text-sm sm:text-base font-bold">₹2,999 (All Inclusive)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/60">Cohort Capacity</p>
                  <p className="text-sm sm:text-base font-bold">Max 15 students per batch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6 scale-up animate-in duration-300">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-xl font-bold text-neutral-dark mb-3">
                  Thank You!
                </h3>
                <p className="text-sm text-neutral-muted leading-relaxed max-w-sm">
                  {feedbackMessage}
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-8 bg-primary text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-primary-container transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-lg font-bold text-neutral-dark mb-4 text-left">
                  Request Information
                </h3>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Name field */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-1.5 text-left">
                    Guardian Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-muted" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      disabled={isSubmitting}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                        errors.name
                          ? 'border-red-500 bg-red-50/20'
                          : 'border-neutral-border/50 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-left text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-1.5 text-left">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-muted" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      disabled={isSubmitting}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                        errors.email
                          ? 'border-red-500 bg-red-50/20'
                          : 'border-neutral-border/50 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-left text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone field */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-1.5 text-left">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-muted" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      disabled={isSubmitting}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                        errors.phone
                          ? 'border-red-500 bg-red-50/20'
                          : 'border-neutral-border/50 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-left text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover-lift shadow-lg shadow-primary/10 transition-all disabled:opacity-75 disabled:pointer-events-none mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
