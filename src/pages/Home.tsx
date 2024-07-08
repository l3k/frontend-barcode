import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaFileExcel, FaSearch, FaUsers, FaUtensils } from 'react-icons/fa';
import { format, isAfter, lastDayOfMonth } from 'date-fns';

import DefaultLayout from '../layout/DefaultLayout'
import CardDataStats from '../components/CardDataStats';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import DatePicker from '../components/DatePicker';
import toast from 'react-hot-toast';
import { getCsv, getDashboard } from '../services/order';
import { useAuth } from '../hooks/auth';

interface MostConsumedProduct {
  qtd: number,
  id: string
  name: string
}

interface ItemAmountPeriod {
  date: string
  amount: number
}

const Home: React.FC = () => {
  const [dateStart, setDateStart] = useState<Date>(() => {
    const currentDate = new Date();
    currentDate.setDate(1);
    return currentDate;
  })
  const [dateEnd, setDateEnd] = useState<Date>(() => {
    const currentDate = lastDayOfMonth(new Date())
    return currentDate;
  })
  const [loading, setLoading] = useState(false)
  const [qtdAssociates, setQtdAssociates] = useState(0)
  const [qtdProducts, setQtdProducts] = useState(0)
  const [qtdAmount, setQtdAmount] = useState(0)
  const [mostConsumedProducts, setMostConsumedProducts] = useState<MostConsumedProduct[]>([])
  const [amountPeriod, setAmountPeriod] = useState<ItemAmountPeriod[]>([])
  const { token } = useAuth()

  async function handleGetDate() {
    try {
      setLoading(true)
      if (isAfter(dateStart, dateEnd)) {
        return toast.error("A data inicial não pode ser maior que a data final")
      }

      const dateSF = format(dateStart, 'yyyy-MM-dd')
      const dateEF = format(dateEnd, 'yyyy-MM-dd')
      const response = await getDashboard(token, dateSF, dateEF)

      setQtdAssociates(response.qtdAssociates)
      setQtdProducts(response.qtdProducts)
      setQtdAmount(response.qtdAmount)
      setMostConsumedProducts(response.mostConsumedProducts)
      setAmountPeriod(response.amountPeriod)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  async function exportCsv() {
    try {
      setLoading(true)
      if (isAfter(dateStart, dateEnd)) {
        return toast.error("A data inicial não pode ser maior que a data final")
      }

      const dateSF = format(dateStart, 'yyyy-MM-dd')
      const dateEF = format(dateEnd, 'yyyy-MM-dd')
      const response = await getCsv(token, dateSF, dateEF)

      const url = window.URL.createObjectURL(new Blob([response]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'orders.csv');

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {

    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    handleGetDate()
  }, [])

  return (
    <DefaultLayout>
      <div className='flex w-full mb-8 items-end'>
        <div className='mr-8'>
          <DatePicker label='Data inicial' date={dateStart} onChange={(value) => setDateStart(value)} />
        </div>
        <div className='mr-8'>
          <DatePicker label='Data final' date={dateEnd} onChange={(value) => setDateEnd(value)} />
        </div>
        <button
          onClick={handleGetDate}
          className="flex h-12 items-center justify-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        >
          <FaSearch />
        </button>
        <button
          onClick={exportCsv}
          className="flex h-12 ml-4 items-center justify-center cursor-pointer rounded-lg border border-green-700 bg-green-700 p-4 text-white transition hover:bg-opacity-90"
        >
          <FaFileExcel />
          <span className='ml-2'>Exportar</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Valor total" total={`R$ ${qtdAmount?.toString().replace('.', ',') || 0}`}>
          <FaDollarSign size={24} />
        </CardDataStats>
        <CardDataStats title="Qtd. de Produtos" total={`${qtdProducts?.toString() || 0}`}>
          <FaUtensils size={24} />
        </CardDataStats>
        <CardDataStats title="Qtd. de Associados" total={`${qtdAssociates?.toString() || 0}`}>
          <FaUsers size={24} />
        </CardDataStats>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne dateStart={dateStart} dateEnd={dateEnd} data={amountPeriod} />
        <ChartThree data={mostConsumedProducts} />
      </div>
    </DefaultLayout>
  )
}

export default Home