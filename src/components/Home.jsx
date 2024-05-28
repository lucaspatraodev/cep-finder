export const Home = () => {
  function handleButtonClick() {}

  return (
    <>
      <a
        href="/cepsearch"
        className="text-center w-72 bg-[#FFD166] text-[#040D12] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#f1c96a] hover:shadow-lg hover:-translate-y-[2px]"
        value={"searchByAddress"}
      >
        Não sei o CEP do meu endereço
      </a>
      <a
        href="/addresssearch"
        className="text-center w-72 bg-[#FFD166] text-[#040D12] font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:bg-[#f1c96a] hover:shadow-lg hover:-translate-y-[2px]"
        value={"searchByCep"}
        onClick={handleButtonClick}
      >
        Sei o CEP mas não sei o endereço
      </a>
    </>
  );
};
