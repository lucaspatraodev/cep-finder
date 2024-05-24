import { useState } from "react";

function App() {
  const [isOptionChoosen, setIsOptionChoosen] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [cepData, setCepData] = useState(null);

  const handleButtonClick = async (event) => {
    setIsOptionChoosen(true);

    let optionChoosen = event.target.value;
    setSearchType(optionChoosen);
  };

  const search = async (cep) => {
    if (searchType === "searchByAddress") {
      console.log("Pesquisa por Endereço.");
    } else if (searchType === "searchByCep") {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
          throw new Error("Erro ao buscar o CEP");
        }
        const data = await response.json();
        setCepData(data);
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };
  return (
    <main className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-100 p-4">
      {!isOptionChoosen ? (
        <>
          <h1 className="text-2xl font-bold mb-2">CEP Finder</h1>
          <button
            className="w-72 bg-teal-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-teal-600 hover:shadow-lg hover:-translate-y-1"
            value={"searchByAddress"}
            onClick={handleButtonClick}
          >
            Não sei o CEP do meu endereço
          </button>
          <button
            className="w-72 bg-teal-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:bg-teal-600 hover:shadow-lg hover:-translate-y-1"
            value={"searchByCep"}
            onClick={handleButtonClick}
          >
            Sei o CEP mas não sei o endereço
          </button>
        </>
      ) : (
        <>
          <input
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            type="text"
            placeholder="Digite sua pesquisa..."
            className="w-72 p-[7px] rounded-md border-2 border-teal-400 focus:outline-none focus:border-teal-500"
          />
          <button
            onClick={() => {
              search(searchValue);
            }}
            className="w-72 bg-teal-500 text-white font-bold p-2 rounded-md transition duration-300 ease-in-out transform hover:bg-teal-600 hover:shadow-lg hover:-translate-y-1"
          >
            Pesquisar
          </button>
        </>
      )}
      {cepData && (
        <div>
          <h2>CEP encontrado:</h2>
          <p>{JSON.stringify(cepData, null, 2)}</p>
        </div>
      )}
    </main>
  );
}

export default App;
