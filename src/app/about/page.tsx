'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-cuspinky w-full py-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-wide"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 max-w-2xl text-gray-700"
        >
          Learn more about who we are, our mission, our journey, and why We&#39;re committed to delivering excellence.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12 max-w-6xl mx-auto space-y-16">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border-l-4 border-cuspinky"
        >
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            We aim to empower people through modern and intuitive design, simplifying digital shopping while offering quality and trust.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border-l-4 border-cuspinky"
        >
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To become a global leader in creating delightful, user-focused digital experiences that drive positive change and innovation.
          </p>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border-l-4 border-cuspinky"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {['Ayesha', 'Ali', 'Sana'].map((name, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img
                    src={`/ceo${i + 1}.jpg`}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-gray-500">Creative Developer</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border-l-4 border-cuspinky"
        >
          <h2 className="text-2xl font-semibold mb-6">Our Journey</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800">2021</p>
              <p className="text-gray-600">We began as a small team passionate about UI/UX design and eCommerce innovation.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">2022</p>
              <p className="text-gray-600">Launched our first platform, reaching over 10,000 users within months.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">2023</p>
              <p className="text-gray-600">Expanded globally and introduced advanced product personalization features.</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-cuspinky rounded-xl py-10 px-6 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Join Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We&#39;re always looking for passionate collaborators. Whether you&#39;re a designer, developer, or dreamer — let&#39;s grow together!
          </p>
          <button className="mt-2 px-6 py-2 bg-white text-cuspinky font-semibold rounded-full hover:bg-gray-100 transition">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
}
