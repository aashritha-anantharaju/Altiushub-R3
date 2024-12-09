import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileUpdate() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: "",
    address: "",
    email: "",
    profile_image: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const currentUser = database.find(
      (user) => user.email === currentUserEmail
    );
    if (currentUser) {
      setProfile({
        full_name: currentUser.full_name || "",
        address: currentUser.address || "",
        email: currentUser.email,
        profile_image: currentUser.profile_image || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPEG and PNG images are allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profile_image: reader.result,
        }));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.full_name.trim()) {
      newErrors.full_name = "Full Name is required.";
    }
    if (!profile.address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!profile.email.trim()) {
      newErrors.email = "Email is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const updatedDatabase = database.map((user) => {
      if (user.email === currentUserEmail) {
        return {
          ...user,
          full_name: profile.full_name,
          address: profile.address,
          email: profile.email,
          profile_image: profile.profile_image,
        };
      }
      return user;
    });
    localStorage.setItem("database", JSON.stringify(updatedDatabase));
    localStorage.setItem("current_user_email", profile.email);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          value={profile.full_name}
          onChange={handleChange}
        />
        {errors.full_name && <p style={{ color: "red" }}>{errors.full_name}</p>}
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={profile.address}
          onChange={handleChange}
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={profile.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="profile_image">Profile Image</label>
        <input
          type="file"
          name="profile_image"
          id="profile_image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {profile.profile_image && (
          <div>
            <img
              src={profile.profile_image}
              alt="Profile Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default ProfileUpdate;
