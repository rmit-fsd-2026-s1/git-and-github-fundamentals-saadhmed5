export type WeatherRequest = {
  fullName: string;
  email: string;
  location: string;
  weatherService: string;
};

export type WeatherResponse = {
  status: string;
  price: number;
};

export async function calculateWeatherService(
  requestData: WeatherRequest
): Promise<WeatherResponse> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    await response.json();

    // Fake pricing logic for practice
    let price = 0;

    if (requestData.weatherService === "daily") {
      price = 10;
    } else if (
      requestData.weatherService === "weekly"
    ) {
      price = 25;
    } else if (
      requestData.weatherService === "storm"
    ) {
      price = 40;
    }

    return {
      status: "Success",
      price,
    };
  } catch (error) {
    throw new Error(
      "Unable to connect to weather service"
    );
  }
}