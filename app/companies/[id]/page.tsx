import CompanyDetails from "@/components/Company/CompanyDetails";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const CompanyDetailsPage = async ({ params }: Props) => {
  const id = (await params).id;
  return <CompanyDetails id={id} />;
};

export default CompanyDetailsPage;
