"use client";

import { useState } from "react";

interface FAQItem {
  id: number;
  questionTH: string;
  questionEN: string;
  answerTH: string;
  answerEN: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#d6c8b2]/60 bg-white/80 shadow-sm shadow-[#d6c8b2]/20 transition-shadow hover:shadow-md hover:shadow-[#d6c8b2]/30"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f7f2e8]/50"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <div className="flex-1 space-y-1">
                <p className="text-base font-semibold leading-relaxed text-[#2f3a36]">
                  {item.questionTH}
                </p>
                <p className="text-sm leading-relaxed text-[#5b6d65]">
                  {item.questionEN}
                </p>
              </div>
              <div
                className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f7f2e8] text-[#5b6d65] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[#d6c8b2]/40 bg-[#f7f2e8]/30 px-6 py-5">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm leading-relaxed text-[#44544d]">
                        {item.answerTH}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm leading-relaxed text-[#52635d]">
                        {item.answerEN}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
