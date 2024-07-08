
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import { importAssociate } from '../../services/associate';
import { useAuth } from '../../hooks/auth';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ImportAssociateProps {
  showModal: boolean;
  onCloseModal: () => void;
  handleSave: () => void;
}

interface ErrorResponse {
  message?: string;
}

const ImportAssociate: React.FC<ImportAssociateProps> = ({ showModal, onCloseModal, handleSave }) => {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  async function newProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (file) {
        const form = new FormData()
        form.append('file', file)
        await importAssociate(form, token)
        setTimeout(() => {
          setFile(null)
          onCloseModal()
          handleSave()
          toast.success("Produto(s) importado(s)")
        }, 1000);
      }
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
                  Importar Associado
                </h3>
                <button onClick={onCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <FaTimes />
                </button>
              </div>

              <div className='p-4 md:p-5'>
                <span>Seu arquivo CSV deve respeitar a ordem e<br />nome dos campos conforme o exemplo abaixo</span>
                <img src="example-associate.png" />
              </div>

              <form className="p-4 md:p-5" onSubmit={newProduct}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className='col-span-2'>
                    <label className="mb-3 block text-black dark:text-white">
                      Arquivo
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <button
                  className="flex h-10 items-center justify-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  type='submit'
                >
                  Importar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ImportAssociate