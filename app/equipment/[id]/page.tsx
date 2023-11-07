"use client";

import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useFirebase } from "@/app/contexts/firebase";

interface IEquip {
  id: string;
  make: string;
  model: string | null;
  serial: string | null;
  site: string; // Need to ref sites
  location: string;
}

export default function EquipmentPiece({ params }: { params: { id: string } }) {
  // Access context
  const { db } = useFirebase();

  const [equip, setEquip] = useState<IEquip>();

  const getEquip = async () => {
    try {
      await getDoc(doc(db, "equipment", params.id)).then((info) => {
        setEquip(info.data() as IEquip);
      });

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
    <div>
      <p>{equip?.model}</p>
      <p>{equip?.make}</p>
      <p>{equip?.serial}</p>
      <p>{equip?.site}</p>
      <p>{equip?.location}</p>
    </div>
  );
}
