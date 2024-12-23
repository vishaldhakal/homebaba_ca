"use server";
import { commercial, residential } from "./routes/fetchRoutes";
// import { houseType, saleLease } from "@/constant";

export const getSalesData = async (offset, limit, city, listingType) => {
  try {
    let filterQuery = `${
      city && `CountyOrParish eq '${city || ""}' and `
    }TransactionType eq 'For Sale'`;
    // const lowriseOnly = `TypeOwnSrch='.S.',TypeOwnSrch='.D.',TypeOwnSrch='.A.',TypeOwnSrch='.J.',TypeOwnSrch='.K.'`;
    const queriesArray = [
      `$filter=${filterQuery}`,
      `$skip=${offset}`,
      `$top=${limit}`,
    ];

    const url = residential.properties.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNTYyNiIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzM0NzEzNzEyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI1NjI2IiwianRpIjoiZTQ5ZmYyNjY5N2E5YWFlZSIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.6qvzbyO-NvwTKwKj2mD4dZvtuJeQrDUU8xmanTuZFnQ`,
      },
    };

    if (listingType) {
      filterQuery += ` and PropertySubType eq ${listingType}`;
    }
    console.log(url);
    const res = await fetch(url, options);
    const data = await res.json();
    return data.value[0];
  } catch (error) {
    console.error(error);
    throw new Error(`An error happened in getSalesData: ${error}`);
  }
};

export const getFilteredRetsData = async (queryParams) => {
  // const lowriseOnly = `TypeOwnSrch='.S.',TypeOwnSrch='.D.',TypeOwnSrch='.A.',TypeOwnSrch='.J.',TypeOwnSrch='.K.'`;
  try {
    //all the necessary queries possible
    let selectQuery = `${
      queryParams.city ? `CountyOrParish eq '${queryParams.city}'` : ""
    }${
      queryParams.saleLease
        ? `${queryParams.city ? " and " : ""}TransactionType eq '${
            queryParams.saleLease
          }'`
        : ""
    }${
      queryParams.bed
        ? `${queryParams.bed ? " and " : ""}Bedrooms eq ${queryParams.bed}`
        : ""
    }`;
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    let rangeQuery =
      queryParams.minListPrice || queryParams.washroom
        ? `and ListPrice le ${queryParams.minListPrice} and Washrooms le ${queryParams.washroom}`
        : "";

    if (queryParams.houseType) {
      const houseTypeQuery = ` and PropertySubType eq 'value'`;
      queryParams.houseType.forEach((param, index) => {
        selectQuery += houseTypeQuery.replace("value", param);
        if (index !== queryParams.houseType.length - 1) {
          selectQuery += "";
        }
      });
    }

    if (queryParams.hasBasement) {
      selectQuery += `and Basement1=Apartment`;
    }

    if (queryParams.sepEntrance) {
      selectQuery += `and Basement2=Sep Entrance`;
    }
    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += ` and ListPrice gt ${queryParams.maxListPrice}`;
    }

    if (queryParams.priceDecreased) {
      selectQuery += `,PriceDecreased=true`;
    }
    let url = "";

    if (queryParams.propertyType == "commercial") {
      url = commercial.properties.replace(
        "$query",
        `?$filter=${selectQuery}${rangeQuery}&$skip=${skipQuery}&$top=${limitQuery}`
      );
    } else {
      url = residential.properties.replace(
        "$query",
        `?$filter=${selectQuery} ${rangeQuery}&$skip=${skipQuery}&$top=${limitQuery}`
      );
    }
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNTYyNiIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzM0NzEzNzEyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI1NjI2IiwianRpIjoiZTQ5ZmYyNjY5N2E5YWFlZSIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.6qvzbyO-NvwTKwKj2mD4dZvtuJeQrDUU8xmanTuZFnQ`,
      },
      // cache: "no-store",
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      // Check if the response is OK (status in the range 200-299)
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.value;
  } catch (error) {
    throw new Error(`An error happened in getFilteredRetsData: ${error}`);
  }
};

export const getImageUrls = async ({ MLS }) => {
  if (MLS) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNTYyNiIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzM0NzEzNzEyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI1NjI2IiwianRpIjoiZTQ5ZmYyNjY5N2E5YWFlZSIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.6qvzbyO-NvwTKwKj2mD4dZvtuJeQrDUU8xmanTuZFnQ`,
      },
      // cache: "no-store",
    };
    const response = await fetch(
      residential.photos.replace("MLS", MLS),
      options
    );
    const jsonResponse = await response.json();
    const urls = jsonResponse.value.map((data) => data.MediaURL);
    return urls;
  }
};

export const fetchDataFromMLS = async (listingID) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNTYyNiIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzM0NzEzNzEyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI1NjI2IiwianRpIjoiZTQ5ZmYyNjY5N2E5YWFlZSIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.6qvzbyO-NvwTKwKj2mD4dZvtuJeQrDUU8xmanTuZFnQ`,
      },
    };
    const queriesArray = [`$filter=ListingKey eq '${listingID}'`];
    const urlToFetchMLSDetail = residential.properties.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    console.log(urlToFetchMLSDetail);
    const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
    const data = await resMLSDetail.json();
    return data.value[0];
  } catch (err) {
    console.log(err);
  }
};

export const fetchStatsFromMLS = async ({
  listingType,
  municipality,
  saleLease,
}) => {
  const options = {
    method: "GET",
  };
  const queriesArray = [
    `$select=Municipality=${municipality},TypeOwnSrch=${listingType},SaleLease=${saleLease
      .split(" ")[1]
      .toLowerCase()}`,
    `$metrics=avg,median,sd`,
  ];
  const urlToFetchMLSDetail = residential.statistics.replace(
    "$query",
    `?${queriesArray.join("&")}`
  );
  console.log(urlToFetchMLSDetail);
  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results;
};
