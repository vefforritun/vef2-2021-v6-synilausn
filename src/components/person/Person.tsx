import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person.name}</h1>
      <dl className={s.person__attributes}>
        {person.birthYear && (
          <>
            <dt className={s.person__attribute}>Birth year:</dt>
            <dd>{person.birthYear}</dd>
          </>
        )}
        {person.eyeColor && (
          <>
            <dt className={s.person__attribute}>Eye color:</dt>
            <dd>{person.eyeColor}</dd>
          </>
        )}
        {person.hairColor && (
          <>
            <dt className={s.person__attribute}>Hair color:</dt>
            <dd>{person.hairColor}</dd>
          </>
        )}
        {person.height && (
          <>
            <dt className={s.person__attribute}>Height:</dt>
            <dd>{person.height} cm</dd>
          </>
        )}
        {person.mass && (
          <>
            <dt className={s.person__attribute}>Mass:</dt>
            <dd>{person.mass} kg</dd>
          </>
        )}
      </dl>
      <Link href="/characters">Back to characters</Link>
    </div>
  );
}
