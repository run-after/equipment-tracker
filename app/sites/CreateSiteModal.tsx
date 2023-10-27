import { MouseEventHandler, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { useFirebase } from "@/app/contexts/firebase";

interface ICreateNewSite {
  onClose: MouseEventHandler<HTMLElement>;
}

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function CreateNewSite({ onClose }: ICreateNewSite) {
  // Access router
  const router = useRouter();

  // Access contexts
  const { db } = useFirebase();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Deconstruct form
    const { GLC, address1, address2, city, state, zip, assignee } =
      e.currentTarget;

    try {
      await setDoc(doc(db, "sites", GLC.value), {
        GLC: GLC.value,
        address1: address1.value,
        address2: address2.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
        assignee: assignee.value,
      });

      // TODO: Figure out what type to use so I don't need to pass in zip
      onClose(zip);

      router.replace(`/sites/${GLC.value}`);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="flex flex-col">
              <label htmlFor="GLC">GLC</label>
              <input name="GLC" className="bg-black border rounded p-2" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <label htmlFor="address1">Address line 1</label>
                <input
                  name="address1"
                  className="bg-black border rounded p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address2">Address line 2</label>
                <input
                  name="address2"
                  className="bg-black border rounded p-2"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col flex-1">
                  <label htmlFor="city">City</label>
                  <input name="city" className="bg-black border rounded p-2" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    className="bg-black border rounded p-2 pb-3"
                  >
                    {states.map((state) => {
                      return (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zip">Zip code</label>
                  <input name="zip" className="bg-black border rounded p-2" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="assignee">Assignee</label>
              <input name="assignee" className="bg-black border rounded p-2" />
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
