
import React from 'react';
import { Modal } from 'react-responsive-modal';
import { deleteOrder } from '../../services/order';
import { useAuth } from '../../hooks/auth';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface DeleteOrderProps {
  orderId: string;
  showModal: boolean;
  onCloseModal: () => void;
  handleSave: () => void;
}

interface ErrorResponse {
  message?: string;
}

const DeleteOrder: React.FC<DeleteOrderProps> = ({ orderId, showModal, onCloseModal, handleSave }) => {
  const { token } = useAuth();

  async function delOrder() {
    try {
      await deleteOrder(orderId, token)
      onCloseModal()
      handleSave()
      toast.success("Consumo removido")
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

              <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Deseja remover a ordem ?
                </h3>
              </div>

              <div className='flex justify-around items-center p-4'>
                <button
                  className="flex h-10 items-center justify-center cursor-pointer rounded-lg border border-boxdark-2 bg-boxdark-2 p-4 text-white transition hover:bg-opacity-90"
                  onClick={onCloseModal}
                >
                  Não
                </button>
                <button
                  className="flex h-10 items-center justify-center cursor-pointer rounded-lg border border-red-500 bg-red-500 p-4 text-white transition hover:bg-opacity-90"
                  onClick={delOrder}
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteOrder