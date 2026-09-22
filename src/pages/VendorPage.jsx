import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import VendorForm from "../components/vendor/VendorForm";
import VendorTable from "../components/vendor/VendorTable";

export default function VendorPage() {
  const { items, loading, add, remove } = useFirestore("vendors");
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(data) {
    setSubmitting(true);
    try {
      await add(data);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <VendorForm onAdd={handleAdd} submitting={submitting} />
      <VendorTable vendors={items} loading={loading} onDelete={remove} />
    </div>
  );
}
