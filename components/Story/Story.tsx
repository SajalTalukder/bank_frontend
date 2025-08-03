"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Send,
  Building2,
  User,
  Briefcase,
  FileText,
  Heart,
} from "lucide-react";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import { toast } from "sonner";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { CompanyType } from "@/type";

const ShareStory = () => {
  // State variables
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [formData, setFormData] = useState({
    vibe: "neutral",
    companyName: "",
    isAnonymous: false,
    name: "",
    userType: "individual customer",
    title: "",
    story: "",
  });

  //   Router for navigation
  const router = useRouter();

  //   Prepare company options for the select input
  const companyOptions = companies.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  //   vibe options for the select input

  const vibeOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative" },
  ];

  const userTypeOptions = [
    { value: "individual customer", label: "Individual Customer" },
    { value: "business customer", label: "Business Customer" },
    { value: "bank employee", label: "Bank Employee" },
    { value: "former employee", label: "Former Employee" },
    { value: "investor", label: "Investor" },
    { value: "other", label: "Other" },
  ];

  //   Function to fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      const companyReq = async () =>
        await axios.get(`${BASE_API_URL}/companies/all`);
      const result = await handleRequest(companyReq);
      if (result?.data.status === "success") {
        setCompanies(result.data.data.companies);
      }
    };

    fetchCompanies();
  }, []);

  //   Function to handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //   Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      vibe: formData.vibe,
      companyName: formData.companyName,
      isAnonymous: formData.isAnonymous,
      userType: formData.userType,
      title: formData.title,
      story: formData.story,
      ...(formData.isAnonymous ? {} : { name: formData.name }),
    };

    const shareStoryReq = async () =>
      await axios.post(`${BASE_API_URL}/reviews/create`, payload, {
        withCredentials: true,
      });

    const result = await handleRequest(shareStoryReq, setIsLoading);
    if (result?.data?.status === "success") {
      toast.success("Your Story Submitted successfully ! ");
      router.push("/reviews");
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Share Your Banking Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Vibe */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              <Heart className="inline w-4 h-4 mr-2" />
              Vibe
            </label>
            <Select
              name="vibe"
              options={vibeOptions}
              value={{
                value: formData.vibe,
                label:
                  formData.vibe.charAt(0).toUpperCase() +
                  formData.vibe.slice(1),
              }}
              onChange={(selected) =>
                setFormData({ ...formData, vibe: selected?.value || "neutral" })
              }
              isSearchable={false}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              <Building2 className="inline w-4 h-4 mr-2" />
              Company
            </label>
            <Select
              options={companyOptions}
              value={companyOptions.find(
                (opt) => opt.value === formData.companyName
              )}
              onChange={(selected) =>
                setFormData({ ...formData, companyName: selected?.value || "" })
              }
              placeholder="Select a company..."
              isSearchable
            />
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-700">Post anonymously</label>
          </div>

          {/* Name field – only show if not anonymous */}
          {!formData.isAnonymous && (
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <User className="inline w-4 h-4 mr-2" />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          )}

          {/* User Type */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              <Briefcase className="inline w-4 h-4 mr-2" />
              User Type
            </label>
            <Select
              name="userType"
              options={userTypeOptions}
              value={{
                value: formData.userType,
                label: formData.userType
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" "),
              }}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  userType: selected?.value || "individual customer",
                })
              }
              isSearchable
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              <FileText className="inline w-4 h-4 mr-2" />
              Story Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="One-line summary of your story"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Story */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              <FileText className="inline w-4 h-4 mr-2" />
              Story
            </label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              placeholder="Describe your experience..."
              rows={6}
              required
              className="w-full border px-3 py-2 rounded resize-vertical"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <LoadingButton
              isLoading={isLoading}
              type="submit"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
            >
              <span className="inline-flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Share Story
              </span>
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareStory;
