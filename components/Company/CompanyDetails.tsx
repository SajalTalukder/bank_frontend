"use client";
import { BASE_API_URL } from "@/server";
import { CompanyType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleRequest } from "../utils/apiRequest";
import {
  Building2,
  Loader,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import ReviewCard from "../Review/ReviewCard";

type Props = {
  id: string;
};

const CompanyDetails = ({ id }: Props) => {
  const [company, setCompany] = useState<CompanyType>();
  const [isLoading, setIsLoading] = useState(false);

  const total = company?.totalReviews || 0;

  const positivePercent =
    total === 0 ? 0 : ((company?.positiveCount || 0) / total) * 100;

  const neutralPercent =
    total === 0 ? 0 : ((company?.nutralCount || 0) / total) * 100;

  const negativePercent =
    total === 0 ? 0 : ((company?.negativeCount || 0) / total) * 100;

  const getComplaintRateColor = (rate: number) => {
    if (rate > 35) return "text-red-600 bg-red-50 border-red-200";
    if (rate > 25) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const companyDetailsReq = async () =>
        await axios.get(`${BASE_API_URL}/companies/${id}`);
      const result = await handleRequest(companyDetailsReq, setIsLoading);
      if (result) {
        setCompany(result.data.data.company);
      }
    };
    fetchCompanyDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-[8rem] w-[80%] mx-auto">
      <div className=" p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {company?.name}
            </h2>
            {/* <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getVibeColor(
                company.vibe
              )} mt-1`}
            >
              {company.vibe} vibe
            </span> */}
          </div>
        </div>
      </div>
      {/* content */}
      <div className="p-8">
        {/* Key matrix */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Total Reviews
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {company?.totalReviews}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Positive Reviews
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {company?.positiveCount}
              </p>
              <p className="text-sm text-green-700">
                {positivePercent}% of total
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-yellow-500 rounded-full" />
                <span className="text-sm font-medium text-yellow-800">
                  Neutral Reviews
                </span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">
                {company?.nutralCount}
              </p>
              <p className="text-sm text-yellow-700">
                {neutralPercent}% of total
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Negative Reviews
                </span>
              </div>
              <p className="text-2xl font-bold text-red-900">
                {company?.negativeCount}
              </p>
              <p className="text-sm text-red-700">
                {negativePercent}% of total
              </p>
            </div>
          </div>
        </div>

        {/* Complaint Rate Analysis */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Complaint Rate Analysis
          </h3>
          <div
            className={`rounded-lg p-6 border ${getComplaintRateColor(
              company?.complaintRate || 0
            )}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold">
                  {company?.complaintRate.toFixed(1)}%
                </p>
                <p className="text-sm font-medium">Current Complaint Rate</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {(company?.complaintRate ?? 0) <= 20
                    ? "Excellent"
                    : (company?.complaintRate ?? 0) <= 30
                    ? "Good"
                    : (company?.complaintRate ?? 0) <= 40
                    ? "Fair"
                    : "Needs Improvement"}
                </p>
                <p className="text-sm">Performance Rating</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  (company?.complaintRate ?? 0) <= 20
                    ? "bg-green-500"
                    : (company?.complaintRate ?? 0) <= 30
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(company?.complaintRate ?? 0, 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              Industry average: 25-35% | Excellent: &lt;20% | Good: 20-30% |
              Fair: 30-40%
            </p>
          </div>
        </div>
        {/* Review Distribution Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Review Distribution
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">
                    Positive Reviews
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${positivePercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {positivePercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">
                    Neutral Reviews
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${neutralPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {neutralPercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">
                    Negative Reviews
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${negativePercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {negativePercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* All Reviews */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            All Reviews
          </h3>
          {!company?.reviews ||
            (company.reviews.length === 0 && (
              <p className="text-gray-600">
                No reviews available for this company.
              </p>
            ))}

          {company?.reviews && company.reviews.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {company?.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
