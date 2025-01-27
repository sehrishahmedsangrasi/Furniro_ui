'use client';
import React, { useState } from "react";

const Form = () => {
  // State to store form data, including personal and location details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "", 
    streetAddress: "",
    city: "",
    province: "", 
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  // State to manage available provinces based on selected country
  const [provinces, setProvinces] = useState<string[]>([]);

  // State to toggle visibility of the 'Additional Info' input field
  const [isAdditionalInfoVisible, setAdditionalInfoVisible] = useState<boolean>(false);

  // Array containing countries and their corresponding provinces
  const countries = [
    { name: "Sri Lanka", provinces: ["Western", "Central", "Southern", "Northern", "Eastern"] },
    { name: "Pakistan", provinces: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"] },
    { name: "India", provinces: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Karnataka"] },
    { name: "United States", provinces: ["California", "Texas", "Florida", "New York", "Illinois"] },
    { name: "Palestine", provinces: ["West Bank", "Gaza Strip"] },
    { name: "Australia", provinces: ["New South Wales", "Victoria", "Queensland", "South Australia"] },
    { name: "Canada", provinces: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"] },
    { name: "United Kingdom", provinces: ["England", "Scotland", "Wales", "Northern Ireland"] },
    { name: "Germany", provinces: ["Bavaria", "Berlin", "Hamburg", "Hesse", "Saxony"] },
    { name: "France", provinces: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes"] },
    { name: "South Africa", provinces: ["Eastern Cape", "Western Cape", "KwaZulu-Natal", "Gauteng"] },
    { name: "Brazil", provinces: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"] },
  ];

  // Handler for when country selection changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const country = countries.find((country) => country.name === selectedCountry);

    if (country && Array.isArray(country.provinces)) {
      setProvinces(country.provinces);
      setFormData(prevFormData => ({
        ...prevFormData,
        country: selectedCountry,
        province: country.provinces[0], // Set default province based on selected country
      }));
    } else {
      setProvinces([]); // Clear provinces if country doesn't have any
      setFormData(prevFormData => ({
        ...prevFormData,
        country: selectedCountry,
        province: "", // Set province to empty if country doesn't have provinces
      }));
    }
  };

  // Handler for general input change (text or select)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for changes to the 'Additional Info' field
  const handleAdditionalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      additionalInfo: value,
    }));
  };

  // Function to validate the form inputs
  const validateForm = () => {
    const { firstName, lastName, email, zipCode, phone } = formData;

    // Check if required fields are filled
    if (!firstName || !lastName) {
      alert("First Name and Last Name are required.");
      return false;
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }

    // Validate zip code format (5-digit)
    const zipCodeRegex = /^[0-9]{5}$/;
    if (!zipCode || !zipCodeRegex.test(zipCode)) {
      alert("Please enter a valid 5-digit zip code.");
      return false;
    }

    // Validate phone number format (10-digit)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return false;
    }

    return true; // Return true if all validations pass
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      // Handle form submission logic here
      // Reset form data after submission
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        streetAddress: "",
        city: "",
        province: "",
        zipCode: "",
        phone: "",
        email: "",
        additionalInfo: "",
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="font-bold text-4xl mb-8 ">Billing Details</div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name and Last Name in the same div */}
        <div className="space-y-4">
          <div className="text-lg font-semibold">First Name <span className="pl-[11.7rem]">Last Name</span> </div>
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border p-3 rounded-lg w-full"
              required
            />
          </div>
        </div>

        {/* Other fields: Company Name, Street Address, City, Zip Code, Phone, Email */}
        {[ 
          { label: "Company Name (optional)", name: "companyName",pl:"" },
          { label: "Street Address", name: "streetAddress",pl:"" },
          { label: "City", name: "city" ,pl:""},
          { label: "Zip Code", name: "zipCode",pl:"12345" },
          { label: "Phone", name: "phone",pl:"0123456789" },
          { label: "Email Address", name: "email",pl:"" },
        ].map((field) => (
          <div className="space-y-4" key={field.name}>
            <div className="text-lg font-semibold">{field.label}</div>
            <input
              type="text"
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              placeholder={field.pl}
              onChange={handleInputChange}
              className="border p-3 rounded-lg w-full"
              required
            />
          </div>
        ))}

        {/* Location Details (Country and Province) */}
        <div className="space-y-4">
          <div className="text-xl font-semibold">Location Details</div>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className="border p-3 rounded-lg w-full "
          >
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

          <select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="border p-3 rounded-lg w-full"
            disabled={!provinces.length}
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Info Section */}
        {isAdditionalInfoVisible && (
          <div className="space-y-4">
            <label className="text-lg font-semibold">Additional Info</label>
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleAdditionalInfoChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        )}

        {/* Toggle button for Additional Info visibility */}
        <div
          className="border p-4 rounded-lg cursor-pointer"
          onClick={() => setAdditionalInfoVisible(!isAdditionalInfoVisible)}
        >
          {isAdditionalInfoVisible ? "Hide Additional Info" : "Show Additional Info"}
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full text-black border border-black bg-white py-3 rounded-lg"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default Form;
