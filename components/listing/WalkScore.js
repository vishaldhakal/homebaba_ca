import Image from "next/image";
const WalkScore = ({ projectName, address }) => {
  const formatAddress = (addr) => {
    return addr.replace(/\s+/g, "-").toLowerCase();
  };

  return (
    <div className="pb-6 mb-8">
      <div className="mb-10 flex items-center gap-2">
        <Image src="/walking.png" alt="Walking icon" height={44} width={44} />
        <h2 className="text-[1rem] font-[700]">Walk Score for {projectName}</h2>
      </div>

      <div className="rounded-lg overflow-hidden">
        <iframe
          height="500"
          title="Walk Score"
          className="w-full"
          src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&s=${formatAddress(
            address
          )}&o=h&c=f&h=500&fh=0&w=737`}
        />
      </div>
    </div>
  );
};

export default WalkScore;
