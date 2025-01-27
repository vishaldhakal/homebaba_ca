import { ChartNoAxesCombined } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Statistics from "./Statistics";

const MarketDataButton = ({ city, propertyType }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`mx-[2px] px-2 sm:px-3 h-8 border-[#b2b2b2] border-[1px] tracking-[0.01125] cursor-pointer text-nowrap flex justify-center items-center rounded-full hover:shadow-lg text-xs font-semibold
             bg-[#fcdaf4] text-black
             `}
      >
        {/* <div className="p-4 rounded-lg flex flex-col space-y-4 justify-center"> */}
        Market Data
        <ChartNoAxesCombined className="w-3 h-3 mr-1" />
        {/* </div> */}
      </DialogTrigger>
      <DialogContent className="z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <div className="flex items-center">
              <img src="/maple-leaf.svg" className="w-4 h-4 mr-2"></img>
              <h2 className="tracking-wide font-semibold uppercase text-lg">
                HOMEBABA DATA INTELLIGENCE
              </h2>
            </div>
          </DialogTitle>
          <DialogDescription>
            <Statistics city={city} propertyType={propertyType} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MarketDataButton;
