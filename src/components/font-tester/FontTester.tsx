import React, { useState } from "react";

export function FontTester() {
  const [text, setText] = useState(
    "Tipografi adalah seni dan teknik menyusun huruf agar bahasa tulis menjadi lebih jelas, terbaca, dan estetis saat ditampilkan.",
  );
  const [fontSize, setFontSize] = useState(48);
  const [lineHeight, setLineHeight] = useState(1.2);

  // Fungsi sakti buat ganti preset
  const applyPreset = (size: number, lh: number, sampleText: string) => {
    setFontSize(size);
    setLineHeight(lh);
    setText(sampleText);
  };

  const handleReset = () => {
    setText("Tipografi adalah seni dan teknik menyusun huruf...");
    setFontSize(48);
    setLineHeight(1.2);
  };

  return (
    <section className="py-20 bg-white dark:bg-black px-4 border-t border-gray-100">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header & Reset */}
        <div className="flex justify-between items-end border-b pb-4 border-gray-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              Interactive Typography
            </h2>
            <p className="text-sm text-gray-500">
              Adjust the size and spacing between lines in real-time to see how it affects readability and aesthetics. Perfect for testing different typographic styles and finding the ideal look for your content.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Preset Buttons - BIAR KERASA BEDANYA */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => applyPreset(72, 1, "Headline Utama")}
            className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Display Heading
          </button>
          <button
            onClick={() =>
              applyPreset(
                18,
                1.6,
                "Paragraf ini didesain agar nyaman dibaca dalam waktu lama. Spasi antar baris (Line Height) sengaja dibuat agak renggang agar mata tidak mudah lelah saat membaca teks yang cukup panjang.",
              )
            }
            className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Body Paragraph
          </button>
          <button
            onClick={() => applyPreset(40, 1.2, "Quotes Estetik")}
            className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Quote Style
          </button>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-200">
          <div className="md:col-span-1 w-full">
            <p className="text-[10px] font-black uppercase mb-2 opacity-40 tracking-[0.2em]">
              Input Teks
            </p>
            <input
              type="text"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="w-full">
            <p className="text-[10px] font-black uppercase mb-2 opacity-40 tracking-[0.2em]">
              Size: {fontSize}px
            </p>
            <input
              type="range"
              min={16}
              max={140}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="w-full">
            <p className="text-[10px] font-black uppercase mb-2 opacity-40 tracking-[0.2em]">
              Line Height: {lineHeight}
            </p>
            <input
              type="range"
              min={0.8}
              max={2.5}
              step={0.1}
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Display Area */}
        <div className="py-16 min-h-[400px] flex items-center justify-start border-b border-gray-50">
          <p
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
            }}
            className="transition-all duration-200 break-words outline-none w-full max-w-4xl text-left font-inter"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={(e: React.FormEvent<HTMLParagraphElement>) =>
              setText(e.currentTarget.textContent || "")
            }
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
