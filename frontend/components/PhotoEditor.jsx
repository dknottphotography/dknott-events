import { useEffect, useRef, useState } from "react";
import { resolveUrl } from "../lib/api";

// Simple client-side photo editor: rotate + flip, then save.
// The parent uploads the resulting file via editPhotoAdmin().
export default function PhotoEditor({ photo, onClose, onSave, saving }) {
  const canvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [rotation, setRotation] = useState(0); // 0 | 90 | 180 | 270
  const [flipH, setFlipH] = useState(false);

  useEffect(() => {
    setImg(null);
    setLoadError(false);
    setRotation(0);
    setFlipH(false);
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => setImg(im);
    im.onerror = () => setLoadError(true);
    im.src = resolveUrl(photo.url);
  }, [photo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const rot = ((rotation % 360) + 360) % 360;
    const swap = rot === 90 || rot === 270;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = swap ? h : w;
    canvas.height = swap ? w : h;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, 1);
    ctx.drawImage(img, -w / 2, -h / 2);
    ctx.restore();
  });

  const dirty = rotation !== 0 || flipH;

  const handleSave = () => {
    if (!dirty || !canvasRef.current) return;
    canvasRef.current.toBlob(
      (blob) => {
        if (blob) onSave(new File([blob], "edited.jpg", { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div
        className="w-full max-w-2xl rounded-2xl border border-[rgba(255,255,255,0.1)] p-6"
        style={{ backgroundColor: "#12151b" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Edit photo</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md px-2 py-1 transition hover:bg-[rgba(255,255,255,0.08)] hover:text-[#F5F2EC]"
            style={{ color: "#A8A29A" }}
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex max-h-[55vh] items-center justify-center overflow-hidden rounded-lg bg-[rgba(255,255,255,0.04)]">
          {loadError ? (
            <p className="p-8 text-sm text-red-300">
              Couldn&apos;t load the image for editing.
            </p>
          ) : !img ? (
            <p className="p-8 text-sm" style={{ color: "#A8A29A" }}>Loading…</p>
          ) : (
            <canvas ref={canvasRef} className="max-h-[55vh] max-w-full" />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRotation((r) => r - 90)}
            disabled={!img}
            className="rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-medium transition hover:border-[rgba(255,255,255,0.45)] disabled:opacity-40"
            style={{ color: "#F5F2EC" }}
          >
            ⟲ Rotate left
          </button>
          <button
            onClick={() => setRotation((r) => r + 90)}
            disabled={!img}
            className="rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-medium transition hover:border-[rgba(255,255,255,0.45)] disabled:opacity-40"
            style={{ color: "#F5F2EC" }}
          >
            ⟳ Rotate right
          </button>
          <button
            onClick={() => setFlipH((f) => !f)}
            disabled={!img}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition disabled:opacity-40 ${
              flipH ? "border-[#2DD4BF]/50 bg-[#2DD4BF]/10 text-[#2DD4BF]" : "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.04)] text-[#F5F2EC] hover:border-[rgba(255,255,255,0.45)]"
            }`}
          >
            ⇄ Flip
          </button>
          <button
            onClick={() => {
              setRotation(0);
              setFlipH(false);
            }}
            disabled={!dirty}
            className="rounded-lg px-3 py-2 text-sm transition hover:text-[#F5F2EC] disabled:opacity-40"
            style={{ color: "#A8A29A" }}
          >
            Reset
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm transition hover:text-[#F5F2EC]"
            style={{ color: "#A8A29A" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className="rounded-lg px-6 py-2 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#0F766E", color: "#ffffff" }}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
        <p className="mt-2 text-xs" style={{ color: "#A8A29A" }}>
          Saving replaces the photo and re-scans it for faces.
        </p>
      </div>
    </div>
  );
}
