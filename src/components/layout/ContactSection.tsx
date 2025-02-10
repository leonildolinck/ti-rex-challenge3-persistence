import React, { useState } from "react";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!/^[a-zA-Z]{2,}/.test(name)) {
      newErrors.name = "Name must have at least 2 letters.";
    }

    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (message.trim().length < 50) {
      newErrors.message = "Message must have at least 50 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", {
        name,
        email,
        subject,
        message,
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
      alert("Form submitted successfully!");
    }
  };

  return (
    <section className="flex flex-col bg-white pb-[68px] pt-[68px]">
      <div className="text-center top-[514px] left-0 right-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-black">
          Get In Touch With Us
        </h2>
        <p className="text-base md:text-lg text-gray-500 mt-2 max-w-2xl mx-auto pt-[7px]">
          For more information about our product & services, please feel free to
          drop us an email. Our staff is always here to help you out. Do not
          hesitate!
        </p>
      </div>

      <div className="flex flex-row justify-center gap-x-[160px]">
        <div className="flex flex-col gap-8 pt-[130px]">
          <div className="flex flex-row items-start">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/address.svg"
              alt=""
              className="h-[22px] w-[22px]"
            />
            <div>
              <h3 className="text-[24px] font-medium text-black mb-2">
                Address
              </h3>
              <p className="text-black">236 5th SE Avenue,</p>
              <p className="text-black">New York NY10000,</p>
              <p className="text-black">United States</p>
            </div>
          </div>
          <div className="flex flex-row items-start">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/phone.svg"
              alt=""
              className="h-[22px] w-[22px]"
            />
            <div>
              <h3 className="text-lg font-medium text-black mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">Mobile: +(84) 546-6789</p>
              <p className="text-gray-600 text-sm">Hotline: +(84) 456-6789</p>
            </div>
          </div>
          <div className="flex flex-row items-start">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/clock.svg"
              alt=""
              className="h-[22px] w-[22px]"
            />
            <div>
              <h3 className="text-lg font-medium text-black mb-2">
                Working Time
              </h3>
              <p className="text-gray-600 text-sm">
                Monday-Friday: 9:00 - 22:00 <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-[130px] p-8 flex flex-col gap-6"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="block font-medium text-black">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Abc"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-[528px] mt-2 p-6 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="block font-medium text-black">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Abc@def.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-2 p-6 border rounded-lg ${
                errors.email ? "border-red-500" : "border-[#9F9F9F]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="subject" className="block font-medium text-black">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="This is optional"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-2 p-6 border border-[#9F9F9F] rounded-lg text-[16px]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="block font-medium text-black">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Hi! I’d like to ask about"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full mt-2 p-6 border rounded-lg ${
                errors.message ? "border-red-500" : "border-[#9F9F9F]"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#B88E2F] w-[237px] h-[55px] text-white font-medium py-2 px-6 rounded-lg text-[16px] mt-[20px]"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
