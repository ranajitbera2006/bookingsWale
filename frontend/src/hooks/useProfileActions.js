
import { useState } from "react";
import toast from "react-hot-toast";

export const useGetProfile = () => {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error || (data.message && !res.ok)) {
        throw new Error(data.error || data.message || "Failed to load profile");
      }
      setProfile(data);
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setLoadingProfile(false);
    }
  };

  return { loadingProfile, profile, setProfile, getProfile };
};

export const useUpdateProfile = () => {
  const [loadingUpProfile, setLoadingUpProfile] = useState(false);

  const updateProfile = async (profileData) => {
    setLoadingUpProfile(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error || (data.message && !res.ok)) {
        throw new Error(
          data.error || data.message || "Failed to update profile",
        );
      }
      toast.success("Profile updated successfully!");
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setLoadingUpProfile(false);
    }
  };

  return { loadingUpProfile, updateProfile };
};
