"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import { useFirebase } from "@/app/contexts/firebase";

import CreateSiteModal from "./CreateSiteModal";

interface ISite {
  GLC: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  assignee: string;
}

export default function Sites() {
  // Access context
  const { db } = useFirebase();

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [sites, setSites] = useState<ISite[]>([]);

  const getSites = async () => {
    try {
      let arr: ISite[] = [];

      // Get groups
      const querySnapshot = await getDocs(collection(db, "sites"));

      // Add to arr
      querySnapshot.forEach((doc) => {
        const site = doc.data();
        arr.push(site as ISite);
      });

      setSites(arr);

      // End loading
      //setLoading(false);
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <main className="flex flex-col gap-4 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-4 bg-gray-600 text-gray-300 self-end"
      >
        Add new site
      </button>
      <div>
        <h1 className="text-xl font-bold pb-4">Sites</h1>
        <ul className="flex flex-col gap-2">
          {sites.map((site) => (
            <li key={site.GLC} className="border rounded p-2">
              <a href={`/sites/${site.GLC}`} className="hover:underline">
                {site.GLC}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {showModal && <CreateSiteModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
