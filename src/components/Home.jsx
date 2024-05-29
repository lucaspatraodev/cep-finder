export const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <a
        href="/cepsearch"
        className="flex justify-center items-center text-center w-72 h-12 bg-[#FFD166] text-[#040D12] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#f1c96a] hover:shadow-lg hover:-translate-y-[2px]"
        value={"searchByAddress"}
      >
        Sei o CEP, não sei o endereço
      </a>
      <a
        href="/addresssearch"
        className="flex justify-center items-center text-center w-72 h-12 bg-[#FFD166] text-[#040D12] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#f1c96a] hover:shadow-lg hover:-translate-y-[2px]"
        value={"searchByCep"}
      >
        Sei o endereço, não sei o CEP
      </a>
    </div>
  );
};
