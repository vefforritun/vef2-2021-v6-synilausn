import React, { useState } from 'react';

import Link from 'next/link';

import { ICharacter, IPeopleResponse } from '../../types';

import s from './Characters.module.scss';
import { Button } from '../button/Button';

type Props = {
  peopleResponse: IPeopleResponse;
};

export type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

function peopleResponseToCharacterArray(peopleResponse: IPeopleResponse): Array<ICharacter> {
  const edges = peopleResponse?.allPeople?.edges ?? [];

  return edges
    .map((edge) => {
      if (!edge || !edge.node) {
        return null;
      }
      return edge.node;
    })
    .filter((Boolean as unknown) as ExcludesFalse);
}

export function Characters({ peopleResponse }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Array<ICharacter>>(
    peopleResponseToCharacterArray(peopleResponse),
  );
  const [nextPage, setNextPage] = useState<string | null>(
    peopleResponse.allPeople?.pageInfo?.hasNextPage
      ? peopleResponse.allPeople?.pageInfo?.endCursor : null,
  );

  const fetchMore = async (): Promise<void> => {
    if (!nextPage) {
      return;
    }

    setLoading(true);

    let newCharacters: Array<ICharacter> = [];

    try {
      const response = await fetch(`/api/characters?after=${nextPage}`);
      if (!response.ok) {
        throw new Error('non 200 response');
      }
      const newPeopleResponse = (await response.json()) as IPeopleResponse;
      newCharacters = peopleResponseToCharacterArray(newPeopleResponse);
      setNextPage(newPeopleResponse.allPeople?.pageInfo?.hasNextPage
        ? newPeopleResponse.allPeople?.pageInfo?.endCursor : null);
    } catch (e) {
      console.error('Error fetching new characters', e);
    }

    setLoading(false);

    setCharacters(characters.concat(newCharacters));
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
      {loading && (
        <div className={s.characters__loading}>Fetching...</div>
      )}
      {nextPage && (
        <div className={s.characters__button}>
          <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>
        </div>
      )}
    </section>
  );
}
