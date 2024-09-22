import React from "react";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/pageComponents/about/Faq";

const About: React.FC = () => {
  return (
    <div className="about pt-20 pb-16">
      <div className="container mx-auto">
        <div className="main-txt text-center">
          <h1 className="text-3xl font-bold">
            Welcome To D SMART SOLUTION LTD
          </h1>
          <p className="my-5 text-lg">
            D SMART SOLUTION LTD is a private company with a social purpose. We
            came up with a solution for one of the biggest problems in the
            education sector (especially primary, secondary, and post-secondary
            education), which is getting dropped off of the students from
            education due to lack of educational equipment including uniforms.
            As a social business, D SMART SOLUTION LTD is 100% mission-driven to
            solve the identified problems in the education sector for the next
            generations and having a better living world for everyone. We
            started our journey with a view to providing every student with the
            exact uniform, maintaining the best quality that comes with a lower
            cost, providing uniform and educational equipment free of cost to
            the needy and underprivileged students, providing employment for
            thousands of people along with infrastructure upgrading and social
            work.
          </p>
        </div>

        <div className="why-choose mt-5">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2">
              <h2 className="part-title text-xl font-bold">Why Choose Us?</h2>
              <Faq />
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="https://i.ibb.co/PWp0wjw/1663173766467-purctz3l638m5clogv95fx1z43z0wf3phetbtrczlk.webp"
                alt="About Us"
                width={500}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team pt-16 pb-32">
        <div className="container mx-auto">
          <h2 className="about-page-title text-center text-2xl font-bold">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="w-1/2 md:w-1/4 p-4">
                <div className="single-card border rounded-lg shadow-md">
                  <div className="part-img">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={2000}
                      height={550}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="part-txt p-4 text-center">
                    <h3 className="font-bold">{member.name}</h3>
                    <p>{member.position}</p>
                  </div>
                  <div className="social flex justify-center space-x-4 pb-4">
                    {member.socials.map((social) => (
                      <Link
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                      >
                        <i className={`fa-brands fa-${social.platform}`} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    name: "Shakib Al Hasan",
    position: "Chairman",
    image:
      "https://i.ibb.co/V3Hbzg9/Whats-App-Image-2024-05-22-at-13-17-33.jpg",
    socials: [
      {
        platform: "facebook-f",
        link: "https://www.facebook.com/Shakib.Al.Hasan",
      },
    ],
  },
  {
    id: 2,
    name: "Md Mainul Hasan Dulon",
    position: "Chief Executive Officer",
    image:
      "https://i.ibb.co/vLm4ZXV/IMG-20220825-WA0000-puavze9wacuwfrvz4x5w1560bwtpypjnhgexdq7q60.webp",
    socials: [
      { platform: "facebook-f", link: "https://www.facebook.com/hm.dulon" },
      { platform: "whatsapp", link: "https://wa.me/+8801933657804" },
      {
        platform: "linkedin",
        link: "https://www.linkedin.com/in/md-mainul-hasan-dulon-7b1233108/",
      },
    ],
  },
  {
    id: 3,
    name: "Mahbuba Reza",
    position: "Director, Strategic & Planning",
    image:
      "https://i.ibb.co/PWp0wjw/1663173766467-purctz3l638m5clogv95fx1z43z0wf3phetbtrczlk.webp",
    socials: [],
  },
  {
    id: 4,
    name: "Md Rayhan Bhuiyan",
    position: "Chief Operating Officer",
    image:
      "https://i.ibb.co/RYkXfH3/1661414002790-removebg-preview-puaw0xqdhkytgrnf534vm967dn8dkuntd2wkp1xhyw.webp",
    socials: [
      {
        platform: "facebook-f",
        link: "https://www.facebook.com/mdrayhanOfficial",
      },
      { platform: "whatsapp", link: "https://wa.me/+8801689584336" },
    ],
  },
  {
    id: 5,
    name: "Md. Selim",
    position: "Director, Marketing & Communication",
    image:
      "https://i.ibb.co/k5NMmb0/1663173766542-purd6fglq2adzcieqr26z9wugwl3w1jo71zxqqw75k.webp",
    socials: [],
  },
];

export default About;
