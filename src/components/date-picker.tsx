import { useEffect, useId, useRef, useState } from 'react';

import { DayPicker } from 'react-day-picker';
import { formatDate } from '../utils.ts';

type DatePickerProps = {
  selectedDate?: Date;
  setSelectedDate: (date?: Date) => void;
};

const DatePicker = ({ selectedDate, setSelectedDate }: DatePickerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  // Hold the dialog visibility in state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(selectedDate);
  // Function to toggle the dialog visibility
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  // Hook to handle the body scroll behavior and focus trapping.
  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }
    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  /**
   * Function to handle the DayPicker select event: update the input value and
   * the selected date, and set the month.
   */
  const handleDayPickerSelect = (date?: Date) => {
    if (!date) {
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
    }
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        style={{ fontSize: 'inherit' }}
        onClick={toggleDialog}
        aria-controls='dialog'
        aria-haspopup='dialog'
        aria-expanded={isDialogOpen}
        aria-label='Open calendar to choose booking date'
      >
        {selectedDate ? formatDate(selectedDate) : 'Choose a date'}
      </button>

      <dialog
        role='dialog'
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        onClose={() => setIsDialogOpen(false)}
      >
        <DayPicker
          initialFocus
          month={month}
          onMonthChange={setMonth}
          mode='single'
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
        />
      </dialog>
    </>
  );
};

export default DatePicker;
