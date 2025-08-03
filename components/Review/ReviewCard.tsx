"use client";
import { Review } from "@/type";
import { Calendar, ChevronDown, ChevronUp, User } from "lucide-react";
import React, { useState } from "react";

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldShowSeeMore = review?.story?.length > maxLength;

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case "positive":
        return "text-green-700 bg-green-100 border-green-200";
      case "negative":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
    }
  };

  const displayContent =
    shouldShowSeeMore && !isExpanded
      ? review.story.substring(0, maxLength) + "..."
      : review.story;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <div className="flex flex-wrap  items-center space-x-3 mb-3">
            <h3 className="sm:text-xl text-lg font-bold text-gray-900">
              {review.companyName}
            </h3>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full border ${getVibeColor(
                review.vibe
              )}`}
            >
              {review.vibe}
            </span>
          </div>
        </div>
      </div>

      {/* Review Title */}
      <h4 className="sm:text-lg text-base font-semibold text-gray-800 mb-4 leading-relaxed">
        {review.title}
      </h4>

      {/* Review Content */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm sm:text-base  leading-relaxed">
          {displayContent}
        </p>

        {shouldShowSeeMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm sm:text-base"
          >
            <span>{isExpanded ? "See Less" : "See More"}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="w-4 h-4" />
          <span className="font-medium text-sm sm:text-base">
            {review?.name || review?.anonymousId}
          </span>
        </div>
        <div className="flex items-center text-sm sm:text-base space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Helpful Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <span className="text-sm">👍</span>
              <span className="text-sm font-medium">Helpful</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
              <span className="text-sm">🚩</span>
              <span className="text-sm font-medium">Report</span>
            </button>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            View Company Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
