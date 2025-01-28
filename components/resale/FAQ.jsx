"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = ({ main_data }) => {
  return (
    <>
      <h2 className="font-semibold pb-3 text-2xl sm:text-4xl mb-4">
        Some information about this property - {main_data?.Street}{" "}
        {main_data.StreetName} {main_data.StreetSuffix}
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            What type of property is this?
          </AccordionTrigger>
          <AccordionContent className="text-left">
            This is a {main_data.PropertySubType.toLowerCase()} home.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            How many bedrooms and bathrooms does this property have?
          </AccordionTrigger>
          <AccordionContent className="text-left">
            This property has {main_data.BedroomsTotal} bedrooms and{" "}
            {main_data.BathroomsTotalInteger} bathrooms.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            How many parking spaces are available?
          </AccordionTrigger>
          <AccordionContent className="text-left">
            There are {main_data.ParkingSpaces} parking spaces.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">
            Where is this property located?
          </AccordionTrigger>
          <AccordionContent className="text-left">
            This property is located in{" "}
            {main_data.Community ? main_data.Community : ""}{" "}
            {main_data?.StreetNumber} {main_data?.StreetName}{" "}
            {main_data?.StreetSuffix}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default FAQ;
