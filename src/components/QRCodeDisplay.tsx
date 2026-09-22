"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

export function QRCodeDisplay({ url, size = 200 }: QRCodeDisplayProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      color: {
        dark: "#111827",
        light: "#FFFFFF",
      },
    })
      .then((res) => setDataUrl(res))
      .catch((err) => console.error("QR Code error:", err));
  }, [url, size]);

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className="bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse flex items-center justify-center text-xs text-stone-400"
      >
        QR Code...
      </div>
    );
  }

  return (
    <div className="p-3 bg-white rounded-2xl shadow-xl border border-stone-200/80 inline-block">
      <img
        src={dataUrl}
        alt="Scanner pour rejoindre"
        width={size}
        height={size}
        className="rounded-lg block"
      />
    </div>
  );
}
