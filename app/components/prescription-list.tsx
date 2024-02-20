import { Separator } from "@radix-ui/react-select";

interface Props {
  prescription: {
    date: string;
    name: string;
    note: string;
    src: string;
  };
}

export const PrescriptionList: React.FC<Props> = (props) => {
  const { prescription } = props;
  return (
    <div className="pb-4">
      <div className="flex items-center justify-start">
        <img src={prescription.src} alt="" width={80} height={40} />
        <div>
          <p className="text-[12px] text-neutral-500">{prescription.date}</p>
          <h5 className="font-bold text-[14px] text-neutral-700">
            {prescription.name}
          </h5>
        </div>
      </div>
      <p className="text-[12px] text-neutral-700 pb-2">{prescription.note}</p>
      <p className="text-[12px] text-neutral-400">
        CS伝達事項CS伝達事項CS伝達事項
      </p>
      <Separator />
    </div>
  );
};
