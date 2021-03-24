import Link from 'next/link';

import s from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props): JSX.Element {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <nav>
          <ul className={s.layout__list}>
            <li className={s.layout__listItem}><Link href="/">Films</Link></li>
            <li className={s.layout__listItem}><Link href="/characters">Characters</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
