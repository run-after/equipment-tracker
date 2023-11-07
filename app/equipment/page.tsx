"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import { useFirebase } from "@/app/contexts/firebase";

import CreateEquipModal from "./CreateEquipModal";

interface IEquip {
  id: string;
  make: string;
  model: string | null;
  serial: string | null;
  site: string; // Need to ref sites
  location: string;
}

export default function Equipment() {
  // Access context
  const { db } = useFirebase();

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [equip, setEquip] = useState<IEquip[]>([]);

  const getEquip = async () => {
    try {
      let arr: IEquip[] = [];

      // Get groups
      const querySnapshot = await getDocs(collection(db, "equipment"));

      // Add to arr
      querySnapshot.forEach((doc) => {
        const equip = doc.data();
        arr.push(equip as IEquip);
      });

      setEquip(arr);

      // End loading
      //setLoading(false);
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    getEquip();
  }, []);

  return (
    <main className="flex flex-col gap-4 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-4 bg-gray-600 text-gray-300 self-end"
      >
        Add new equipment piece
      </button>
      <div>
        <h1 className="text-xl font-bold pb-4">Equipment</h1>
        <ul className="space-y-2">
          <li className="border rounded p-2 w-full">
            <div className="grid grid-cols-3 gap-2 font-bold">
              <span>ID</span>
              <span>Make</span>
              <span>Model</span>
            </div>
          </li>
          {equip.map((equip) => (
            <li key={equip.id} className="border rounded p-2">
              <a
                href={`/equipment/${equip.id}`}
                className="hover:underline gap-2 grid grid-cols-3"
              >
                <span>{equip.id}</span>
                <span>{equip.make}</span>
                <span>{equip.model}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {showModal && <CreateEquipModal onClose={() => setShowModal(false)} />}
    </main>
  );
}

// TODO: will need to paginate for when more sites are added
// TODO: filter results by text typed or assignee
