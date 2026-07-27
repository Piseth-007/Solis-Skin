import { useState } from "react";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  const tabs = ["description", "ingredients", "benefits", "howToUse"];

  return (
    <section className="mt-20">
      <div className="flex border-b">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-6 py-4 capitalize ${
              tab === item
                ? "border-b-2 border-rose-500 font-semibold text-rose-500"
                : "text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 text-gray-600">
        {tab === "description" && <p>{product.description}</p>}

        {tab === "ingredients" && (
          <ul className="list-disc space-y-2 pl-6">
            {product.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {tab === "benefits" && (
          <ul className="list-disc space-y-2 pl-6">
            {product.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {tab === "howToUse" && (
          <ol className="list-decimal space-y-2 pl-6">
            {product.howToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
