import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="container my-12 mx-auto px-2 md:px-4">
      <section className="mb-32">
        <div className="flex justify-center">
          <div className="text-center md:max-w-xl lg:max-w-3xl">
            <h2 className="mb-12 px-6 text-3xl font-bold">Contact us</h2>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Google Maps Section */}
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12 lg:pr-6 mb-12">
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29198.465170943447!2d90.351370899528!3d23.825420372236902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1004c51b2db%3A0x254957df1d4af9b7!2sMirpur%2010%20Metro%20Station!5e0!3m2!1sen!2sbd!4v1728658128672!5m2!1sen!2sbd"
                width="100%"
                allowFullScreen
                height="480"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form Section */}
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
            <form>
              <div className="mb-3 w-full">
                <label
                  className="block font-medium mb-[2px] text-teal-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="px-2 py-2 border w-full outline-none rounded-md"
                  id="name"
                  placeholder="Name"
                />
              </div>

              <div className="mb-3 w-full">
                <label
                  className="block font-medium mb-[2px] text-teal-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="px-2 py-2 border w-full outline-none rounded-md"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="mb-3 w-full">
                <label
                  className="block font-medium mb-[2px] text-teal-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="px-2 py-2 border rounded-[5px] w-full outline-none"
                  id="message"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mb-6 inline-block w-full rounded bg-teal-400 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-teal-500"
              >
                Send
              </button>
            </form>
            <div className="w-full shrink-0 grow-0 basis-auto ">
              <div className="flex flex-wrap">
                <ContactInfo
                  title="Technical support"
                  email="korbojoy@gmail.com"
                  phone="+8801789999751"
                  iconPath="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372..."
                />
                <ContactInfo
                  title="Sales questions"
                  email="korbojoy@gmail.com"
                  phone="+8801789999751"
                  iconPath="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A..."
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
        </div>
      </section>
    </div>
  );
};

interface ContactInfoProps {
  title: string;
  email: string;
  phone: string;
  iconPath: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  title,
  email,
  phone,
  iconPath,
}) => (
  <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
    <div className="flex items-start">
      <div className="shrink-0">
        <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
      </div>
      <div className="ml-6 grow">
        <p className="mb-2 font-bold">{title}</p>
        <p className="text-neutral-500">{email}</p>
        <p className="text-neutral-500">{phone}</p>
      </div>
    </div>
  </div>
);

export default Contact;
