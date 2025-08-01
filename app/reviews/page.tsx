"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Filter } from "lucide-react";
import { Review } from "@/type";
import { BASE_API_URL } from "@/server";
import { useRouter } from "next/navigation";

const ReviewsPage = () => {
  const [company, setCompany] = useState("");
  const [vibe, setVibe] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/reviews/all`, {
        params: {
          companyName: company,
          vibe,
          search,
          sort,
          page,
        },
      });

      setReviews(res.data.data.reviews);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [company, vibe, search, sort, page]);

  return (
    <div>
      <div className="w-[80%] mx-auto mt-[10rem]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
          <p className="text-gray-600">Customer feedback and experiences</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by Company Name"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vibe
              </label>
              <select
                value={vibe}
                onChange={(e) => {
                  setVibe(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search reviews..."
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Header & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Public Reviews
            </h2>
            <p className="text-gray-600">Showing {reviews.length} reviews</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <button
              onClick={() => {
                router.push("/share-story");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:scale-105 transition-all"
            >
              Write Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{review.title}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    review.vibe === "positive"
                      ? "bg-green-100 text-green-700"
                      : review.vibe === "negative"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {review.vibe}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {review.isAnonymous ? review.anonymousId : review.name} -{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-800">{review.story}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 mb-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
