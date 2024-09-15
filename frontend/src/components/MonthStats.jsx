import { CheckCircle, MoneyWavy, Receipt } from "@phosphor-icons/react";

const MonthStats = () => {
  return (
    <div className="text-white mb-10 flex gap-10">
      <div className="bg-card_purple px-5 pt-5 pb-8 rounded-xl w-64 ">
        <h3 className="text-lg font-bold mb-1 ">Septembar 2024</h3>
        <h4 className="text-sm mb-5">Ukupna zarada</h4>
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-semibold">50000</h3>
          <div className="bg-white p-1 rounded-full mt-1">
            <CheckCircle size={22} color="#6A60FF" weight="fill" />
          </div>
        </div>
      </div>
      <div className="bg-card_blue px-5 pt-5 pb-8 rounded-xl w-64 ">
        <h3 className="text-lg font-bold mb-1 ">Septembar 2024</h3>
        <h4 className="text-sm mb-5">Ukupan profit</h4>
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-semibold">34000</h3>
          <div className="bg-white p-1 rounded-full mt-1">
            <MoneyWavy size={22} color="#5183FF" weight="fill" />
          </div>
        </div>
      </div>

      <div className="bg-card_pink px-5 pt-5 pb-8 rounded-xl w-64 ">
        <h3 className="text-lg font-bold mb-1 ">Septembar 2024</h3>
        <h4 className="text-sm mb-5">Ukupno prodatih artikala</h4>
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-semibold">50</h3>
          <div className="bg-white p-1 rounded-full mt-1">
            <Receipt size={22} color="#FF898B" weight="fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthStats;
