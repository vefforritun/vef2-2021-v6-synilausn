import Link from 'next/link';

import { IFilm } from '../../types';

import s from './Film.module.scss';

type Props = {
  film: IFilm;
};

export function Film({ film }: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        Episode {film.episodeID}: {film.title}
      </h2>
      <div className={s.film__content}>
        <pre className={s.film__crawl}>{film.openingCrawl}</pre>
        <div className={s.film__characters}>
          <h3 className={s.film__charactersTitle}>Characters</h3>
          <ul className={s.film__charactersList}>
            {film?.characterConnection?.characters.map((char, j) => (
              <li key={j}><Link href={`/characters/${char.id}`}>{char.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
