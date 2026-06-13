import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-neutral-border/30 rounded-2xl overflow-hidden bg-white transition-all duration-200">
      <button
        className="w-full px-8 py-5 text-left flex justify-between items-center bg-white hover:bg-neutral-background transition-colors focus:outline-none"
        onClick={onToggle}
      >
        <span className="font-display font-semibold text-neutral-dark text-base sm:text-lg">
          {question}
        </span>
        <ChevronDown
          className={`text-neutral-muted shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-primary' : 'rotate-0'
          }`}
          size={20}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 pb-5 text-sm text-neutral-muted leading-relaxed border-t border-neutral-background pt-3">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What are the prerequisites for this workshop?',
      answer: 'No prior coding or robotics experience is required! We start from the absolute basics. A laptop or computer with a working web camera and a stable internet connection is all you need.',
    },
    {
      question: 'Will my child receive a certificate?',
      answer: 'Yes! Every student who successfully attends the live classes and showcases their final cohort project will receive an official AI & Robotics Graduation Certificate from RoboAI.',
    },
    {
      question: 'How are online classes conducted?',
      answer: 'Classes are held live via Zoom in structured blocks. Each lesson has an interactive theory portion followed by small breakout rooms of 5-10 kids where instructors help them program live simulators.',
    },
    {
      question: 'What software tools will be used?',
      answer: 'We use premium web-based visual block editors and robotics simulators (like Scratch and Blockly). There are no heavy software downloads or installations needed.',
    },
    {
      question: 'Is there a refund policy if we cannot attend?',
      answer: 'We provide a 100% refund if requested up to 7 days before the batch start date (15 July 2026). For cancellations closer to the start date, we offer a credit voucher for any future RoboAI cohort.',
    },
  ];

  return (
    <section id="faq" className="bg-neutral-background py-20 border-t border-neutral-border/10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-muted leading-relaxed">
            Got questions? We have answers to help you prepare.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
