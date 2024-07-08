
import React, { FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import { createProduct } from '../../services/product';
import { useAuth } from '../../hooks/auth';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import CurrencyInput from 'react-currency-input-field';

interface AddProductProps {
  showModal: boolean;
  onCloseModal: () => void;
  handleSave: () => void;
}

interface ErrorResponse {
  message?: string;
}

const AddProduct: React.FC<AddProductProps> = ({ showModal, onCloseModal, handleSave }) => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const { token } = useAuth();

  async function newProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const currency = Number(value.replace(',', '.'))
      await createProduct(code, name, description, currency, token)
      onCloseModal()
      setCode('')
      setName('')
      setDescription('')
      setValue('')
      handleSave()
      toast.success("Produto salvo")
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data?.message || "Ocorreu um erro");
      } else {
        toast.error("Ocorreu um erro");
      }
    }
  }

  return (
    <Modal open={showModal} onClose={onCloseModal} showCloseIcon={false} center styles={{
      modal: {
        padding: 0,
        borderRadius: 10
      }
    }}>
      <div className='min-w-80 md:min-w-100'>
        <div className="overflow-y-auto overflow-x-hidden justify-center items-center w-full max-h-full">
          <div className="relative w-full max-h-full">

            <div className="relative dark:bg-boxdark rounded-lg shadow">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Novo Produto
                </h3>
                <button onClick={onCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <FaTimes />
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={newProduct}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código de Barra</label>
                    <input type="text" name="code" id="code" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="7899999999999" required value={code} onChange={(e) => setCode(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                    <input type="text" name="name" id="name" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Ex.: Biscoito" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                    <CurrencyInput type="text" name="value" id="value" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required value={value} onValueChange={(float) => setValue(float || '')} decimalSeparator=',' groupSeparator='.' allowNegativeValue={false} defaultValue={1000} prefix='R$' />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <input type="text" name="description" id="description" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
                <button
                  className="flex h-10 items-center justify-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  type='submit'
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddProduct