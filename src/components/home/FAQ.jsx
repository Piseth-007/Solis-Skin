import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are your products authentic?",
    answer:
      "Yes. All products sold by Solis Skin are sourced from authorized distributors and trusted brands.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are typically delivered within 2–5 business days depending on your location.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes. Returns are accepted within 7 days for unopened and unused products.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support ABA, Bakong QR, Visa, MasterCard, and cash on delivery where available.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>

          <p className="mt-5 text-gray-500">
            Everything you need to know before placing an order.
          </p>
        </div>

        {faqs.map((faq, index) => (
          <div key={index} className="mb-5 rounded-3xl border p-6">
            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-xl font-semibold">{faq.question}</h3>

              <ChevronDown
                className={`transition ${open === index ? "rotate-180" : ""}`}
              />
            </button>

            {open === index && (
              <p className="mt-6 leading-8 text-gray-500">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
