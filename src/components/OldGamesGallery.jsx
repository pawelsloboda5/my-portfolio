import React from 'react';
import castleIdle from '../assets/castleidle.png';
import idleWalk from '../assets/idlewalk.png';
import warriorsBattle1 from '../assets/warriorsbattle1.png';
import warriorsBattle2 from '../assets/warriorsbattle2.png';

const games = [
  { src: castleIdle, title: 'Castle Idle (2013)', description: 'Incremental empire builder' },
  { src: idleWalk, title: 'Idle Walk (2013)', description: 'Endless runner experiment' },
  { src: warriorsBattle1, title: "Warrior's Battle (2014) – Menu", description: 'Click-based RPG' },
  { src: warriorsBattle2, title: "Warrior's Battle (2014) – Combat", description: 'Click-based RPG' }
];

function OldGamesGallery() {
  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold mb-4 text-center">Childhood Games Gallery</h3>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        A nostalgic peek at the browser games I published to Kongregate between 2012-2014.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {games.map((game, idx) => (
          <figure key={idx} className="rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
            <img src={game.src} alt={game.title} className="w-full h-48 object-cover" loading="lazy" />
            <figcaption className="p-4 text-center">
              <h4 className="font-semibold">{game.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{game.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default OldGamesGallery; 