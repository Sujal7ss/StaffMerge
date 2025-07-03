import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Building2,
  CheckCircle,
  Briefcase,
} from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  console.log(singleJob);
  const jobDetails = [
    {
      label: "Location",
      value: singleJob.location,
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Posted On",
      value: new Date(singleJob.createdAt).toLocaleDateString(),
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      label: "Job Type",
      value: singleJob.jobType,
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: "Salary",
      value: `${singleJob.salary} LPA`,
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      label: "Openings",
      value: singleJob.position,
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <Navbar />

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-600" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {singleJob.title}
                  </h1>
                  {singleJob.company?.name && (
                    <p className="text-gray-600 mt-1">
                      {singleJob.company.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1"
                >
                  {singleJob.position} Positions
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 px-3 py-1"
                >
                  {singleJob.jobType}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 px-3 py-1"
                >
                  {singleJob.salary} LPA
                </Badge>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button
                onClick={isApplied ? undefined : applyJobHandler}
                disabled={isApplied}
                size="lg"
                className={`w-full lg:w-auto px-8 py-3 text-base font-semibold transition-all duration-200 ${
                  isApplied
                    ? "bg-green-100 text-green-800 hover:bg-green-100 cursor-default"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Applied Successfully
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Job Description
            </h2>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-base">
                {singleJob.description}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/50 border border-gray-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                    {detail.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {detail.label}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {singleJob.applications && singleJob.applications.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Status
                </h3>
              </div>
              <p className="text-gray-600">
                This position has received{" "}
                <span className="font-semibold text-blue-600">
                  {singleJob.applications.length}
                </span>{" "}
                applications so far.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default JobDescription;
