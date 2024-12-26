import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is PLIF?",
      answer: "PLIF (Portfolio Liquidity Investment Framework) is an advanced DeFi investment platform that helps users optimize their crypto portfolio through automated strategies and risk management.",
    },
    {
      question: "How does PLIF ensure the security of my investments?",
      answer: "PLIF employs multiple layers of security including smart contract audits, multi-sig wallets, and real-time monitoring. We also partner with leading security firms and maintain significant insurance coverage.",
    },
    {
      question: "What are the minimum investment requirements?",
      answer: "There is no minimum investment requirement to get started with PLIF. However, we recommend starting with at least $1,000 to effectively utilize our diversification strategies.",
    },
    {
      question: "How are the returns generated?",
      answer: "Returns are generated through a combination of yield farming, liquidity provision, and strategic token investments. Our AI algorithms continuously optimize these strategies based on market conditions.",
    },
    {
      question: "Can I withdraw my investments at any time?",
      answer: "Yes, you can withdraw your investments at any time. Most withdrawals are processed instantly, though some strategies may have a short lockup period for optimal performance.",
    },
    {
      question: "What fees does PLIF charge?",
      answer: "PLIF charges a small performance fee on profits generated. There are no management fees or hidden charges. Gas fees for transactions on the blockchain apply as normal.",
    },
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about PLIF and our investment strategies.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`w-6 h-6 transform ${
                        openIndex === index ? 'rotate-180' : ''
                      } transition-transform duration-200`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
