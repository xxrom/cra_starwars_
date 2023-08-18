import type { PersonType } from './peopleSlice';

export const generatePersonId = ({
  name,
  height,
}: Pick<PersonType, 'name' | 'height'>) => `${name}-${height}`;
