const testimonials = [
  {
    quote:
      "I was in a gang in Majengo. Sea of Hope helped me leave and go back to school. Now I'm learning carpentry.",
    name: "Kevin, 17",
    role: "Youth Program Participant",
  },
  {
    quote:
      "I was addicted to heroin. The drop-in centre gave me food, counselling, and support. Today I'm clean for 2 years.",
    name: "Aisha, 29",
    role: "Recovery Program Graduate",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="section-heading">
          <h2>Success Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-4xl text-[#007eb4] mb-4">"</div>
              <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
