interface FaqBody {
  title?: string;
  html?: string;
  date?: string;
  level?: string | undefined;
}
interface FaqBodyProps {
  data: FaqBody;
}

export const FaqBody = ({ data }: FaqBodyProps) => {
  return (
    <div className="faq-body">
      <h1>{data.title}</h1>
      <div className="text-sm dark:text-white-100 text-black-1100 pt-2">
        {data.date}
      </div>
      <div className="pt-10 pb-16">
        <div dangerouslySetInnerHTML={{ __html: data.html || "" }} />
      </div>
    </div>
  );
};
