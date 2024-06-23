import React from "react";

import Layout from "../components/Layouts/Layout";

const About = () => {
  const features = [
    { name: "Origin", description: "Designed by Tech Covers, Inc." },
    {
      name: "Material",
      description:
        "High-grade silicone with shock-absorbent TPU and a scratch-resistant coating. The inner lining is made of soft microfiber to prevent scratches on the phone.",
    },
    { name: "Dimensions", description: 'Fits phones up to 6.7"' },
    {
      name: "Finish",
      description: "Smooth matte finish with a non-slip grip for a comfortable hold. Available in multiple colors to suit your style.",
    },
    { name: "Includes", description: "Mobile cover, cleaning cloth, and a detachable wrist strap for added convenience." },
    {
      name: "Protection",
      description: "360-degree protection with raised edges to safeguard the screen and camera. Military-grade drop protection ensures your phone is safe from impacts.",
    },
    {
      name: "Accessibility",
      description: "Precise cutouts for all buttons, ports, and camera. Easy access to all features without removing the cover.",
    },
    {
      name: "Compatibility",
      description: "Compatible with wireless charging and most screen protectors.",
    },
    {
      name: "Considerations",
      description:
        "Made from eco-friendly materials. Slight variations in color may occur. Designed to fit snugly without adding bulk.",
    },
    {
      name: "Warranty",
      description:
        "Includes a 1-year warranty for manufacturing defects. Excellent customer support for any issues.",
    },
  
  ];
  return (
    <>
      <Layout>
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Technical Specifications
              </h2>
              <p className="mt-4 text-gray-500">
                The walnut wood card tray is precision milled to perfectly fit a
                stack of Focus cards. The powder coated steel divider separates
                active cards from new ones, or can be used to archive important
                task lists.
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src="https://m.media-amazon.com/images/I/61MVob7dMFL._SL1100_.jpg"
                alt="Mobile cover"
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://m.media-amazon.com/images/I/51aSqiSOg2L._SL1100_.jpg"
                alt="Mobile cover"
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://m.media-amazon.com/images/I/61b7L7yjdeL._SL1500_.jpg"
                alt="Mobile cover"
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://m.media-amazon.com/images/I/61vxELpPRlL._SL1482_.jpg"
                alt="Mobile cover"
                className="rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
        {/* companies */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              Available cover's by the world’s mobile phone selling companies
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://logos-world.net/wp-content/uploads/2023/03/Vivo-Logo-2009.png"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://download.logo.wine/logo/Oppo/Oppo-Logo.wine.png"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://zeevector.com/wp-content/uploads/Realme-Logo-Vector.png"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://e7.pngegg.com/pngimages/973/791/png-clipart-oneplus-5t-customer-service-oneplus-3t-others-angle-text.png"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
