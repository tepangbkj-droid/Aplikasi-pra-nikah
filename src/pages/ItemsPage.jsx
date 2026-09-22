import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { notifyTelegram, buildItemMessage } from "../services/telegramBot";
import ItemForm from "../components/items/ItemForm";
import ItemList from "../components/items/ItemList";

export default function ItemsPage() {
  const { items, loading, add, update, remove } = useFirestore("items");
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(data) {
    setSubmitting(true);
    try {
      await add(data);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTogglePurchased(id, purchased) {
    const item = items.find((i) => i.id === id);
    await update(id, { purchased });
    if (item) {
      notifyTelegram(buildItemMessage({ name: item.name, purchased }));
    }
  }

  async function handleDelete(id) {
    await remove(id);
  }

  return (
    <div className="space-y-6">
      <ItemForm onAdd={handleAdd} submitting={submitting} />
      <ItemList
        items={items}
        loading={loading}
        onTogglePurchased={handleTogglePurchased}
        onDelete={handleDelete}
      />
    </div>
  );
}
