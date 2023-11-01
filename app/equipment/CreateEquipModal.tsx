import { MouseEventHandler, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { collection, getDocs } from "firebase/firestore";

import { useFirebase } from "@/app/contexts/firebase";

interface ISite {
  GLC: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  assignee: string;
}

interface ICreateNewEquipment {
  onClose: MouseEventHandler<HTMLElement>;
}

export default function CreateNewEquip({ onClose }: ICreateNewEquipment) {
  // Access router
  const router = useRouter();

  // Access contexts
  const { db } = useFirebase();

  const [errors, setErrors] = useState<string[]>([]);
  const [sites, setSites] = useState<ISite[]>([]);

  // TODO: This is repeated in app/sites/page
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Deconstruct form
    const { ID, make, model, serial, site, location } = e.currentTarget;

    // Temp error array
    let err: string[] = [];

    // Run through required inputs and add error if not present
    if (!ID?.value) {
      err = [...err, "id"];
    } else {
      err = err.filter((e) => e !== "id");
    }

    if (!make?.value) {
      err = [...err, "make"];
    } else {
      err = err.filter((e) => e !== "make");
    }

    if (!model?.value) {
      err = [...err, "model"];
    } else {
      err = err.filter((e) => e !== "model");
    }

    if (!serial?.value) {
      err = [...err, "serial"];
    } else {
      err = err.filter((e) => e !== "serial");
    }

    if (!site?.value) {
      err = [...err, "site"];
    } else {
      err = err.filter((e) => e !== "site");
    }

    if (!location?.value) {
      err = [...err, "location"];
    } else {
      err = err.filter((e) => e !== "location");
    }

    // Set error state
    if (err.length) {
      setErrors(err);
      return;
    }

    try {
      await setDoc(doc(db, "equipment", ID.value), {
        id: ID.value,
        make: make.value,
        model: model.value,
        serial: serial.value,
        site: site.value,
        location: location.value,
      });

      // TODO: Figure out how to not have to pass something in
      onClose(make);

      router.replace(`/sites/${ID.value}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <div
      className="fixed h-screen w-screen backdrop-blur-sm inset-x-0 inset-y-0"
      onClick={onClose}
    >
      <div
        className="fixed w-3/4 h-3/4 border rounded bg-black inset-x-0 mx-auto inset-y-0 my-auto shadow-2xl shadow-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-10 border-b flex justify-end items-center">
          <button onClick={onClose} className="hover:text-gray-400 m-4">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className={`flex flex-col`}>
              <label
                htmlFor="ID"
                className={errors.includes("id") ? " text-red-500" : ""}
              >
                Unit ID
              </label>
              <input
                required
                name="ID"
                className={`bg-black border rounded p-2 ${
                  errors.includes("id") ? " border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <label
                  htmlFor="make"
                  className={errors.includes("make") ? " text-red-500" : ""}
                >
                  Unit make
                </label>
                <input
                  required
                  name="make"
                  className={`bg-black border rounded p-2 ${
                    errors.includes("make") ? " border-red-500" : ""
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="model">Unit model</label>
                <input name="model" className="bg-black border rounded p-2" />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="serial"
                  className={errors.includes("serial") ? " text-red-500" : ""}
                >
                  Serial
                </label>
                <input
                  required
                  name="serial"
                  className={`bg-black border rounded p-2 ${
                    errors.includes("serial") ? " border-red-500" : ""
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="site">Site</label>
                <select
                  name="site"
                  className="bg-black border rounded p-2 pb-3"
                >
                  {sites.map((site) => (
                    <option key={site.GLC} value={site.GLC}>
                      {site.GLC}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className={errors.includes("location") ? " text-red-500" : ""}
                >
                  Unit location
                </label>
                <input
                  required
                  name="location"
                  className={`bg-black border rounded p-2 ${
                    errors.includes("location") ? " border-red-500" : ""
                  }`}
                />
              </div>
            </div>

            <button className="p-4 rounded bg-gray-600 hover:bg-gray-700 mt-8">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// TODO: The equipModal and SiteModal are both basically the same - refactor most of it out
// TODO: The checks for value from fields can be mapped across - refactor
