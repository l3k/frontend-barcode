import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ReactApexChart from 'react-apexcharts';

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface AmountPeriod {
  date: string
  amount: number
}

interface Props {
  dateStart: Date
  dateEnd: Date
  data: AmountPeriod[]
}

const ChartOne: React.FC<Props> = ({ dateStart, dateEnd, data }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [max, setMax] = useState<number>(0);
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Valor',
        data: [],
      },
    ],
  });

  useEffect(() => {
    setLabels(data.map(item => format(parseISO(item.date), 'dd/MM/yyyy')))
    setState({
      series: [
        {
          name: 'Valor',
          data: data.map(item => item.amount),
        },
      ],
    })
    setMax(data.reduce((ac, product) =>
      Math.max(ac, product.amount)
      , 0))
  }, [data])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div>
        <div className="w-full">
          <p className="font-semibold text-secondary">Valor de produtos consumidos</p>
          <p className="text-sm font-medium">{`Período selecionado: ${format(dateStart, 'dd/MM/yyy')} - ${format(dateEnd, 'dd/MM/yyy')}`}</p>
        </div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{
              legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'left',
              },
              colors: ['#3C50E0', '#80CAEE'],
              chart: {
                fontFamily: 'Satoshi, sans-serif',
                height: 335,
                type: 'area',
                dropShadow: {
                  enabled: true,
                  color: '#623CEA14',
                  top: 10,
                  blur: 4,
                  left: 0,
                  opacity: 0.1,
                },

                toolbar: {
                  show: false,
                },
              },
              responsive: [
                {
                  breakpoint: 1024,
                  options: {
                    chart: {
                      height: 300,
                    },
                  },
                },
                {
                  breakpoint: 1366,
                  options: {
                    chart: {
                      height: 350,
                    },
                  },
                },
              ],
              stroke: {
                width: [2, 2],
                curve: 'straight',
              },
              grid: {
                xaxis: {
                  lines: {
                    show: true,
                  },
                },
                yaxis: {
                  lines: {
                    show: true,
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
              markers: {
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3', '#80CAEE'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                  size: undefined,
                  sizeOffset: 5,
                },
              },
              xaxis: {
                type: 'category',
                categories: labels,
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                title: {
                  style: {
                    fontSize: '0px',
                  },
                },
                min: 0,
                max: Math.round(max + 2),
              },
            }}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
