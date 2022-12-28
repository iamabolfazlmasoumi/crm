import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { INajiData } from "../models/Naji";


const ChecknationalCode = () => {

    const [showData] = useState<INajiData[]>([])

    const [loading, setLoading] = useState(false)

    const handleCheckNational = async () => {
        try {
            setLoading(true)
            // Login
            const loginData = {username: 'najicheck', password: 'rnZRVMxB', grant_type:'password'}
            const loginRes = await axios.post("https://wscrm.saipacorp.com/login",new URLSearchParams(loginData), {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}});
            // Get National Code
            if(loginRes.status === 200) {
                const getNationalData = await axios.get('https://wscrm.saipacorp.com/api/winnercust/GetCustomersForNajiCheck', {headers: {Authorization: "Bearer "+loginRes.data.access_token}})
                if(getNationalData.status === 200) {
                    const loginNajiData = {username: 'CMDep', password: 'C401Dep@58', grant_type:'password'}
                    const loginNajiRes = await axios.post("https://najiservice.saipacorp.com/login",new URLSearchParams(loginNajiData), {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}});
                    getNationalData.data.forEach(async (item: { NATIONALCODE: string; }) => {
                        const getNajiData = await axios.get(`https://najiservice.saipacorp.com/naji/inquiry?ncode=${item.NATIONALCODE}&plate=1&lic=1`, {headers: {Authorization: 'Bearer '+loginNajiRes.data.access_token}})
                        if(getNajiData.status === 200) {
                            if(getNajiData.data.Res === 1) {
                                // setNajiData(getNajiData)
                                const updatedNaji = {
                                    NATIONALCODE: getNajiData.data.Message, PELAK: getNajiData.data.Plate === null ? '-2' : getNajiData.data.Plate, LICENCE:getNajiData.data.LIC === null ? '-2' : getNajiData.data.LIC
                                }
                                const updatedNajiData = await axios.post('https://wscrm.saipacorp.com/api/winnercust/UpdateCustomerNaji',new URLSearchParams(updatedNaji), {headers: {Authorization: "Bearer "+loginRes.data.access_token}})
                                if(updatedNajiData.status === 200) {
                                    setLoading(false)
                                    showData.push(getNajiData.data)
                                }
                            } else  {
                                setLoading(false)
                                console.log('Res not 1')
                            }
                        }
                    });
                }
            }
        } catch (err: unknown) {
            setLoading(false)
            if (err instanceof Error) {
                return {
                  message: `Things exploded (${err.message})`,
                };
        } 
    };
}

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-hidden">
                    <div className="inline-block min-w-full py-2 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="w-full text-center overflow-x-hidden">
                                <thead className="border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-4 text-sm font-medium text-gray-900"
                                        >
                                            National code
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-sm font-medium text-gray-900"
                                        >
                                            Licence
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-sm font-medium text-gray-900"
                                        >
                                            Plate
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showData.map((item, index) => {
                                        return <tr key={index} className="border-b border-blue-200 bg-blue-100">
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {item?.Message}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            <span className={`${item?.LIC == '1' ? 'text-green-600' : 'text-red-600'}`}>{item?.LIC}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            <span className="text-red-600">NotOk</span>
                                        </td>
                                    </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button
                    onClick={handleCheckNational}
                    type="button"
                    className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                >
                   {loading ? <Spinner /> : 'Check NationalCode'}
                </button>
            </div>
        </>
    );
};

export default ChecknationalCode;
