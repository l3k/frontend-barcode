
import React, { FormEvent, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import { updateAssociate } from '../../services/associate';
import { useAuth } from '../../hooks/auth';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import InputMask from 'react-input-mask'

interface UpdateAssociateProps {
  associate: {
    id: string
    name: string;
    phone: string;
    document: string;
    email: string;
  };
  showModal: boolean;
  onCloseModal: () => void;
  handleSave: () => void;
}

interface ErrorResponse {
  message?: string;
}

const UpdateAssociate: React.FC<UpdateAssociateProps> = ({ associate, showModal, onCloseModal, handleSave }) => {
  const [name, setName] = useState(associate.name)
  const [phone, setPhone] = useState(associate.phone)
  const [document, setDocument] = useState(associate.document)
  const [email, setEmail] = useState(associate.email)
  const { token } = useAuth();

  async function uptAssociate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await updateAssociate(associate.id, name, email, phone, document, token)
      onCloseModal()
      handleSave()
      toast.success("Associado atualizado")
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data?.message || "Ocorreu um erro");
      } else {
        toast.error("Ocorreu um erro");
      }
    }
  }

  useEffect(() => {
    setName(associate.name)
    setPhone(associate.phone)
    setDocument(associate.document)
    setEmail(associate.email)
  }, [associate])

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
                  Alterar Associado
                </h3>
                <button onClick={onCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <FaTimes />
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={uptAssociate}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                    <input type="text" name="name" id="name" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Ex.: João da Silva" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                    <input type="email" name="email" id="email" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="joaosilva@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="document" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documento</label>
                    <InputMask type="text" name="document" id="document" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" mask="999.999.999-99" placeholder="999.999.999-99" required value={document} onChange={(e) => setDocument(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                    <InputMask type="tel" name="phone" id="phone" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} />
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

export default UpdateAssociate