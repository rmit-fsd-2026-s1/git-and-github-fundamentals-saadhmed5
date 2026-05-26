export type WeatherFormData = {
  fullName: string;
  email: string;
  location: string;
  weatherService: string;
};

export type WeatherFormErrors = {
  fullName?: string;
  email?: string;
  location?: string;
  weatherService?: string;
};

export function validateWeatherForm(
  formData: WeatherFormData
): WeatherFormErrors {
  const errors: WeatherFormErrors = {};

  if (formData.fullName.trim() === "") {
    errors.fullName = "Full name is required";
  }

  if (formData.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "Please enter a valid email";
  }

  if (formData.location.trim() === "") {
    errors.location = "Location is required";
  }

  if (formData.weatherService === "") {
    errors.weatherService = "Please select a weather service";
  }

  return errors;
}