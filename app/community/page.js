import Image from 'next/image';
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>Shopping Community</h1>
        <p>Welcome to the Shopping Community page!</p>
      </header>
      <main className={classes.main}>
        <section className={classes.section}>
          <h2>Join the Conversation</h2>
          <p>Connect with fellow shoppers and share your experiences.</p>
        </section>
      </main>
    </>
  );
}
