"use client";
import CompanyCard from "@/components/Company/CompanyCard";
import TotalStats from "@/components/Company/TotalStats";
import { useDebounce } from "@/components/hooks/useDebounce";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

type SortField = "complaintRate" | "totalReviews";
type SortOrder = "asc" | "desc";

const CompanyPage = () => {
  const [sortField, setSortField] = useState<SortField>("complaintRate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500); // 500ms debounce

  const [totalStats, setTotalStats] = useState({
    averageComplaintRate: 0,
    totalCompanies: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const fetchTotalStats = async () => {
      const totalStatesReq = async () =>
        await axios.get(`${BASE_API_URL}/companies/total-stats`);
      const result = await handleRequest(totalStatesReq);
      if (result) {
        setTotalStats(result?.data?.data.stats);
      }
    };
    fetchTotalStats();
  }, []);

  useEffect(() => {
    const getCompanyStats = async () => {
      const sortParam =
        sortField === "totalReviews"
          ? `reviews_${sortOrder}`
          : `complaints_${sortOrder}`;

      const companyStatsReq = async () =>
        await axios.get(`${BASE_API_URL}/companies/stats`, {
          params: {
            page,
            limit,
            sort: sortParam,
            search: debouncedSearch,
          },
        });
      const result = await handleRequest(companyStatsReq, setIsLoading);

      if (result) {
        console.log(result);

        setCompanies(result.data.data.companies);
        setTotalPages(result.data.totalPages);
        setTotalCompanies(result.data.totalCompanies);
      }
    };

    getCompanyStats();
  }, [limit, page, sortField, sortOrder, debouncedSearch]);

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === "desc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder(field === "complaintRate" ? "desc" : "desc");
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Calculate if this is the last page
  const isLastPage = page * limit >= totalCompanies;

  return (
    <div className="sm:w-[80%] w-full p-8 mx-auto mb-8 mt-[8rem]">
      {/* Header */}
      <div>
        <h1 className="sm:text-3xl text-2xl font-bold text-gray-900 mb-2">
          Company Statistics
        </h1>
        <p className="text-gray-600">
          Detailed performance metrics based on customer reviews
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
        <TotalStats
          title="Total Companies"
          type="companies"
          value={totalStats.totalCompanies}
        />
        <TotalStats
          title="Total Reviews"
          type="reviews"
          value={totalStats.totalReviews}
        />
        <TotalStats
          title="Average Complaint Rate"
          type="complaints"
          value={`${totalStats.averageComplaintRate}%`}
        />
      </div>
      {/* Company Rankings */}
      <div className="mt-12">
        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="sm:text-2xl text-xl font-bold text-gray-900 mb-2">
              Company Performance Rankings
            </h2>
            <p className="text-gray-600">Click on metrics to sort companies</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border placeholder:text-base sm:placeholder:text-base border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={() => handleSort("complaintRate")}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                sortField === "complaintRate"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Complaint Rate
              {getSortIcon("complaintRate")}
            </button>
            <button
              onClick={() => handleSort("totalReviews")}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                sortField === "totalReviews"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Total Reviews
              {getSortIcon("totalReviews")}
            </button>
          </div>
        </div>
        {/* Company Cards */}
        {isLoading && (
          <div className="text-center">
            <Loader className="w-6 h-6 mx-auto animate-spin" />
          </div>
        )}
        {!isLoading && <CompanyCard companies={companies} />}

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              scrollToTop();
            }}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">Page {page}</span>
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
              scrollToTop();
            }}
            disabled={isLastPage}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
