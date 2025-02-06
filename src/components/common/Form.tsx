import React from 'react';

const Form: React.FC = () => {
  return (
    <div className="bg-white p-10 border border-gray-300 rounded-md w-1/2 font-poppins">
      <h1 className="font-bold text-[36px] mb-4">Billing Details</h1>
      <form className="space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="firstName" className="mb-1 text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="lastName" className="mb-1 text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="companyName" className="mb-1 text-gray-600">
            Company Name (Optional)
          </label>
          <input
            type="text"
            id="companyName"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="zipCode" className="mb-1 text-gray-600">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-1 text-gray-600">
            Country/Region
          </label>
          <input
            type="text"
            id="country"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="streetAddress" className="mb-1 text-gray-600">
            Street Address
          </label>
          <input
            type="text"
            id="streetAddress"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="townCity" className="mb-1 text-gray-600">
            Town/City
          </label>
          <input
            type="text"
            id="townCity"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="province" className="mb-1 text-gray-600">
            Province
          </label>
          <input
            type="text"
            id="province"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="addOnAddress" className="mb-1 text-gray-600">
            Add-on Address
          </label>
          <input
            type="text"
            id="addOnAddress"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="additionalInfo" className="mb-1 text-gray-600">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Form;
