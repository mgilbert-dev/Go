import { atom, selector, DefaultValue } from 'recoil';

export const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

export const tempCelcius = selector({
  key: 'tempCelcius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue: DefaultValue) =>
    set(
      tempFahrenheit,
      newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
    ),
});
