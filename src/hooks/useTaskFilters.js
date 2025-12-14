import { useState } from "react";

export function useTaskFilters() {
  const [search, setSearch] = useState("");

  return { search, setSearch };
}
