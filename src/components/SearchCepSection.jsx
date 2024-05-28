import { useState } from "react";

export const SearchCepSection = () => {
  const [searchedCep, setSearchedCep] = useState(null);
  const [cepData, setCepData] = useState("");

  const fetchCepData = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error("Erro ao buscar o CEP");
      }
      const data = await response.json();
      console.log(data);
      setCepData(data);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Digite um CEP..."
        className="input"
        onChange={(event) => {
          setSearchedCep(event.target.value);
        }}
      />

      <button
        onClick={() => {
          fetchCepData(searchedCep);
        }}
        className="button"
      >
        Pesquisar
      </button>

      {cepData && (
        <div>
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-[45vh] md:w-[600px] text-sm text-left rtl:text-right text-[#FFD166] p-4">
              <thead className="text-xs text-[#FFD166] uppercase bg-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Logradouro
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bairro
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={cepData.logradouro}
                  className="text-[11px] md:text-xs border-b bg-[#323232] border-gray-700 hover:bg-gray-600"
                >
                  <th
                    key={cepData.bairro}
                    scope="row"
                    className="text-[11px] md:text-xs px-6 py-4 font-medium text-[#FFD166] whitespace-nowrap"
                  >
                    {cepData.logradouro}
                  </th>
                  <td key={cepData.bairro} className="px-6 py-4">
                    {cepData.bairro}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-start mb-16">
            <a href="/cepsearch" className="text-[#FFD166] underline my-8">
              Não é nenhum destes resultados? Faça uma nova pesquisa!
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
