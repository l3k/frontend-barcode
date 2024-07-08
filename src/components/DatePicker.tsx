import { useEffect, useRef, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DatePickerProps {
  label: string;
  date: Date;
  onChange: (value: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ label, date, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDayClick = (day: Date) => {
    onChange(day)
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <div ref={dropdownRef} className="relative">
        <input
          type="text"
          placeholder="Selecione uma data"
          readOnly
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          value={format(date, 'dd/MM/yyyy')}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <FaCalendar />
        </div>
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg mt-2 rounded border border-gray-300">
            <DayPicker
              selected={date}
              onDayClick={handleDayClick}
              className="form-datepicker rounded border-[1.5px]  border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              locale={ptBR}
              style={{
                margin: 0
              }}
              modifiersStyles={{
                selected: {
                  borderWidth: 3,
                  borderColor: 'white',
                  borderStyle: 'solid',
                  backgroundColor: 'transparent'
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
};

export default DatePicker;
