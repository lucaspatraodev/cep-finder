// import { useEffect, useState } from "react";
// import brazilCitiesByState from "./data/estados-cidades.json";
// import { Home } from "./components/Home";

// function App() {
//   const [isOptionChoosen, setIsOptionChoosen] = useState(false);
//   const [searchType, setSearchType] = useState("");
//   const [searchValue, setSearchValue] = useState("");

//   const [cepData, setCepData] = useState(null);

//   const [uf, setUf] = useState(null);
//   const [cities, setCities] = useState(null);
//   const [city, setCity] = useState(null);
//   const [addressData, setAddressData] = useState(null);

//   useEffect(() => {
//     setCities(getCitiesByState(uf));
//   }, [uf]);

//   const fetchCepData = async (cep) => {
//     try {
//       const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//       if (!response.ok) {
//         throw new Error("Erro ao buscar o CEP");
//       }
//       const data = await response.json();
//       setCepData(data);
//     } catch (error) {
//       console.error("Erro ao buscar o CEP:", error);
//     }
//   };

//   const fetchAddressData = async (uf, city, area) => {
//     console.log(uf, city, area);
//     try {
//       const response = await fetch(
//         `https://viacep.com.br/ws/${uf}/${city}/${area}/json/`
//       );
//       if (!response.ok) {
//         throw new Error("Erro ao buscar o CEP");
//       }
//       const data = await response.json();
//       setAddressData(data);
//     } catch (error) {
//       console.error("Erro ao buscar o CEP:", error);
//     }
//   };

//   const handleOptionChoice = (event) => {
//     setSearchType(event.target.value);
//   };

//   const handleSearch = () => {
//     if (searchType === "searchByAddress") {
//       fetchAddressData(uf, city, searchValue);
//     } else {
//       fetchCepData(searchValue);
//     }
//   };

const getCitiesByState = (uf) => {
  const state = brazilCitiesByState.estados.find((state) => state.sigla === uf);
  return state ? state.cidades : [];
};

//   return (
//     <main className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-100 p-4">
//       {!isOptionChoosen ? (
//         <Home onButtonClick={handleOptionChoice} />
//       ) : (
//         <>
//           {searchType === "searchByAddress" && (
//             <>
//               <select
//                 className="w-72 p-2 rounded-md border-2 border-teal-400 focus:outline-none focus:border-teal-500"
//                 onChange={(event) => setUf(event.target.value)}
//                 aria-label="Select de UF"
//               >
//                 <option value="">Selecione a UF</option>
//                 <option value="SP">São Paulo</option>
//                 <option value="RJ">Rio de Janeiro</option>
//                 <option value="MG">Minas Gerais</option>
//               </select>

//               {uf && (
//                 <>
//                   <select
//                     className="w-72 p-2 rounded-md border-2 border-teal-400 focus:outline-none focus:border-teal-500"
//                     aria-label="Select de cidade"
//                     onChange={(event) => setCity(event.target.value)}
//                   >
//                     <option value="">Selecione a cidade</option>
//                     {cities.map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>

//                   <input
//                     onChange={(event) => {
//                       setSearchValue(event.target.value);
//                     }}
//                     type="text"
//                     placeholder="Digite sua pesquisa..."
//                     className="w-72 p-[7px] rounded-md border-2 border-teal-400 focus:outline-none focus:border-teal-500"
//                   />
//                 </>
//               )}
//             </>
//           )}

//           <button
//             onClick={() => {
//               handleSearch(searchValue);
//             }}
//             className="w-72 bg-teal-500 text-white font-bold p-2 rounded-md transition duration-300 ease-in-out transform hover:bg-teal-600 hover:shadow-lg hover:-translate-y-1"
//           >
//             Pesquisar
//           </button>
//         </>
//       )}

//       {addressData && (
//         <div>
//           <h2>Endereços encontrados</h2>
//           <p>{JSON.stringify(addressData, null, 2)}</p>
//         </div>
//       )}

//       {cepData && (
//         <div>
//           <h2>CEP encontrado:</h2>
//           <p>{JSON.stringify(cepData, null, 2)}</p>
//         </div>
//       )}
//     </main>
//   );
// }

// export default App;
