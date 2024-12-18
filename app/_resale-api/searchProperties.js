import { residential } from "./routes/fetchRoutes";

export const searchProperties = async (inputValue) => {
  const response = await fetch(
    residential.properties.replace("$query", "?$search=") + inputValue
  );
  const searchedProperties = await response.json();
  return searchedProperties.results;
};
