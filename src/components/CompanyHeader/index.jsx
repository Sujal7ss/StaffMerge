import img from "../../assets/intel.png";
import Button from "../../components/Button"; 

export default function CompanyHeader({companyName, role}) {
  return (
    <div className="flex flex-row justify-between border h-44 mt-4 bg-slate-50 items-center">
      <div className="job-data  flex flex-row w-fit">
        <img src={img} alt="companies logo" className="w-14 ml-20 mr-9" />
        <div className="title flex flex-col ">
          <h3 className="title text-4xl font-bold">{companyName}</h3>
          <p className="text-slate-400">{role}</p>
        </div>
      </div>
      <Button className={"mr-20"} style={"bg-C0DFED"}>Apply Now</Button>
    </div>
  );
}
