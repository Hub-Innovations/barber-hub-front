import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarComponent = () => {
  const messages = {
    allDay: 'Dia Inteiro',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    showMore: (total: number) => `+ (${total}) Eventos`,
  };
  const myEventList = [
    {
      _id: '63ac369a16d3a5d153048e60',
      start: new Date('2022-12-29T15:50:05.158Z'),
      end: new Date('2022-12-29T18:50:05.158Z'),
      title: 'José + Aroldo: Corte duplo',
      allDay: false,
      resource: {
        status: 1,
        services: ['63a8fd6ea78c0cda198e66d1', '63a8fd6ea78c0cda198e66d3'],
      },
      barberId: '63ab004032a0f08ebc6d0421',
      __v: 0,
    },
    {
      _id: '63ac37003355a75be1f5df73',
      start: new Date('2022-12-31T15:50:05.158Z'),
      end: new Date('2022-12-31T18:50:05.158Z'),
      title: 'José + Fred: Corte duplo',
      allDay: false,
      resource: {
        services: ['63a8fd6ea78c0cda198e66d1', '63a8fd6ea78c0cda198e66d3'],
      },
      barberId: '63ab004032a0f08ebc6d0421',
      __v: 0,
    },
  ];
  return (
    <div>
      <Calendar
        messages={messages}
        culture='pt-BR'
        localizer={localizer}
        events={myEventList}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};
