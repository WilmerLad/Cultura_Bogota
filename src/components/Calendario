import React from 'react';

const Calendario = ({ events, onFilterChange }) => {
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty days before the first day of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentYear, currentMonth, i));
  }

  const getEventsForDay = (day) => {
    if (!day) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day.getDate() &&
             eventDate.getMonth() === day.getMonth() &&
             eventDate.getFullYear() === day.getFullYear();
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agenda Cultural</h2>

      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
        >
          <option value="month">Este Mes</option>
          <option value="week">Esta Semana</option>
        </select>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 border rounded-lg h-28 flex flex-col ${
              day ? 'bg-gray-50' : 'bg-gray-100'
            } ${
              day && day.toDateString() === today.toDateString() ? 'border-blue-500 bg-blue-100 shadow-md' : 'border-gray-200'
            }`}
          >
            <span className="text-sm font-medium text-gray-800 mb-1">{day ? day.getDate() : ''}</span>
            <div className="flex-grow overflow-y-auto text-xs">
              {day && getEventsForDay(day).map((event) => (
                <div key={event.id} className="bg-blue-200 text-blue-800 rounded-md px-1 py-0.5 mb-0.5 truncate font-medium">
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;