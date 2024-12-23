import { BASE_URL } from "..";
export const residential = {
  properties: `${BASE_URL}/odata/Property$query`,
  photos: `${BASE_URL}/odata/Media?$filter=ResourceRecordKey eq 'MLS' and MediaType eq 'image/jpeg'`,
  statistics: `https://rets.api.ca/residential/stats/$query`,
};

export const commercial = {
  properties: `${BASE_URL}/commercial/Properties/$query`,
  photos: `${BASE_URL}/commercialPhotos/MLS-index.jpeg`,
  statistics: `${BASE_URL}/commercial/stats/$query`,
};
