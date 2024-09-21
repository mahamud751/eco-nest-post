import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 flex flex-col items-center bg-cyan-900 overflow-hidden md:py-40">
      <div className="relative z-[1] container m-auto px-6 md:px-12">
        <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="w-full space-x-12 flex justify-center text-gray-300 sm:w-7/12 md:justify-start">
              <ul className="list-disc list-inside space-y-8">
                {[
                  "Home",
                  "About",
                  "Guide",
                  "Blocks",
                  "Contact",
                  "Terms of Use",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-sky-400 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="space-y-8">
                <SocialLink
                  href="#"
                  iconPath="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49..."
                  label="Github"
                />
                <SocialLink
                  href="#"
                  iconPath="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542..."
                  label="Twitter"
                />
                <SocialLink
                  href="#"
                  iconPath="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883..."
                  label="YouTube"
                />
                <SocialLink
                  href="#"
                  iconPath="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75..."
                  label="Facebook"
                />
                <SocialLink
                  href="#"
                  iconPath="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5..."
                  label="Medium"
                />
                <SocialLink
                  href="#"
                  iconPath="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977..."
                  label="Pintrest"
                />
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-3 hover:text-sky-400 transition"
                  >
                    <img
                      className="w-5 h-5"
                      src="https://c5.patreon.com/external/favicon/favicon.ico?v=69kMELnXkB"
                      alt="patreon icon"
                    />
                    <span>Patreon</span>
                  </a>
                </li>
                <SocialLink
                  href="#"
                  iconPath="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417..."
                  label="Instagram"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  iconPath: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, iconPath, label }) => (
  <li>
    <a
      href={href}
      className="flex items-center space-x-3 hover:text-sky-400 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-5"
        viewBox="0 0 16 16"
      >
        <path d={iconPath} />
      </svg>
      <span>{label}</span>
    </a>
  </li>
);

export default Footer;
