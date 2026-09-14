import Link from "next/link";

const services = [
  {
    title: "Drop-in Centre",
    description: "Safe space with food, counselling, and referrals in Majengo.",
    link: "/programs/drop-in-centre",
    image: "/images/services/drop-in-centre.jpg",
  },
  {
    title: "Outreach Programme",
    description: "Daily visits to the dens — NSP, condoms, health talks.",
    link: "/programs/outreach",
    image: "/images/services/outreach.jpg",
  },
  {
    title: "VCT Services",
    description: "Confidential HIV testing and counselling.",
    link: "/programs/vct",
    image: "/images/services/vct.jpg",
  },
  {
    title: "Counselling",
    description: "One-on-one, family, group, and support groups.",
    link: "/programs/counselling",
    image: "/images/services/counselling.jpg",
  },
  {
    title: "Youth Crime Prevention",
    description: "Rescuing youth from gangs and crime.",
    link: "/youth/crime-prevention",
    image: "/images/services/crime.webp",
  },
  {
    title: "MAT Programme",
    description: "Supporting recovery with medical supervision.",
    link: "/programs/mat",
    image: "/images/services/mat.jpeg",
  },
  {
    title: "Food Programme",
    description: "Daily nutritious meals for clients.",
    link: "/programs/food",
    image: "/images/services/food.jpg",
  },
  {
    title: "Medical Referral",
    description: "Hospital partnerships for treatment.",
    link: "/programs/medical-referral",
    image: "/images/services/medical-referral.jpg",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        {/* Section Heading (removed the All → link) */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.link}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#007eb4] transition">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <span className="text-[#007eb4] text-sm font-medium mt-4 inline-block group-hover:underline">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
