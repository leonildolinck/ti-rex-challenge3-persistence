import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CheckoutFormProps {
  onFormSubmit: (formData: FormData) => void;
}

interface FormData {
  zipCode: string;
  streetAddress: string;
  province: string;
  townCity: string;
  country: string;
  addOnAddress: string;
  additionalInfo: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onFormSubmit }) => {
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [townCity, setTownCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [addOnAddress, setAddOnAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    zipCode,
    streetAddress,
    province,
    townCity,
    country,
    addOnAddress,
    additionalInfo,
  });

  useEffect(() => {
    const newFormData: FormData = {
      zipCode,
      streetAddress,
      province,
      townCity,
      country,
      addOnAddress,
      additionalInfo,
    };

    if (JSON.stringify(newFormData) !== JSON.stringify(formData)) {
      setFormData(newFormData);
      onFormSubmit(newFormData);
    }
  }, [
    zipCode,
    streetAddress,
    province,
    townCity,
    country,
    addOnAddress,
    additionalInfo,
    formData,
    onFormSubmit,
  ]);

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setZipCode(value);

    if (value.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setStreetAddress(data.logradouro || "");
          setProvince(data.bairro || "");
          setTownCity(data.localidade || "");
        }
      } catch {
        console.error("Error fetching address information.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="bg-white p-10 border border-gray-300 rounded-md font-poppins">
        <h1 className="font-semibold lg:text-[36px] mb-4">Billing Details</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="firstName"
                className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label
                htmlFor="lastName"
                className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="zipCode"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={zipCode}
              onChange={handleZipCodeChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              Country/Region
            </label>
            <input
              type="text"
              id="country"
              placeholder="Brazil"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={country}
              onChange={() => setCountry("Brazil")}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="streetAddress"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="townCity"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              Town/City
            </label>
            <input
              type="text"
              id="townCity"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={townCity}
              onChange={(e) => setTownCity(e.target.value)}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="province"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="addOnAddress"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              Add-on Address
            </label>
            <input
              type="text"
              id="addOnAddress"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={addOnAddress}
              onChange={(e) => setAddOnAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="additionalInfo"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] mb-1 text-gray-600"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              className="sm:text-[10px] md:text-[14px] lg:text-[16px] border border-gray-300 rounded-md px-3 py-2 w-full"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
