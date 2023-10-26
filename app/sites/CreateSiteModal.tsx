import { MouseEventHandler, FormEvent } from "react";

import { XMarkIcon } from "@heroicons/react/20/solid";

interface ICreateNewSite {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function CreateNewSite({ onClose }: ICreateNewSite) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed w-3/4 h-3/4 border rounded bg-black inset-x-0 mx-auto inset-y-0 my-auto">
      {/* Header */}
      <div className="h-10 border-b flex justify-end items-center">
        <button onClick={onClose} className="hover:text-gray-400 m-4">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="GLC">GLC</label>
            <input name="GLC" className="bg-black border rounded p-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input name="address" className="bg-black border rounded p-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="assignee">Assignee</label>
            <input name="assignee" className="bg-black border rounded p-2" />
          </div>
          <button className="p-4 rounded bg-gray-600 hover:bg-gray-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
