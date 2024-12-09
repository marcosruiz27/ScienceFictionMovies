/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('movies').del()
  await knex('movies').insert([
    {
      id: 1,
      name: 'Arrival',
      description:
        'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
      release_year: 2016,
      director: 'Denis Villeneuve',
      duration: 116, // duration in minutes
    },
    {
      id: 2,
      name: 'The 5th Element',
      description:
        'In the colorful future, a cab driver unwittingly becomes the central figure in the search for a legendary cosmic weapon to keep Evil and Mr. Zorg at bay.',
      release_year: 1997,
      director: 'Luc Besson',
      duration: 126,
    },
    {
      id: 3,
      name: 'Lucy',
      description:
        'A woman, accidentally caught in a dark deal, turns the tables on her captors and transforms into a merciless warrior evolved beyond human logic.',
      release_year: 2014,
      director: 'Luc Besson',
      duration: 89,
    },
    {
      id: 4,
      name: 'Her',
      description:
        'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
      release_year: 2013,
      director: 'Spike Jonze',
      duration: 126,
    },
    {
      id: 5,
      name: 'District 9',
      description:
        'Violence ensues after an extraterrestrial race, forced to live in slum-like conditions on Earth, finds a kindred spirit in a government agent who is exposed to their biotechnology.',
      release_year: 2009,
      director: 'Neill Blomkamp',
      duration: 112,
    },
  ])
}
