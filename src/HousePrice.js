import { useState } from "react";
import './HousePrice.css';

function HousePrice() {
    
    const [error, setError] = useState("");
    const [prediction, setPrediction] = useState("");

    const [formData, setFormData] = useState({
        city: "",
        province: "",
        latitude: "",
        longitude: "",
        leaseTerm: "",
        houseType: "",
        beds: "",
        baths: "",
        squareFeet: "",
        furnishing: "Unfurnished",
        smoking: "No",
        pets: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const pushSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            city: formData.city,
            province: formData.province,
            latitude: formData.latitude,
            longitude: formData.longitude,
            lease_term: formData.leaseTerm,
            type: formData.houseType,
            beds: formData.beds,
            baths: formData.baths,
            sq_feet: formData.squareFeet,
            furnishing: formData.furnishing,
            smoking: formData.smoking,
            pets: formData.pets,
        };

        try {
            
            const response = await fetch('http://localhost:5000/house_price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok){
                setPrediction(`Predicted Rental Price: $${result.predicted_price}`);
            } else if (!response.ok){
                setError(result.message || "Error predicting house price.");
            }

        } catch (error) {
            setError("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={pushSubmit}>
            <label>
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
            <label>
                Province:
                <input type="text" name="province" value={formData.province} onChange={handleChange} required />
            </label>
            <label>
                Latitude:
                <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} required />
            </label>
            <label>
                Longitude:
                <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} required />
            </label>
            <label>
                Lease Term:
                <input type="text" name="leaseTerm" value={formData.leaseTerm} onChange={handleChange} required />
            </label>
            <label>
                Type of House:
                <input type="text" name="houseType" value={formData.houseType} onChange={handleChange} required />
            </label>
            <label>
                Number of Beds:
                <input type="number" name="beds" value={formData.beds} onChange={handleChange} required />
            </label>
            <label>
                Number of Baths:
                <input type="number" name="baths" value={formData.baths} onChange={handleChange} required />
            </label>
            <label>
                Square Feet:
                <input type="number" name="squareFeet" value={formData.squareFeet} onChange={handleChange} required />
            </label>
            <label>
                Furnishing:
                <select name="furnishing" value={formData.furnishing} onChange={handleChange} required>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Partially Furnished">Partially Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                </select>
            </label>
            <label>
                Smoking:
                <select name="smoking" value={formData.smoking} onChange={handleChange} required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </label>
            <label>
                Pets:
                <input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
            {prediction && <p>{prediction}</p>}
            {error && <p className="error-message">{error}</p>}

        </form>
    );
}

export default HousePrice;