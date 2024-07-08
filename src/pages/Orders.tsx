import DefaultLayout from '../layout/DefaultLayout'
import React, { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { Order, getOrders } from '../services/order';
import { useAuth } from '../hooks/auth';
import DeleteOrder from '../components/Modal/DeleteOrder';
import { format, parseISO } from 'date-fns';


const Orders: React.FC = () => {
  const { token } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [order, setOrder] = useState<Order>({} as Order)
  const [modalDelete, setModalDelete] = useState(false)

  async function getData() {
    const response = await getOrders(token)

    setOrders(response)
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
              Produtos
            </h4>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Produto
                  </th>
                  <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">
                    Associado
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Valor
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Data
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {order.product?.code} - {order.product?.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {order.associate?.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {`R$ ${order.amount}`.replace('.', ',') || '--'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {order.createdAt ? format(parseISO(order.createdAt), 'dd/MM/yyyy HH:mm') : '--'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-4.5">
                        <button className="hover:text-primary" onClick={() => {
                          setModalDelete(true)
                          setOrder(order)
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
        <DeleteOrder
          orderId={order.id || ""}
          showModal={modalDelete}
          onCloseModal={() => setModalDelete(false)}
          handleSave={() => { getData() }}
        />
      </>
    </DefaultLayout>
  )
}

export default Orders