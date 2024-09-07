import { SearchIcon } from "lucide-react";
import React from "react";

export default function Search() {
  return (
    <div className="my-5 position-relative">
      <input
        type="tesxt"
        className="form-control ps-5"
        name="search"
        placeholder="Search Your Task..."
      />
    <SearchIcon className="position-absolute top-50 translate-middle-y ms-2 text-muted"  />

    </div>
  );
}
