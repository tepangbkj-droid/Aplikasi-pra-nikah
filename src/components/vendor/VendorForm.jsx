import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

// Normalisasi nomor WA ke format wa.me: buang karakter non-digit,
// ubah awalan 0 jadi 62 (kode Indonesia).
function normalizeWaNumber(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

export default function VendorForm({ onAdd, submitting }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [waNumber, setWaNumber] = useState("");
  const [price, setPrice] = useState("");

  const valid = name.trim() && waNumber.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;

    onAdd({
      name: name.trim(),
      link: link.trim() || null,
      waNumber: normalizeWaNumber(waNumber),
      price: Number(price) || 0,
    });

    setName("");
    setLink("");
    setWaNumber("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 shadow-card p-5">
      <p className="text-xs font-semibold text-ink/40 mb-4">TAMBAH VENDOR</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama vendor"
          className="md:col-span-1 px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link (Instagram/website)"
          className="md:col-span-1 px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <input
          type="tel"
          value={waNumber}
          onChange={(e) => setWaNumber(e.target.value)}
          placeholder="No. WA, mis. 0812xxxxxxx"
          className="md:col-span-1 px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Harga (Rp)"
          className="md:col-span-1 px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <Button type="submit" disabled={submitting || !valid} className="md:col-span-1 w-full">
          <Plus size={16} />
          Tambah
        </Button>
      </div>
    </form>
  );
}
