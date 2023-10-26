"use client";

import { useState } from "react";

import CreateSiteModal from "./CreateSiteModal";

export default function Sites() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex flex-col gap-4 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-4 bg-gray-600 text-gray-300 self-end"
      >
        Add new site
      </button>
      <div>
        <ul>
          <li>site 1</li>
          <li>site 1</li>
          <li>site 1</li>
        </ul>
      </div>
      {showModal && <CreateSiteModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
