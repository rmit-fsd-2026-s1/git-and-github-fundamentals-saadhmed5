"use client";

import Image from "next/image";
import { calculateCollection } from "../services/api";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    binType: "",
    collectionDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { price, setPrice } = useAppContext();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
    setPrice(null);
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Customer name is required.";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (form.address.length < 8) {
      newErrors.address = "Address must be at least 8 characters.";
    }

    if (!form.binType) {
      newErrors.binType = "Please select a bin type.";
    }

    if (!form.collectionDate) {
      newErrors.collectionDate = "Collection date is required.";
    } else {
      const selectedDate = new Date(form.collectionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.collectionDate =
          "Collection date cannot be in the past.";
      }
    }

    if (form.notes.length > 150) {
      newErrors.notes = "Notes must be less than 150 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitted(false);
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      const response: any = await calculateCollection(form.binType);

      setPrice(response.collectionPrice);
      setSubmitted(true);
    } catch (error) {
      setApiError("Failed to calculate collection price.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-700 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">
          Smart Trash Bin Collection
        </h1>

        <p className="text-center mt-2 text-green-100">
          Book and manage household waste collection requests
        </p>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 p-5 max-w-7xl mx-auto w-full">
        <section className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Collection Request Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Customer Name
              </label>

              {errors.name && (
                <p className="text-red-600 text-sm mb-1">{errors.name}</p>
              )}

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Address
              </label>

              {errors.address && (
                <p className="text-red-600 text-sm mb-1">{errors.address}</p>
              )}

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter collection address"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Bin Type
              </label>

              {errors.binType && (
                <p className="text-red-600 text-sm mb-1">{errors.binType}</p>
              )}

              <select
                name="binType"
                value={form.binType}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Select bin type</option>
                <option value="General Waste">General Waste</option>
                <option value="Recycling">Recycling</option>
                <option value="Green Waste">Green Waste</option>
                <option value="Hard Rubbish">Hard Rubbish</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Collection Date
              </label>

              {errors.collectionDate && (
                <p className="text-red-600 text-sm mb-1">
                  {errors.collectionDate}
                </p>
              )}

              <input
                type="date"
                name="collectionDate"
                value={form.collectionDate}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Additional Notes
              </label>

              {errors.notes && (
                <p className="text-red-600 text-sm mb-1">{errors.notes}</p>
              )}

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className={`${inputStyle} min-h-24`}
                placeholder="Optional notes"
              />

              <p className="text-sm text-gray-500 mt-1">
                {form.notes.length}/150 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white p-3 rounded-lg font-bold hover:bg-green-800 transition disabled:bg-gray-400"
            >
              {loading ? "Calculating..." : "Submit Request"}
            </button>
          </form>
        </section>

        <section className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Request Summary
          </h2>

          <Image
            src="/trash-bin.png"
            alt="Trash Bin"
            width={180}
            height={180}
            className="mx-auto mb-6 rounded-xl"
          />

          <div className="space-y-4 text-gray-800">
            <p>
              <strong>Name:</strong> {form.name || "-"}
            </p>

            <p>
              <strong>Address:</strong> {form.address || "-"}
            </p>

            <p>
              <strong>Bin Type:</strong> {form.binType || "-"}
            </p>

            <p>
              <strong>Collection Date:</strong> {form.collectionDate || "-"}
            </p>

            <p>
              <strong>Notes:</strong> {form.notes || "No notes provided"}
            </p>

            {loading && (
              <p className="text-blue-600 font-semibold">
                Calculating collection price...
              </p>
            )}

            {apiError && (
              <p className="text-red-600 font-semibold">{apiError}</p>
            )}

            {price !== null && (
              <p className="text-lg font-bold text-green-700">
                Estimated Price: ${price}
              </p>
            )}

            {submitted && (
              <div className="mt-6 p-5 bg-green-100 border border-green-300 rounded-xl">
                <h3 className="font-bold text-lg text-green-800">
                  Request Submitted Successfully
                </h3>

                <p className="text-green-700 mt-2">
                  Your trash bin collection request has been scheduled.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-green-700 text-white text-center p-4">
        © 2026 Smart Trash Bin Collection Company
      </footer>
    </div>
  );
}
