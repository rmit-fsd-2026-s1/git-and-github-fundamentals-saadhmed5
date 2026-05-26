"use client";

import { useState } from "react";
import Image from "next/image";
import { calculateWeatherService } from "./services/weatherApi";
import { useWeather } from "./context/WeatherContext";

type FormData = {
  fullName: string;
  email: string;
  location: string;
  weatherService: string;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  location?: string;
  weatherService?: string;
};

export default function Home() {
  const { result, setResult } = useWeather();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    location: "",
    weatherService: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.location.trim() === "") {
      newErrors.location = "Location is required";
    }

    if (formData.weatherService === "") {
      newErrors.weatherService = "Please select a weather service";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setApiError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const data = await calculateWeatherService(formData);

      setResult({
        status: data.status,
        price: data.price,
      });
    } catch (error) {
      setApiError(
        "Unable to calculate weather service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col text-black">
      {/* HEADER */}
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">
          Weather Service Company
        </h1>

        <p className="text-center mt-2">
          Request accurate weather information quickly
          and easily
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {/* LEFT SIDE */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Weather Request Form
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Full Name */}
            <div>
              <label className="block font-semibold mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter your name"
              />

              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-1">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter city or suburb"
              />

              {errors.location && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Weather Service */}
            <div>
              <label className="block font-semibold mb-1">
                Weather Service
              </label>

              <select
                name="weatherService"
                value={formData.weatherService}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">
                  Select a service
                </option>

                <option value="daily">
                  Daily Forecast
                </option>

                <option value="weekly">
                  Weekly Forecast
                </option>

                <option value="storm">
                  Storm Warning
                </option>
              </select>

              {errors.weatherService && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.weatherService}
                </p>
              )}
            </div>

            {/* API ERROR */}
            {apiError && (
              <p className="text-red-600 font-semibold">
                {apiError}
              </p>
            )}

            {/* BUTTON WITH SPINNER */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:bg-gray-400 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Calculating...
                </>
              ) : (
                "Calculate Weather Service"
              )}
            </button>
          </form>
        </section>

        {/* RIGHT SIDE */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Weather Summary
          </h2>

          <div className="flex justify-center mb-6">
            <Image
              src="/weather.png"
              alt="Weather"
              width={320}
              height={220}
              className="rounded-xl shadow-md"
            />
          </div>

          <p className="text-gray-700 text-center mb-4">
            Your weather service result will appear
            here after the API calculates the request.
          </p>

          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
            <p>
              <strong>Status:</strong>{" "}
              {loading
                ? "Calculating..."
                : result.status}
            </p>

            <p>
              <strong>Estimated Price:</strong> $
              {result.price.toFixed(2)}
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-700 text-white text-center p-4">
        © 2026 Weather Service Company
      </footer>
    </div>
  );
}
