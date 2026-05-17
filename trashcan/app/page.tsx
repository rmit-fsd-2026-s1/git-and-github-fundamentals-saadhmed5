// Main homepage component for the Smart Bin Collection System
// This page contains:
// 1. Header
// 2. Two-column layout
// 3. Waste collection request form
// 4. Collection summary section
// 5. Footer

export default function Home(): JSX.Element {
  return (
    // Main container
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="bg-green-700 text-white p-6 shadow-lg">

        {/* Website title */}
        <h1 className="text-4xl font-bold text-center">
          Smart Bin Collection System
        </h1>

        {/* Subtitle */}
        <p className="text-center mt-2 text-green-100">
          Manage waste collection requests quickly and efficiently
        </p>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

        {/* ================================================= */}
        {/* LEFT SECTION - BIN COLLECTION FORM */}
        {/* ================================================= */}
        <section className="bg-white rounded-2xl shadow-xl p-8">

          {/* Form heading */}
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Collection Request Form
          </h2>

          {/* Request form */}
          <form className="space-y-5">

            {/* Full Name Input */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email Address Input */}
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Address Input */}
            <div>
              <label className="block mb-2 font-medium">
                Address
              </label>

              <input
                type="text"
                placeholder="Enter collection address"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Bin Type Dropdown */}
            <div>
              <label className="block mb-2 font-medium">
                Bin Type
              </label>

              <select
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Select Bin Type</option>
                <option>General Waste</option>
                <option>Recycling</option>
                <option>Green Waste</option>
              </select>
            </div>

            {/* Number of Bins Input */}
            <div>
              <label className="block mb-2 font-medium">
                Number of Bins
              </label>

              <input
                type="number"
                placeholder="Enter number of bins"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg transition"
            >
              Calculate Collection Cost
            </button>
          </form>
        </section>

        {/* ================================================= */}
        {/* RIGHT SECTION - COLLECTION SUMMARY */}
        {/* ================================================= */}
        <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">

          <div>

            {/* Summary heading */}
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Collection Summary
            </h2>

            {/* Summary information */}
            <div className="space-y-4 text-gray-700">

              {/* Collection type */}
              <div className="border-b pb-3">
                <p className="font-semibold">
                  Collection Type
                </p>

                <p>Recycling Waste</p>
              </div>

              {/* Pickup time */}
              <div className="border-b pb-3">
                <p className="font-semibold">
                  Estimated Pickup Time
                </p>

                <p>2 Business Days</p>
              </div>

              {/* Estimated price */}
              <div className="border-b pb-3">
                <p className="font-semibold">
                  Estimated Cost
                </p>

                <p className="text-2xl font-bold text-green-700">
                  $45.00
                </p>
              </div>
            </div>
          </div>

          {/* Sustainability tip box */}
          <div className="mt-10 bg-green-100 rounded-xl p-5">

            <h3 className="font-bold text-lg text-green-800 mb-2">
              Sustainability Tip
            </h3>

            <p className="text-green-700">
              Recycling one aluminium can saves enough energy
              to power a TV for 3 hours.
            </p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-green-700 text-white text-center p-4">
        Rubbish bin Collection company 2026
      </footer>
    </div>
  );
}
