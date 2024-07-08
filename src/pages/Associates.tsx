import DefaultLayout from '../layout/DefaultLayout'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Associate, getAssociates } from '../services/associate';
import { useAuth } from '../hooks/auth';
import AddAssociate from '../components/Modal/AddAssociate';
import UpdateAssociate from '../components/Modal/UpdateAssociate';
import DeleteAssociate from '../components/Modal/DeleteAssociate';
import ImportAssociate from '../components/Modal/ImportAssociate';

const Associates: React.FC = () => {
  const { token } = useAuth()
  const [associates, setAssociates] = useState<Associate[]>([])
  const [associate, setAssociate] = useState<Associate>({} as Associate)
  const [modalImport, setModalImport] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [search, setSearch] = useState('');


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  async function getData(search?: string) {
    const response = await getAssociates(token, search)

    setAssociates(response)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <DefaultLayout>
      <>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
            <h4 className="text-2xl font-semibold text-black dark:text-white">
              Associados
            </h4>
            <div className="flex justify-between items-center w-1/2">
              <input
                type="text"
                name="search"
                id="search"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder='Busque pelo nome'
                value={search}
                onChange={handleInputChange}
              />
              <button
                className="cursor-pointer h-13 w-40 items-center justify-center flex ml-4 rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                onClick={() => setModalAdd(true)}
              >
                Novo Associado
              </button>
              <button
                className="cursor-pointer h-13 w-40 items-center justify-center flex ml-4 rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                onClick={() => setModalImport(true)}
              >
                Importar Associados
              </button>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Nome
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    E-mail
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Telefone
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {associates.map((associate, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {associate.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {associate.email}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {associate.phone || '--'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-4.5">
                        <button className="hover:text-primary" onClick={() => {
                          setModalEdit(true)
                          setAssociate(associate)
                        }}>
                          <FaEdit />
                        </button>
                        <button className="hover:text-primary" onClick={() => {
                          setModalDelete(true)
                          setAssociate(associate)
                        }}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ImportAssociate
          showModal={modalImport}
          onCloseModal={() => setModalImport(false)}
          handleSave={() => { getData() }}
        />
        <AddAssociate
          showModal={modalAdd}
          onCloseModal={() => setModalAdd(false)}
          handleSave={() => { getData() }}
        />
        <UpdateAssociate
          associate={associate}
          showModal={modalEdit}
          onCloseModal={() => setModalEdit(false)}
          handleSave={() => { getData() }}
        />
        <DeleteAssociate
          associate={associate}
          showModal={modalDelete}
          onCloseModal={() => setModalDelete(false)}
          handleSave={() => { getData() }}
        />
      </>
    </DefaultLayout>
  )
}

export default Associates