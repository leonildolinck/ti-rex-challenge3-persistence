import React from "react";

const ContactSection: React.FC = () => {
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
            <div className="">
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
            <div className="">
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
            <div className="">
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
        <div className="bg-white mt-[130px] p-8">
          <div className="flex flex-col mb-8 gap-4">
            <label htmlFor="name" className="block font-medium text-black">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Abc"
              className="w-[528px] mt-2 p-6 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col mb-8 gap-4">
            <label htmlFor="email" className="block font-medium text-black">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Abc@def.com"
              className="w-full mt-2 p-6 border border-[#9F9F9F] rounded-lg text-[16px]"
            />
          </div>
          <div className="flex flex-col mb-8 gap-4">
            <label htmlFor="subject" className="block font-medium text-black">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="This is optional"
              className="w-full mt-2 p-6 border border-[#9F9F9F] rounded-lg text-[16px]"
            />
          </div>
          <div className="flex flex-col mb-8 gap-4">
            <label htmlFor="message" className="block font-medium text-black">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Hi! I’d like to ask about"
              rows={4}
              className="w-full mt-2 p-6 border border-[#9F9F9F] rounded-lg text-[16px]"
            ></textarea>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-[#B88E2F] w-[237px] h-[55px] text-white font-medium py-2 px-6 rounded-lg text-[16px] mt-[50px]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
