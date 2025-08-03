import { CompanyType } from "@/type";
import { TrendingDown, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  companies: CompanyType[];
};

const CompanyCard = ({ companies }: Props) => {
  const router = useRouter();

  // const getVibeColor = (vibe: string) => {
  //   switch (vibe) {
  //     case "positive":
  //       return "bg-green-100 text-green-800 border-green-200";
  //     case "negative":
  //       return "bg-red-100 text-red-800 border-red-200";
  //     default:
  //       return "bg-yellow-100 text-yellow-800 border-yellow-200";
  //   }
  // };

  const getComplaintRateColor = (rate: number) => {
    if (rate > 35) return "text-red-600 bg-red-50";
    if (rate > 25) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {companies.map((company, index) => {
        return (
          <div
            key={company._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group"
          >
            {/* Rank Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg">
                  {index + 1}
                </div>
                {/* <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getVibeColor(
                    company.vibe
                  )}`}
                >
                  {company.vibe}
                </span> */}
              </div>
            </div>

            {/* Company Name */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {company.name}
              </h3>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Total Reviews
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {company.totalReviews}
                </p>
              </div>

              <div
                className={`rounded-lg p-3 ${getComplaintRateColor(
                  company.complaintRate
                )}`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Complaint Rate
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  {company.complaintRate.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Review Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium text-gray-700">
                    Positive
                  </span>
                </div>
                <span className="text-sm font-bold text-green-600">
                  {company.positiveCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                  <span className="text-xs font-medium text-gray-700">
                    Neutral
                  </span>
                </div>
                <span className="text-sm font-bold text-yellow-600">
                  {company.nutralCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium text-gray-700">
                    Negative
                  </span>
                </div>
                <span className="text-sm font-bold text-red-600">
                  {company.negativeCount}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Positive Ratio</span>
                  <span>
                    {company.totalReviews > 0
                      ? `${(
                          (company.positiveCount / company.totalReviews) *
                          100
                        ).toFixed(1)}%`
                      : "0.0%"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width:
                        company.totalReviews > 0
                          ? `${
                              (company.positiveCount / company.totalReviews) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div
              onClick={() => {
                router.push(`/companies/${company._id}`);
              }}
              className="mt-6 pt-4 border-t border-gray-100"
            >
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyCard;
