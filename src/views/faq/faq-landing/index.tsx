
import { FaqLandingHeader } from "./faq-header";
import { PopularTopics } from "./popular-topics";
import data from "../../../data/faq/popular-topics.json"
import { AllTopics } from "./all-topics";
import data2 from "@/data/faq/tabs.json";
import { PopularTopicsLinks } from "./popular-topics-links";
import data3 from "@/data/faq/popular-topics-links.json";
import { ReadMore } from "./read-more";
import data4 from "@/data/faq/read-more.json";

export const FaqLandingView = () => {
  return (
    <>
      <FaqLandingHeader />
      <PopularTopics data={data} />
      <AllTopics data={data2}/>
      <PopularTopicsLinks className="max-w-[1248px] md:px-6 px-4 mx-auto" parentClass="lg:py-12 md:py-10 py-6" data={data3.popularTopicsData}/>
      <ReadMore data={data4}/>
    </>
  );
};22
