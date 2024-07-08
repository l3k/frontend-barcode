import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

interface MostConsumedProduct {
  qtd: number,
  id: string
  name: string
}

interface Props {
  data: MostConsumedProduct[]
}

const ChartThree: React.FC<Props> = ({ data }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: data.map(item => item.name),
    legend: {
      show: false,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  useEffect(() => {
    setTotal(data.reduce((ac, product) => ac + product.qtd, 0))
    setLabels(data.map(item => item.name))
  }, [data])

  useEffect(() => {
    setSeries(data.map(item => (item.qtd / total) * 100))
  }, [total])

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Produtos mais consúmidos
        </h5>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{
              chart: {
                fontFamily: 'Satoshi, sans-serif',
                type: 'donut',
              },
              colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
              labels,
              legend: {
                show: false,
                position: 'bottom',
              },

              plotOptions: {
                pie: {
                  donut: {
                    size: '65%',
                    background: 'transparent',
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
              responsive: [
                {
                  breakpoint: 2600,
                  options: {
                    chart: {
                      width: 380,
                    },
                  },
                },
                {
                  breakpoint: 640,
                  options: {
                    chart: {
                      width: 200,
                    },
                  },
                },
              ],
            }}
            series={series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>{data[0]?.name || ""}</span>
              <span>{series[0] || 0}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>{data[1]?.name || ""}</span>
              <span>{series[1] || 0}%</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>{data[2]?.name || ""}</span>
              <span>{series[2] || 0}%</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>{data[3]?.name || ""}</span>
              <span>{series[3] || 0}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
