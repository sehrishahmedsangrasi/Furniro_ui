import React from 'react';

const Description = () => {
  return (
    <div className="w-full">
      <div className="h-[0.09rem] w-full bg-gray-300"></div>

      {/* Title Section */}
      <div className="flex items-center justify-center lg:justify-start lg:ml-[14rem] py-4 lg:mt-6 ">
        <span className="inline font-bold text-lg text-black mt-2 sm:mt-0">Description</span>
        <span className="inline text-lg text-greyish mt-2 sm:mt-0 pl-6 sm:pl-9">Additional Information</span>
      </div>

      {/* Description Text */}
      <div className="text-xs text-greyish mt-4 mx-6 sm:mx-12">
        <p className="mb-4">
          Embodying the raw, wayward spirit of rock n roll, the Kilburn portable active stereo speaker takes
          the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
        </p>
        <p>
          Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage-styled engineering. Setting
          the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with
          a well-balanced audio that boasts a clear midrange and extended highs for a sound that is both articulate
          and pronounced. The analogue knobs allow you to fine-tune the controls to your personal preferences while
          the guitar-influenced leather strap enables easy and stylish travel.
        </p>
      </div>

      {/* Images Section */}
      <div className="flex flex-col sm:flex-row  items-center justify-center gap-6 mt-8 sm:mt-10">
        <div className="bg-cuspinky h-[20rem] lg:w-full md:w-full w-[23rem] rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <img src="cloudsofa2.png" alt="pic" className="h-full w-full object-cover rounded-lg" />
        </div>
        <div className="bg-cuspinky h-[20rem] lg:w-full md:w-full w-[23rem] rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <img src="cloudsofa1.png" alt="pic" className="h-full w-full object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Description;
