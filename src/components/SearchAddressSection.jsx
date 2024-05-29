import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import brazilCities from "../data/estados-cidades.json";

export const SearchAddressSection = () => {
  const [uf, setUf] = useState(null);
  const [city, setCity] = useState(null);
  const [addressSearch, setAddressSearch] = useState(null);
  const [addressData, setAddressData] = useState(false);

  useEffect(() => {
    console.log(addressData);
  }, [addressData]);

  const getCitiesByState = (uf) => {
    const state = brazilCities.estados.find((state) => state.sigla === uf);
    return state ? state.cidades : [];
  };
  const brazilianCitiesByState = getCitiesByState(uf);

  const fetchAddressData = async (uf, city, area) => {
    console.log(uf, city, area);

    if (area.length < 3) {
      alert("O campo rua precisa ter mais de 3 caracteres!");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${uf}/${city}/${area}/json/`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar o CEP");
      }
      const data = await response.json();
      data[0].logradouro == "" ? setAddressData(null) : setAddressData(data);

      console.log(addressData);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  return (
    <section className="w-full flex flex-col items-center">
      <select
        className="select"
        onChange={(event) => setUf(event.target.value)}
      >
        <option className="option-custom" value="">
          Selecione uma UF
        </option>
        <option className="option-custom" value="AC">
          Acre
        </option>
        <option className="option-custom" value="AL">
          Alagoas
        </option>
        <option className="option-custom" value="AP">
          Amapá
        </option>
        <option className="option-custom" value="AM">
          Amazonas
        </option>
        <option className="option-custom" value="BA">
          Bahia
        </option>
        <option className="option-custom" value="CE">
          Ceará
        </option>
        <option className="option-custom" value="DF">
          Distrito Federal
        </option>
        <option className="option-custom" value="ES">
          Espírito Santo
        </option>
        <option className="option-custom" value="GO">
          Goiás
        </option>
        <option className="option-custom" value="MA">
          Maranhão
        </option>
        <option className="option-custom" value="MT">
          Mato Grosso
        </option>
        <option className="option-custom" value="MS">
          Mato Grosso do Sul
        </option>
        <option className="option-custom" value="MG">
          Minas Gerais
        </option>
        <option className="option-custom" value="PA">
          Pará
        </option>
        <option className="option-custom" value="PB">
          Paraíba
        </option>
        <option className="option-custom" value="PR">
          Paraná
        </option>
        <option className="option-custom" value="PE">
          Pernambuco
        </option>
        <option className="option-custom" value="PI">
          Piauí
        </option>
        <option className="option-custom" value="RJ">
          Rio de Janeiro
        </option>
        <option className="option-custom" value="RN">
          Rio Grande do Norte
        </option>
        <option className="option-custom" value="RS">
          Rio Grande do Sul
        </option>
        <option className="option-custom" value="RO">
          Rondônia
        </option>
        <option className="option-custom" value="RR">
          Roraima
        </option>
        <option className="option-custom" value="SC">
          Santa Catarina
        </option>
        <option className="option-custom" value="SP">
          São Paulo
        </option>
        <option className="option-custom" value="SE">
          Sergipe
        </option>
        <option className="option-custom" value="TO">
          Tocantins
        </option>
      </select>

      {uf && (
        <section className="flex flex-col w-full items-center gap-4">
          <select
            className="select"
            onChange={(event) => setCity(event.target.value)}
          >
            <option className="option-custom" value="">
              Selecione a cidade
            </option>
            {brazilianCitiesByState.map((city) => (
              <option className="option-custom" key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Digite um endereço"
            className="input"
            onChange={(event) => {
              const inputValue = event.target.value;
              const alphaValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
              event.target.value = alphaValue;
              setAddressSearch(alphaValue);
            }}
          />

          <button
            onClick={() => {
              fetchAddressData(uf, city, addressSearch);
            }}
            className="button"
          >
            Pesquisar
          </button>
        </section>
      )}

      {addressData && (
        <div className="mt-6 w-[25vh] md:w-[300px] flex flex-col items-center">
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
                  <th scope="col" className="px-6 py-3">
                    CEP
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(addressData) &&
                  addressData.map((place) =>
                    place.logradouro != 0 ? (
                      <tr
                        key={place.cep}
                        className="text-[11px] font-bold md:text-xs border-b bg-[#323232] border-gray-700 hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="text-[11px] md:text-xs px-6 py-4 text-[#FFD166] whitespace-nowrap"
                        >
                          {place.logradouro}
                        </th>
                        <td className="text-[11px] text-[#FFD166] md:text-xs px-6 py-4">
                          {place.bairro === ""
                            ? "Não possui bairro"
                            : place.bairro}
                        </td>
                        <td className="text-[11px] text-[#FFD166] md:text-xs px-6 py-4">
                          {place.cep}
                        </td>
                      </tr>
                    ) : null
                  )}
              </tbody>
            </motion.table>
          </div>
        </div>
      )}

      {addressData == null && (
        <div className="flex flex-col text-center justify-start mb-16">
          <p className="text-[#FFD166] text-center font-medium my-8">
            Sua pesquisa não encontrou resultados, certifique-se de informar os
            dados corretos!
          </p>
          <a href="/cepsearch" className="text-[#FFD166] underline my-8">
            Faça uma nova pesquisa!
          </a>
        </div>
      )}
    </section>
  );
};
