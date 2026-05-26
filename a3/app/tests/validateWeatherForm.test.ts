import { validateWeatherForm } from "../utils/validateWeatherForm";

describe("validateWeatherForm", () => {
  test("returns errors when all fields are empty", () => {
    // This test checks that the validation logic correctly detects
    // missing required fields before the form can be submitted.
    const result = validateWeatherForm({
      fullName: "",
      email: "",
      location: "",
      weatherService: "",
    });

    expect(result.fullName).toBe("Full name is required");
    expect(result.email).toBe("Email is required");
    expect(result.location).toBe("Location is required");
    expect(result.weatherService).toBe(
      "Please select a weather service"
    );
  });

  test("returns email error when email format is invalid", () => {
    // This test checks the email validation rule by providing
    // an email value without the @ symbol.
    const result = validateWeatherForm({
      fullName: "John Smith",
      email: "johnemail.com",
      location: "Melbourne",
      weatherService: "daily",
    });

    expect(result.email).toBe("Please enter a valid email");
  });

  test("returns no errors when form data is valid", () => {
    // This test confirms that valid form data passes validation
    // and produces an empty errors object.
    const result = validateWeatherForm({
      fullName: "John Smith",
      email: "john@email.com",
      location: "Melbourne",
      weatherService: "weekly",
    });

    expect(result).toEqual({});
  });
});