import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SearchCepSection = () => {
  const [searchedCep, setSearchedCep] = useState(null);
  const [cepData, setCepData] = useState("");

  useEffect(() => {
    console.log(cepData);
    console.log(!cepData.cep);
  }, [cepData]);

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
    <section className="flex flex-col w-full items-center gap-6">
      <input
        type="text"
        placeholder="Digite um CEP..."
        className="input"
        maxLength="8"
        required
        onInput={(event) => {
          const inputValue = event.target.value;
          const numericValue = inputValue.replace(/\D/g, "");
          event.target.value = numericValue;
          if (numericValue.lenght > 8) {
            alert("Você digitou um Cep com menos de 8 digitos!");
          }
          setSearchedCep(numericValue);
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

      {cepData.cep ? (
        <section className="w-[25vh] md:w-[300px] flex flex-col items-center">
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <motion.table
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-[25vh] md:w-[300px] text-sm text-left rtl:text-right text-[#FFD166] p-4"
            >
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
                  key={cepData.cep}
                  className="text-[11px] md:text-xs border-b bg-[#323232] border-gray-700 hover:bg-gray-600"
                >
                  <th
                    key={cepData.logradouro}
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
            </motion.table>
          </div>
          <div className="flex justify-start mb-16">
            <a href="/cepsearch" className="text-[#FFD166] underline my-8">
              Não é nenhum destes resultados? Faça uma nova pesquisa!
            </a>
          </div>
        </section>
      ) : (
        <div className="flex justify-center mb-16">
          {cepData.erro && (
            <div className="flex flex-col gap-4 text-center w-3/6">
              <p className=" text-[#FFD166] text-center font-medium my-8">
                Sua pesquisa não encontrou resultados, certifique-se de informar
                os dados corretos!
              </p>
              <a href="/cepsearch" className="text-[#FFD166] underline my-8">
                Faça uma nova pesquisa!
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
