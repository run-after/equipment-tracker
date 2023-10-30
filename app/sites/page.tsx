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
        <ul className="space-y-2">
          <li className="border rounded p-2 w-full">
            <div className="grid grid-cols-[1fr,1fr,auto] gap-2 font-bold">
              <span>GLC</span>
              <span>Address</span>
              <span className="mr-6">Assignee</span>
            </div>
          </li>
          {sites.map((site) => (
            <li key={site.GLC} className="border rounded p-2">
              <a
                href={`/sites/${site.GLC}`}
                className="hover:underline gap-2 grid grid-cols-[1fr,1fr,auto]"
              >
                <span>{site.GLC}</span>
                <span>
                  {site.address1} {site.address2} {site.city} {site.zip}
                </span>
                <span>{site.assignee}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {showModal && <CreateSiteModal onClose={() => setShowModal(false)} />}
    </main>
  );
}

// TODO: will need to paginate for when more sites are added
// TODO: filter results by text typed or assignee
