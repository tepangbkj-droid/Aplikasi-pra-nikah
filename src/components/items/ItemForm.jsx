import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

const CATEGORIES = ["Seserahan", "Perabotan"];

export default function ItemForm({ onAdd, submitting }) {
  const [name, setName] = useState("");
  const [shopeeLink, setShopeeLink] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const valid = name.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;

    onAdd({
      name: name.trim(),
      shopeeLink: shopeeLink.trim() || null,
      category,
      purchased: false,
    });

    setName("");
    setShopeeLink("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 shadow-card p-5">
      <p className="text-xs font-semibold text-ink/40 mb-4">TAMBAH BARANG</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama barang, mis. Rice cooker"
          className="md:col-span-2 px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <input
          type="url"
          value={shopeeLink}
          onChange={(e) => setShopeeLink(e.target.value)}
          placeholder="Link Shopee (opsional)"
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm text-ink/70 focus:border-wine outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" disabled={submitting || !valid} className="mt-3">
        <Plus size={16} />
        Tambah Barang
      </Button>
    </form>
  );
}
