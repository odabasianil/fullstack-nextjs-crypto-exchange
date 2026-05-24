import Image from "next/image";
import Link from "next/link";

interface Guide {
  id: number;
  title: string;
  image: string;
  link: string;
  description: string;
}

interface GuidesResourcesProps {
  data: {
    guides: Guide[];
  };
}

const GuidesResources: React.FC<GuidesResourcesProps> = ({ data }) => {
  return (
    <div>
      <div className="lg:mt-[120px] lg:mb-[48px] md:text-[28px] md:leading-[36px] md:mb-[28px] md:mt-[96px] dark:text-white-100 text-black-1000 font-semibold text-2xl mt-6 mb-0">
        Guides & Resources
      </div>
      <div className="flex lg:flex-row md:flex-row justify-between flex-col">
        {data.guides.map((guide) => (
          <Link
            key={guide.id}
            href={guide.link}
            className="lg:w-[384px] lg:mb-0 md:w-[229px] md:mb-0 cursor-pointer rounded-lg mb-6"
          >
            <div className="md:w-full lg:h-[216px] md:h-[128px] h-[220px] relative">
              <Image
                src={guide.image}
                alt={guide.title}
                layout="fill" 
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="lg:text-base md:text-base lg:mt-4 md:mt-2.5 text-sm mt-4 dark:text-white-100 text-black-1000 font-semibold">
              {guide.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GuidesResources;
