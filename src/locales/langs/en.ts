import { genMessage } from '../helper';

const modules = import.meta.glob('./en/**/*.{json,ts,js}', { eager: true });
export default {
  ...genMessage(modules as Recordable<Recordable>, 'en')
};
