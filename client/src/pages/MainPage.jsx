import {
  BiCode,
  BiExport,
  BiSearch,
  BiShare,
  BsDatabaseAdd,
  RiGitRepositoryPrivateFill,
} from 'react-icons/all.js';
import { Link } from 'react-router-dom';

/* =============================
📦 Custom Imports
============================= */
import codePreview from '/assets/images/codePreview.webp';

/* =============================
📦 Mock
============================= */
const mock = {
  section01: 'A simple and elegant code snippet manager for developers.',
  section02: ['Save and organize your code snippets online.', 'Secure, shareable, accessible from anywhere.'],
  section03: [
    {
      title: 'Organization',
      icon: <BsDatabaseAdd size={35} />,
      text: 'Organize your code snippets with tags and by sorting them into folders.',
    },
    {
      title: 'Search & Filter',
      icon: <BiSearch size={35} />,
      text: 'Search all code snippets instantly and filter by folder, tag, or language.',
    },
    {
      title: 'Privacy Control',
      icon: <RiGitRepositoryPrivateFill size={35} />,
      text: 'Save each code snippet as Public, Private, or Unlisted.',
    },
    {
      title: 'Code Embeds',
      icon: <BiCode size={35} />,
      text: 'Embed your code snippets on any website with a simple copy & paste.',
    },
    {
      title: 'Sharing',
      icon: <BiShare size={35} />,
      text: 'Share your Public and Unlisted code snippets with anyone via a unique URL.',
    },
    {
      title: 'Export Your Data',
      icon: <BiExport size={35} />,
      text: 'Export all of your code snippets at any time so you always have a backup.',
    },
  ],
};
/* =============================
📦 Component - MainPage
============================= */
export default function MainPage() {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='bg-white'>
      <section className='bg-neutral-800 text-white'>
        <div className='c-container max-w-2xl grid place-items-center py-6 md:py-14'>
          <h1 className='title text-center xl:text-4xl'>{mock.section01}</h1>
        </div>
      </section>
      <section className='grid gap-5 py-6 md:py-14 text-center c-container max-w-5xl'>
        <h2 className='title mx-auto mb-5'>
          {mock.section02[0]} <br /> {mock.section02[1]}
        </h2>
        <ul className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 mb-8'>
          {mock.section03.map(({ title, icon, text }, index) =>
            <li className='grid gap-2 justify-items-center text-center' key={index}>
              {icon}
              <h3 className='font-bold'>{title}</h3>
              <p>{text}</p>
            </li>,
          )}
        </ul>
        <img className='w-full max-w-4xl mx-auto' src={codePreview} alt='Preview' />
      </section>
      <section className='c-container grid justify-items-center gap-3 text-center py-5 md:py-14'>
        <h2 className='title'>Create your free account</h2>
        Join thousands of developers who rely on SnipSave every day.
        <Link className='button' to='/auth?register'>Get Started</Link>
      </section>
    </div>
  );
}
