import createQueryHook from "@/core/core-query/helpers/createQueryHook";
import useAllEventsApiRest from "./useAllEventsApiRest";

const useAllEvents = createQueryHook({
  environment: "DEVELOPMENT",
  hookFactory: [
    {
      environments: ["DEVELOPMENT", "PRODUCTION"],
      hook: useAllEventsApiRest
    }
  ]
});
export default useAllEvents;
