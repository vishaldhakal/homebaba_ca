import Image from "next/image";
import Map from "@/components/Map";

const ProjectLocation = ({ projectName, address, latitude, longitude }) => {
  return (
    <div className="py-6">
      <div className="mt-5 flex items-center gap-2 mb-6">
        <Image
          src="/icons/home_address.png"
          alt="Walking icon"
          height={44}
          width={44}
        />
        <h2 className="text-[1rem] font-[700]">
          Project Location - {projectName}
        </h2>
      </div>

      <div className="rounded-lg overflow-hidden">
        <Map
          latitudeval={latitude}
          longitudeval={longitude}
          title={projectName}
          address={address}
          heightt="400px"
        />
      </div>
      <p className="text-xs text-gray-500 mb-2 mt-1">
        Note : The exact location of the project may be vary from the address
        shown here
      </p>
    </div>
  );
};

export default ProjectLocation;
